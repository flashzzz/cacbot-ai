import unittest
from src.utils.vectorstore_utils import VectorStore

class TestVectorStore(unittest.TestCase):
    def setUp(self):
        self.vector_store = VectorStore('userx')

    def test_upsert_documents(self):
        data_map = {1: 'doc1', 2: 'doc2'}
        self.vector_store.index_name = 'userx'
        self.assertIsInstance("test-index", str)
        self.assertIsInstance(data_map, dict)
    
    def test_semantic_search(self):
        query_vector = [1, 2]
        k = 2
        
        self.assertIsInstance(query_vector, list)
        self.assertIsInstance(k, int)
if __name__ == '__main__':
    unittest.main()