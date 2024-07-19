import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from pathlib import Path as p
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain.vectorstores import Chroma
from langchain.chains import RetrievalQA

# Load environment variables from the .env file (if present)
load_dotenv()

google_api_key = os.environ["GEMINI_API_KEY"]

# Create a ref to model
model = ChatGoogleGenerativeAI(
    model="gemini-1.5-pro",
    google_api_key=google_api_key,
    temperature=0,
    max_tokens=None,
    timeout=None,
    max_retries=2,
)

# Load typedoc pdf data
pdf_loader = PyPDFLoader("../frontend/App.pdf")
pages = pdf_loader.load_and_split()

# Create embeddings of loaded PDF
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=1000)
context = "\n\n".join(str(p.page_content) for p in pages)
texts = text_splitter.split_text(context)

embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001", google_api_key=google_api_key)
     
vector_index = Chroma.from_texts(texts, embeddings).as_retriever(search_kwargs={"k":3})

qa_chain = RetrievalQA.from_chain_type(
    model,
    retriever=vector_index,
    return_source_documents=True
)

question = "How many components are there in my app?"
result = qa_chain({"query": question})
print(result["result"])