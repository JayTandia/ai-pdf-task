# 🤖📄 AI-PDF: Intelligent Document Interaction with Gemini AI

Unlock the power of AI for your PDF documents with AI-PDF! This project leverages the Gemini AI SDK to provide intelligent summarization, question generation, and conversational interaction with your PDFs. Built with a modern tech stack of Next.js and FastAPI, AI-PDF offers a seamless and intuitive user experience. This project allows users to upload a PDF document, get a concise summary of its content, generate thought-provoking questions based on the text, and engage in a conversational chatbot experience grounded in the PDF's information.

This project is designed for:

*   **Students and researchers:** Quickly grasp the key concepts of research papers and textbooks.
*   **Professionals:** Efficiently process and understand lengthy reports and documents.
*   **Anyone who wants to interact with PDFs in a more engaging and insightful way.**

## 🏛️ Architecture Overview

Here's a high-level architecture diagram illustrating the system's components and data flow:

```mermaid
    graph LR
    A[Frontend: Next.js] -- "Upload PDF" --> B[Backend: FastAPI]
    B -- "Store PDF" --> C[(Uploads Directory)]
    B -- "Extract Text" --> D{PDF Text Extractor: fitz}
    D --> E[PDF Text]
    E --> F[Gemini AI SDK]
    F -- "Summarize" --> G[Summary]
    F -- "Generate Questions" --> H[Questions]
    F -- "Chat Interaction" --> I[Chatbot Response]
    G --> B
    H --> B
    I --> B
    B -- "Return Results" --> A
    
    style A fill:#fce8f9,stroke:#333,stroke-width:1px
    style B fill:#e8f0fc,stroke:#333,stroke-width:1px
    style C fill:#f0f0f0,stroke:#333,stroke-width:1px
    style D fill:#fef7e0,stroke:#333,stroke-width:1px
    style E fill:#fffaf2,stroke:#333,stroke-width:1px
    style F fill:#e8f0fc,stroke:#333,stroke-width:1px
    style G fill:#e6f4ea,stroke:#333,stroke-width:1px
    style H fill:#fff4e5,stroke:#333,stroke-width:1px
    style I fill:#fce8e6,stroke:#333,stroke-width:1px
 ```

**Key Architectural Decisions:**

*   **Frontend (Next.js):** Provides a modern, reactive user interface for uploading PDFs and interacting with the AI features. Next.js enables fast page loads and excellent SEO.
*   **Backend (FastAPI):** Serves as the API layer, handling PDF processing, AI interactions, and data management. FastAPI's asynchronous capabilities and automatic data validation ensure high performance and maintainability.
*   **Gemini AI SDK:** Powers the core AI functionalities, including summarization, question generation, and chatbot interaction. The SDK offers a simple and efficient way to integrate with Google's powerful AI models.
*   **fitz:** Used to extract text from the PDF documents.
*   **CORS:** Enabled for cross-origin requests between the frontend and backend.

## ✨ Key Features

*   **PDF Upload:** Easily upload PDF documents through the intuitive frontend interface.
*   **AI-Powered Summarization:** Generate concise summaries of PDF content using the Gemini AI SDK.
*   **Question Generation:** Automatically generate thought-provoking questions based on the PDF's text.
*   **Interactive Chatbot:** Engage in conversational interactions with an AI chatbot grounded in the PDF's information.
*   **User-Friendly Interface:** Clean and intuitive Next.js frontend for a seamless user experience.
*   **Asynchronous Processing:** FastAPI backend handles PDF processing and AI interactions asynchronously for optimal performance.

## 💻 Technology Stack

*   **Frontend:**
    *   Next.js (version 14)
    *   React (version 18)
    *   Tailwind CSS (version 3)
*   **Backend:**
    *   FastAPI (version 0.109.0)
    *   Python (version 3.11)
    *   Uvicorn (version 0.30.1)
    *   Google Gemini AI SDK (version 1.2.0)
    *   fitz (PyMuPDF) (version 1.24.0)
*   **Package Manager:** Bun (version 1.0) and npm (version 10.0)

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

