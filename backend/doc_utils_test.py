import unittest
from src.utils.doc_utils import RecursiveCharacterTextSplitter, load_txt, custom_pdf_text_loader, load_online_pdf, DocType

class TestDocUtils(unittest.TestCase):
    def setUp(self):
        self.splitter = RecursiveCharacterTextSplitter(
            chunk_size=1024,
            chunk_overlap=256,
            length_function=len
        )
        self.paths = [('/Users/atulverma/Desktop/cacbot-ai/backend/main2.txt', DocType.TXT.value), ('path/to/pdf', DocType.PDF.value), ('https://arxiv.org/pdf/2403.14618.pdf', DocType.ONLINE_PDF.value)]
        self.user_id = 'test_user'

    def test_load_txt(self):
        for path, doc_type in self.paths:
            if doc_type == DocType.TXT.value:
                result = load_txt(path)
                self.assertIsInstance(result, list)

    # def test_custom_pdf_text_loader(self):
    #     for path, doc_type in self.paths:
    #         if doc_type == DocType.PDF.value:
    #             result = custom_pdf_text_loader(path)
    #             self.assertIsInstance(result, str)

    def test_load_online_pdf(self):
        for path, doc_type in self.paths:
            if doc_type == DocType.ONLINE_PDF.value:
                result = load_online_pdf(path)
                self.assertIsInstance(result, list)

if __name__ == '__main__':
    unittest.main()