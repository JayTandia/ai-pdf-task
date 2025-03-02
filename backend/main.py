from fastapi import FastAPI, File, UploadFile
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
import fitz  
import google.generativeai as genai
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=GEMINI_API_KEY)


UPLOAD_DIR = "backend/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")


def extract_text_from_pdf(pdf_path):
    doc = fitz.open(pdf_path)
    text = []
    for page in doc:
        text.append(page.get_text("text"))
    return "\n".join(text)  


async def get_summary(text):
    model = genai.GenerativeModel("gemini-1.5-pro")
    summary_prompt = f"Summarize the following text in 100 words:\n{text[:5000]}"  # Limit text to avoid API overload
    response = model.generate_content(summary_prompt)
    return response.text.strip() if response.text else "Summary not available."


async def get_questions(text):
    model = genai.GenerativeModel("gemini-1.5-pro")
    questions_prompt = f"Generate 5 thought-provoking questions based on the following text:\n{text[:5000]}"
    response = model.generate_content(questions_prompt)
    return response.text.split("\n") if response.text else ["No questions generated."]


async def chat(message, context):
    model = genai.GenerativeModel("gemini-1.5-pro")
    response = model.generate_content(f"Answer the following question based on the context provided:\n{message}\n\nContext: {context}")
    return response.text.strip() if response.text else "No answer generated."


@app.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer, 1024 * 1024)  

    text = extract_text_from_pdf(file_path)
    print("text",text)
    
    summary = await get_summary(text)
    questions = await get_questions(text)

    return {
        "pdf_url": f"http://localhost:8000/uploads/{file.filename}",
        "summary": summary,
        "questions": questions
    }


class ChatRequest(BaseModel):
    message: str
    context: str

@app.post("/chat")
async def process_chat(request: ChatRequest):  
    answer = await chat(request.message, request.context)
    return {"message": answer}


def run():
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

if __name__ == "__main__":
    run()
