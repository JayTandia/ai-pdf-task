# Project Setup Guide

## 1. Configure the Gemini API Key
Before running the project, update the Gemini API key in the `.env` file inside the backend folder.

1. Open the `.env` file inside the `backend` directory.
2. Update the API key:
   ```
   GEMINI_API_KEY=your_api_key
   ```

## 2. Run the Backend Server
Navigate to the `backend` folder and start the FastAPI server using `uvicorn`:

```sh
cd backend
uv run uvicorn main:app --reload 
```

This will start the backend server on `http://127.0.0.1:8000`.

## 3. Run the Frontend Application
After starting the backend, navigate to the `frontend` folder and start the frontend development server:

```sh
cd frontend
bun install
bun run dev
```

This will start the frontend on `http://localhost:3000`.
