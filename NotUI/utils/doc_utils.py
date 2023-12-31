from langchain.document_loaders import TextLoader
from langchain.document_loaders import UnstructuredPDFLoader
from langchain.document_loaders import OnlinePDFLoader
from langchain.document_loaders import UnstructuredURLLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from typing import Union, List
import logging

from logging_utils import custom_logging
custom_logging()

def load_txt(file_path: str, encoding: str = None)-> List:
    """Load text file from given path.

    Args:
        file_path (str): Path to the text file
        encoding (str, optional): Encoding to be used for the file. Defaults to None.

    Returns:
        List: List of Langchain Document objects
    """
    
    documents = TextLoader(file_path, encoding).load()
    logging.info(f'Loaded {len(documents)} documents from [TEXT FILE]')
    return documents


def load_pdf(file_path: str)-> List:
    """Load PDF file from given path.

    Args:
        file_path (str): Path to the PDF file

    Returns:
        List: List of Langchain Document objects
    """
    
    documents = UnstructuredPDFLoader(file_path, mode='single', strategy='fast').load()
    logging.info(f'Loaded {len(documents)} documents from [PDF FILE]')
    return documents
    
    
def load_online_pdf(path: str)-> List:
    """Load PDF file from given URL.

    Args:
        path (str): URL to the PDF file

    Returns:
        List: List of Langchain Document objects
    """
    
    documents = OnlinePDFLoader(path).load()
    logging.info(f'Loaded {len(documents)} documents from [ONLINE PDF]')
    return documents

def load_url(urls: List[str])-> List:
    """Load URL from given path.

    Args:
        urls List[str]: List of URLs

    Returns:
        List: List of Langchain Document objects
    """
    
    documents = UnstructuredURLLoader(urls, mode='single', strategy='fast').load()
    logging.info(f'Loaded {len(documents)} documents from [URL]')
    return documents
    
def load_and_split_doc(paths: List)-> List:
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=100,
        length_function=len
        )
    docs = []
    
    #TODO - Fill docs dynamically
    
    splitter.split_documents(docs)
    pass