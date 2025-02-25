from fastapi import FastAPI, File, UploadFile
from fastapi.staticfiles import StaticFiles
import shutil
import os
import fitz  # PyMuPDF for PDF text extraction
import google.generativeai as genai
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Configure Gemini AI
genai.configure(api_key="AIzaSyCgiobpaQEnRO3zVdu2CyHmQxxp89v49Qc")

# Create 'uploads' folder to store PDFs
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Serve static files (PDFs) so they can be accessed via URL
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

# Function to extract text from a PDF
def extract_text_from_pdf(pdf_path):
    doc = fitz.open(pdf_path)
    text = ""
    for page in doc:
        text += page.get_text("text")
    return text

# Function to generate summary using Gemini API
async def get_summary(text):
    model = genai.GenerativeModel("gemini-1.5-pro")
    summary_prompt = f"Summarize the following text in 100 words:\n{text}"
    
    response = model.generate_content(summary_prompt)
    return response.text.strip() if response.text else "Summary not available."

# Function to generate questions using Gemini API
async def get_questions(text):
    model = genai.GenerativeModel("gemini-1.5-pro")
    questions_prompt = f"Generate 5 thought-provoking questions based on the following text:\n{text}"
    
    response = model.generate_content(questions_prompt)
    return response.text.split("\n") if response.text else ["No questions generated."]

# API endpoint to upload PDF
@app.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    # Save PDF file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Extract text from PDF
    text = extract_text_from_pdf(file_path)

    # Generate summary and questions asynchronously
    summary = await get_summary(text)
    questions = await get_questions(text)

    return {
        "pdf_url": f"http://localhost:8000/uploads/{file.filename}",
        "summary": summary,
        "questions": questions
    }