*   **Python:** Version 3.7+ ([https://www.python.org/downloads/](https://www.python.org/downloads/))
*   **Node.js:** Version 18+ ([https://nodejs.org/](https://nodejs.org/)) or **Bun:** Latest Version ([https://bun.sh/](https://bun.sh/))
*   **pip:** Python package installer (usually included with Python)
*   **Bun:** Install using `npm install -g bun`

### Installation

Follow these steps to install and run the project:

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd ai-pdf-task
    ```

2.  **Navigate to the backend directory:**

    ```bash
    cd backend
    ```

3.  **Create a virtual environment (optional but recommended):**

    ```bash
    python -m venv venv
    source venv/bin/activate  # On Linux/macOS
    venv\Scripts\activate  # On Windows
    ```

4.  **Install backend dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

5.  **Navigate to the frontend directory:**

    ```bash
    cd ../frontend
    ```

6.  **Install frontend dependencies:**

    ```bash
    bun install # or npm install or yarn install or pnpm install
    ```

### Configuration

1.  **Configure the Gemini API Key:**

    *   Obtain a Gemini API key from [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey).
    *   Create a `.env` file in the `backend` directory.
    *   Add your API key to the `.env` file:

        ```
        GEMINI_API_KEY=YOUR_API_KEY
        ```

    *   **Important:** Do not commit the `.env` file to your repository.  Add it to your `.gitignore` file.

### Quick Start

1.  **Start the backend server:**

    ```bash
    cd backend
    uvicorn main:app --reload
    ```

    This will start the FastAPI server on `http://127.0.0.1:8000`.

2.  **Start the frontend application:**

    ```bash
    cd frontend
    bun run dev # or npm run dev or yarn run dev or pnpm run dev
    ```

    This will start the Next.js development server on `http://localhost:3000`.

3.  **Open your browser and navigate to `http://localhost:3000` to access the application.**

### Usage Examples

*   **Uploading a PDF:** Click the "Choose File" button and select a PDF document from your local machine.

*   **Generating a Summary:** After uploading, the AI will automatically generate a summary of the document.

*   **Asking Questions:**  The application will generate 5 questions based on the PDF content.

*   **Chatting with the AI:**  Type your question in the chat box and press enter. The AI will respond based on the content of the uploaded PDF.

## 📚 Detailed Usage Guide

### Core Functionality

The core functionality revolves around processing PDF documents using the Gemini AI SDK. The backend exposes endpoints for uploading PDFs, extracting text, generating summaries and questions, and engaging in conversational interactions. The frontend provides a user-friendly interface to interact with these endpoints.

#### PDF Upload and Processing

1.  The user uploads a PDF file through the frontend.
2.  The frontend sends the file to the `/upload-pdf` endpoint on the backend.
3.  The backend saves the PDF file to the `backend/uploads` directory.
4.  The backend extracts text from the PDF using `fitz`.
5.  The extracted text is then used for summarization, question generation, and chat interactions.

#### AI Interactions

The backend uses the Gemini AI SDK to perform the following tasks:

*   **Summarization:** The `get_summary` function uses the `gemini-1.5-pro` model to generate a concise summary of the extracted text.

    ```python
    async def get_summary(text):
        model = genai.GenerativeModel("gemini-1.5-pro")
        summary_prompt = f"Summarize the following text in 100 words:\n{text[:5000]}"  # Limit text to avoid API overload
        response = model.generate_content(summary_prompt)
        return response.text.strip() if response.text else "Summary not available."
    ```

*   **Question Generation:** The `get_questions` function generates thought-provoking questions based on the extracted text.

    ```python
    async def get_questions(text):
        model = genai.GenerativeModel("gemini-1.5-pro")
        questions_prompt = f"Generate 5 thought-provoking questions based on the following text:\n{text[:5000]}"
        response = model.generate_content(questions_prompt)
        return response.text.split("\n") if response.text else ["No questions generated."]
    ```

*   **Chat Interaction:** The `chat` function uses the `gemini-1.5-pro` model to answer questions based on the extracted text from the PDF.

    ```python
    async def chat(message, context):
        model = genai.GenerativeModel("gemini-1.5-pro")
        response = model.generate_content(f"Answer the following question based on the context provided:\n{message}\n\nContext: {context}")
        return response.text.strip() if response.text else "No answer generated."
    ```

### Configuration Options

The project's behavior can be configured using environment variables. Currently, the only configurable option is the `GEMINI_API_KEY`.

### API Documentation

The backend exposes the following API endpoints:

*   **`POST /upload-pdf`**: Uploads a PDF file.
    *   **Request body:** `file: UploadFile = File(...)` (the PDF file to upload)
    *   **Response:**
        ```json
        {
            "filename": "example.pdf",
            "summary": "...",
            "questions": ["...", "..."],
            "chat_history": []
        }
        ```
*   **`POST /chat`**: Sends a chat message and receives a response from the AI chatbot.
    *   **Request body:**
        ```json
        {
            "message": "Your question here"
        }
        ```
    *   **Response:**
        ```json
        {
            "response": "AI chatbot response"
        }
        ```

### Troubleshooting

*   **Gemini API Key Issues:** Ensure that your `GEMINI_API_KEY` is correctly set in the `.env` file and that the API key is valid.
*   **CORS Errors:** If you encounter CORS errors, verify that the `allow_origins` setting in the `CORSMiddleware` is correctly configured in `backend/main.py`.
*   **Dependency Issues:** If you encounter issues with missing or incompatible dependencies, ensure that you have followed the installation instructions correctly and that your virtual environment is activated (if you are using one). Check the `requirements.txt` for backend and `package.json` for frontend.
*   **File Upload Issues:** Ensure that the `backend/uploads` directory exists and that the backend server has the necessary permissions to write to it.
*   **Model Loading Issues:** If Gemini fails to load, confirm that your API Key is correct, and try again. Make sure your API key has the Gemini API enabled.

## 🛠️ Development & Contribution

### Development Setup

To set up the development environment, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd ai-pdf-task
    ```

2.  **Install dependencies (as described in the Installation section).**

3.  **Set up your IDE or editor of choice.**  VS Code is recommended.

### Testing

Currently, there are no automated tests. However, thorough testing should be implemented as part of a contribution.

### Code Style and Linting Guidelines

*   Follow PEP 8 guidelines for Python code.
*   Use Prettier for formatting JavaScript and TypeScript code.
*   Write clear, concise, and well-documented code.
*   Use meaningful variable and function names.

### Git Workflow and Branching Strategy

*   Use feature branches for all new development.
*   Branch names should be descriptive (e.g., `feature/add-summarization`, `fix/cors-error`).
*   Keep branches up-to-date with the `main` branch.
*   Make small, focused commits with clear commit messages.

### Pull Request Process

1.  Create a new feature branch from the `main` branch.
2.  Implement your changes and write tests (if applicable).
3.  Commit your changes with clear commit messages.
4.  Push your branch to GitHub.
5.  Create a pull request from your branch to the `main` branch.
6.  Provide a detailed description of your changes in the pull request.
7.  Wait for code review and address any feedback.
8.  Once your pull request is approved, it will be merged into the `main` branch.

### Issue Reporting Guidelines

*   Before submitting an issue, search the existing issues to avoid duplicates.
*   Provide a clear and detailed description of the issue.
*   Include steps to reproduce the issue (if possible).
*   Include any relevant error messages or logs.

