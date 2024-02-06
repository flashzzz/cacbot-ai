import os
import logging
import pinecone
from langchain_community.vectorstores import Pinecone
from langchain_core.documents.base import Document
from langchain_openai import OpenAIEmbeddings
from src.utils.logging_utils import custom_logging
custom_logging()

os.environ.get("OPENAI_API_KEY")
os.environ.get("PINECONE_API_KEY_CAC")

class VectorStore:
    def __init__(self, user_id: str)-> None:
        # Initialize pinecone and embedding model
        pinecone.init(
            api_key=os.environ.get("PINECONE_API_KEY_CAC"),  # find at app.pinecone.io
            environment="gcp-starter",
        )
        
        self.index_name = user_id
        self.embedding_model = OpenAIEmbeddings(model="text-embedding-3-large")
        if self.index_name not in pinecone.list_indexes():
            pinecone.create_index(name=self.index_name, metric="cosine", dimension=3072)
        
        logging.info(f'Pinecone and Text Embedding Model initialized for user {user_id}')
        self.vectorstore = Pinecone.from_existing_index(self.index_name, self.embedding_model)
        return

    def semantic_search(self, query: str, mmr=False, k=5)-> list[Document]:
        """
        Perform semantic search using the given query and return retrieved chunks/documents.

        Args:
            query (str): The query string.
            mmr (bool, optional): Whether to use Maximal Marginal Relevance (MMR) algorithm for re-ranking. Defaults to False.
            k (int, optional): The number of documents to retrieve. Defaults to 5.

        Returns:
            list[Document]: A list of retrieved documents.
        """

        if mmr:
            retrieved_chunks = self.vectorstore.max_marginal_relevance_search(query, k=k, fetch_k=10)
        else:
            retrieved_chunks = self.vectorstore.similarity_search(query, k=k)
        
        logging.info(f'Retrieved {len(retrieved_chunks)} documents from Pinecone for query: {query}')
        return retrieved_chunks
            
    def upsert(self, docs):
        """
        Upserts the given documents to the Pinecone vector store.

        Args:
            docs (List[Dict[str, Any]]): A list of documents to be upserted. Each document should be a dictionary.

        Returns:
            None
        """
        self.vectorstore.add_documents(docs)
        logging.info(f'Upserted {len(docs)} documents to Pinecone')
        return
    