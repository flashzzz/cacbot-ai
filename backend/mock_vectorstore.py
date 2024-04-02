import unittest
from unittest.mock import patch, MagicMock
from src.utils.vectorstore_utils import VectorStore

class TestVectorStore(unittest.TestCase):
    def setUp(self):
        self.vector_store = VectorStore()

    @patch('vectorstore_utils.logging')
    def test_upsert_documents(self, mock_logging):
        mock_data_map = {1: 'doc1', 2: 'doc2'}
        self.vector_store.index_name = 'test_index'
        self.vector_store.upsert_documents(mock_data_map)

        mock_logging.info.assert_any_call('Upserted 2 documents to Pinecone Index(test_index)')

if __name__ == '__main__':
    unittest.main()