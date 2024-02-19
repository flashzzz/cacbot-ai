import logging
from src.utils.logging_utils import custom_logging
from src.utils.vectorstore_utils import VectorStore
from src.utils.doc_utils import load_and_split_doc
from src.utils.chat_chain import retrieval_chat_chain
from src.utils.exception_utils import ChatHandlerError
from src.utils.exception_utils import DocumentHandlerError

custom_logging()

#TODO: Could make a class handler to init with user_id and all handlers as methods

class DocumentHandler:
    def __init__(self, user_id: str) -> None:
        self.user_id = user_id
        
    def doc_handler(self, paths: list[tuple[str,str]]) -> bool:
        """Handles the documents by loading and splitting them, and then upserting them into the VectorStore.

        Args:
            paths (list[tuple[str,str]]): A list of tuples containing the file paths and their corresponding document names.
            user_id (str): The ID of the user.

        Raises:
            DocumentHandlerError: If there is an error in the document handler.

        Returns:
            bool: True if the documents are successfully handled, False otherwise.
        """
        try:
            docs = load_and_split_doc(paths, self.user_id)
            vectorstore = VectorStore(self.user_id)
            vectorstore.upsert(docs)
        
        except Exception as e:
            logging.error(f'Error in document handler: {e}')
            raise DocumentHandlerError(f'{e}')
        return True


    def chat_handler(self, query: str) -> str:
        """Handles the chat by performing semantic search using the given query and returning llm response to that query.

        Args:
            query (str): The query string.

        Raises:
            ChatHandlerError: If there is an error in the chat handler.

        Returns:
            llm_response (str): LLM Response to the user query.
        """
        try:
            mmr = False
            k = 3
            vectorstore = VectorStore(self.user_id)
            retrieved_docs = vectorstore.semantic_search(query, mmr=mmr, k=k)
            llm_response = retrieval_chat_chain(query, retrieved_docs)
            logging.info(f'Generated LLM response for query: `{query}` [UserID: {self.user_id}]')
        except Exception as e:
            logging.error(f'Error in chat handler: {e}')
            raise ChatHandlerError(f'{e}')
        return llm_response