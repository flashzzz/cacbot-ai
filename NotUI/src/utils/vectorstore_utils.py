import os
import json
import logging
from pinecone import Pinecone, PodSpec
from langchain_core.documents.base import Document
from langchain_openai import OpenAIEmbeddings
from src.utils.logging_utils import custom_logging
from src.constants.dir_paths import Directory
custom_logging()

def embed_docs(docs: list[str])-> list[float]:
    """
    Embeds the given text using OpenAI's text-embedding-3-large model.

    Args:
        text list[str]: The list of texts to be embedded.

    Returns:
        list[list[float]]: The embedded vectors for each text.
    """
    embedding_model = OpenAIEmbeddings(model="text-embedding-3-large", api_key=os.environ.get("OPENAI_API_KEY"))
    embeddings = embedding_model.embed_documents(docs)
    return embeddings

class VectorStore:
    def __init__(self, user_id: str)-> None:
        # Initialize pinecone and embedding model
        pc = Pinecone(api_key=os.environ.get('PINECONE_API_KEY'))        
        self.index_name = user_id

        if self.index_name not in pc.list_indexes().names():
            pc.create_index(
                name=self.index_name,
                dimension=3072,
                metric="cosine",
                spec=PodSpec(
                    environment="gcp-starter"
                )
            )
        
        self.pc_index = pc.Index(self.index_name)
        logging.info(f'Initialized Pinecone Index({self.index_name}) for UserID: {self.index_name}')
        return

    def semantic_search(self, query: str, mmr=False, k=3)-> list[Document]:
        """
        Perform semantic search using the given query and return retrieved chunks/documents.

        Args:
            query (str): The query string.
            mmr (bool, optional): Whether to use Maximal Marginal Relevance (MMR) algorithm for re-ranking. Defaults to False.
            k (int, optional): The number of documents to retrieve. Defaults to 5.

        Returns:
            list[Document]: A list of retrieved documents.
        """
        query_vector = embed_docs([query])
        if mmr:
            raise NotImplementedError('Maximal Marginal Relevance (MMR) algorithm is not implemented yet.')
        else:
            retrieved_response = self.pc_index.query(
                vector=query_vector[0],
                top_k=k,
                include_values=False
            )
        with open(Directory.DATA_MAP_DIR.value, 'r') as fp:
            data_map = json.load(fp)
        retrieved_chunks = []
        for match in retrieved_response['matches']:
            chunk_id = match['id']
            chunk = data_map[chunk_id]
            langchain_doc = Document(page_content=chunk)
            retrieved_chunks.append(langchain_doc)
            
        print(retrieved_response)
        logging.info(f'Retrieved {len(retrieved_chunks)} documents from Pinecone Index({self.index_name}) for query: `{query}`')
        return retrieved_chunks
            
    def upsert(self, docs: list[str])-> None:
        """
        Upserts the given documents to the Pinecone vector store.

        Args:
            docs (list[str]): The list of documents to be upserted.
        Returns:
            None
        """
        curr_data_map = {}
        json_path = Directory.DATA_MAP_DIR.value
        if not os.path.exists(json_path):
            data_map = {}
        else:
            with open(json_path, 'r') as fp:
                data_map = json.load(fp)
                
        len_data_map = len(data_map)
        for i, doc in enumerate(docs, start=len_data_map):
            curr_data_map[f'doc_chunk_{i}'] = doc
            data_map[f'doc_chunk_{i}'] = doc

        with open(json_path, 'w') as fp:
            json.dump(data_map, fp, indent=4)
            
        vectors_to_upsert = []
        embeddings = embed_docs(curr_data_map.values())
        for i,_ in enumerate(embeddings, start=len_data_map):
            # {"id": "A", "values": [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]}
            vector_dict = {"id": f'doc_chunk_{i}', "values": embeddings[i-len_data_map]}
            vectors_to_upsert.append(vector_dict)
        self.pc_index.upsert(vectors_to_upsert)
        while True:
            index_stats = self.pc_index.describe_index_stats()
            if index_stats["total_vector_count"] == len(data_map):
                break
            else: 
                logging.info(f'Waiting for Pinecone Index({self.index_name}) to upsert all documents...')
        
        logging.info(f'Upserted {len(data_map)} documents to Pinecone Index({self.index_name})')
        return
    