from langchain.document_loaders import TextLoader
from langchain.document_loaders import UnstructuredPDFLoader
from langchain.document_loaders import OnlinePDFLoader
from langchain.document_loaders import UnstructuredURLLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from typing import Union
import logging

from src.utils.logging_utils import custom_logging
from src.constants.doc_types import DocType
custom_logging()

# def load_txt(file_path: str)-> list:
#     """Load text file from given path.

#     Args:
#         file_path (str): Path to the text file

#     Returns:
#         list: List of Langchain Document objects
#     """

#     documents = TextLoader(file_path).load()
#     logging.info(f'Loaded {len(documents)} documents from [TEXT FILE]')
#     return documents


def load_pdf(file_path: str)-> list:
    """Load PDF file from given path.

    Args:
        file_path (str): Path to the PDF file

    Returns:
        list: List of Langchain Document objects
    """

    documents = UnstructuredPDFLoader(file_path, mode='single', strategy='fast').load()
    logging.info(f'Loaded {len(documents)} documents from [PDF FILE]')
    return documents


def load_online_pdf(path: str)-> list:
    """Load PDF file from given URL.

    Args:
        path (str): URL to the PDF file

    Returns:
        list: List of Langchain Document objects
    """

    documents = OnlinePDFLoader(path).load()
    logging.info(f'Loaded {len(documents)} documents from [ONLINE PDF]')
    return documents

def load_url(urls: list[str])-> list:
    """Load URL from given path.

    Args:
        urls List[str]: List of URLs

    Returns:
        list: List of Langchain Document objects
    """

    documents = UnstructuredURLLoader(urls, mode='single', strategy='fast').load()
    logging.info(f'Loaded {len(documents)} documents from [URL]')
    return documents

def load_and_split_doc(paths: list[tuple], org_id: str)-> list[langchain.Document]: # [('abc.pdf', 'pdf'), ('def.txt', 'txt'), ('www.abc.com/cool.pdf', 'online_pdf'), (['www.abc.com/cool', 'www.abc.com/cool2'], 'web_url'])]

    """
    Load and split documents from given paths.

    Args:
        paths (list[tuple]): List of tuples containing path and document type
        org_id (str): Organization ID

    Returns:
        list: List of Langchain Document objects"""
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=100,
        length_function=len
        )
    docs = []

    #TODO - Fill docs dynamically
    for path, doc_type in paths:
        if doc_type == DocType.TXT.value:
            docs.extend(load_txt(path))
        elif doc_type == DocType.PDF.value:
            docs.extend(load_pdf(path))
        elif doc_type == DocType.ONLINE_PDF.value:
            docs.extend(load_online_pdf(path))
        elif doc_type == DocType.WEB_URL.value:
            docs.extend(load_url(path))
        else:
            logging.error(f'Unknown document type: {doc_type}')
            raise Exception(f'Unknown document type: {doc_type}')

    splits = splitter.split_documents(docs)
    logging.info(f"Splitted documents for org_id: {org_id}")
    return splits
