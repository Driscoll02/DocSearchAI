from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware

import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from pathlib import Path as p
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain.chains import RetrievalQA

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # This needs to match the frontend url
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load environment variables from the .env file (if present)
load_dotenv()

google_api_key = os.environ["GEMINI_API_KEY"]

@app.post("/invokeLLM")
async def invokeRagLLM(request: Request):
    body = await request.body()
    userPrompt = body.decode('utf-8')
    
    if not userPrompt:
        raise HTTPException(status_code=400, detail="Empty request body")
    
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

    # Prepare the pdf data for embedding generation
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=1000)
    context = "\n\n".join(str(p.page_content) for p in pages)
    texts = text_splitter.split_text(context)

    # Create embeddings of loaded PDF
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001", google_api_key=google_api_key)
        
    vector_index = Chroma.from_texts(texts, embeddings).as_retriever(search_kwargs={"k":3})

    # Make the request to the LLM using a chain
    qa_chain = RetrievalQA.from_chain_type(
        model,
        retriever=vector_index,
        return_source_documents=True
    )

    result = qa_chain({"query": userPrompt})
    return result