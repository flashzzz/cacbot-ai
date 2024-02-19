import os
from langchain_core.documents import Document
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI


def retrieval_chat_chain(user_query: str, context: list[Document]) -> str:
    """
    Chat with the language model using the provided user query and context.

    Args:
        user_query (str): The user's query.
        context (str): The context for the conversation.

    Returns:
        str: The response from the language model.
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
        "context": context,
    }, )
    # llm_res = document_chain.stream({
    #     "input": user_query,
    #     "context": context,
    # })
    return llm_response



#     llm = OpenAI(model="gpt-3.5-turbo-instruct", temperature=0, max_tokens=512)
# for chunk in llm.stream("Write me a song about sparkling water."):
#     print(chunk, end="", flush=True)