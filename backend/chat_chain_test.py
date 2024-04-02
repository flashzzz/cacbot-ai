import unittest
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate

class TestChatChain(unittest.TestCase):
    def setUp(self):
        self.prompt = ChatPromptTemplate.from_template("""Answer the following question based only on the provided context:
<context>
{context}
</context>
Question: {input}""")
        self.user_query = 'test_query'
        self.context = 'test_context'

    def test_invoke(self):
        response = self.prompt.invoke({
            "input": self.user_query,
            "context": self.context,
        })
        self.assertIsInstance(response.to_string(), str)

if __name__ == '__main__':
    unittest.main()