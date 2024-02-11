import os
from langchain_core.documents import Document
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI


def retrieval_chat_chain(user_query: str, context: list[Document]) -> str:
    """
    This function generates a response to a user query based on the provided context using the ChatGPT model.

    Args:
        user_query (str): The user's query.
        context (str): The context in which the query is being asked.

    Returns:
        str: The generated response to the user query.
    """
    llm = ChatOpenAI(api_key=os.environ.get("OPENAI_API_KEY"), model="gpt-3.5-turbo")

    prompt = ChatPromptTemplate.from_template("""Answer the following question based only on the provided context:
<context>
{context}
</context>
Question: {input}""")

    document_chain = create_stuff_documents_chain(llm, prompt)

    llm_response = document_chain.invoke({
        "input": user_query,
        "context": context
    })
    return llm_response