# 🚀 InsightRAG – Multimodal Document Intelligence System

InsightRAG is an AI-powered platform that allows users to upload multiple PDF documents and interact with them through intelligent, context-aware chat sessions. It uses a **Retrieval-Augmented Generation (RAG)** pipeline to generate accurate answers grounded in document content.

---

## ✨ Features

* 📄 Upload and process multiple PDFs
* 💬 Create multiple persistent chat sessions
* 🔍 Semantic search using vector embeddings
* 🧠 Context-aware Q&A using RAG
* 📊 Reranking for better answer accuracy
* 🖼️ Image captioning from PDFs
* 🔁 Switch between chats with preserved document context

---

## 🧠 How It Works

1. User uploads one or more PDFs
2. PDFs are parsed to extract:

   * Text
   * Images
   * Tables
3. Content is split into smaller chunks
4. Each chunk is converted into vector embeddings
5. Embeddings are stored in a FAISS vector database
6. When a question is asked:

   * Relevant chunks are retrieved
   * Reranked for accuracy
   * Sent to LLM (Groq - Llama 3)
7. Final answer is returned to the UI

---

## 🏗️ Project Structure

### 📁 Backend (FastAPI)

```
backend/
│
├── app/
│   ├── api/
│   │   ├── upload.py        # Upload PDF endpoint
│   │   └── query.py         # Ask question endpoint
│   │
│   ├── services/
│   │   ├── rag_pipeline.py  # Main RAG workflow
│   │   ├── pdf_parser.py    # Extract text + images
│   │   ├── embedding_service.py
│   │   ├── llm_service.py   # Groq LLM integration
│   │   ├── reranker.py
│   │   └── image_captioner.py
│   │
│   ├── vectorstore/
│   │   └── faiss_store.py   # Vector DB logic
│   │
│   ├── utils/
│   │   ├── chunking.py
│   │   └── file_utils.py
│   │
│   ├── models/
│   │   ├── request_models.py
│   │   └── response_models.py
│   │
│   ├── config.py
│   └── main.py              # FastAPI app entry
│
├── run.py                   # Starts server
└── vector_db/               # FAISS index storage
```

---

### 📁 Frontend (React)

```
frontend/
│
├── src/
│   ├── components/
│   │   ├── ChatInterface.jsx
│   │   ├── PDFUploader.jsx
│   │   ├── Sidebar.jsx
│   │   ├── MessageBubble.jsx
│   │
│   ├── pages/
│   │   └── Dashboard.jsx
│   │
│   ├── services/
│   │   └── api.js           # Backend API calls
│   │
│   └── App.jsx
```

---

## ⚙️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Axios

### Backend

* FastAPI
* Uvicorn
* Python

### AI / ML

* Sentence Transformers (MiniLM)
* FAISS (Vector Database)
* Cross-Encoder (Reranker)
* Groq (Llama 3 LLM)

### Document Processing

* PyMuPDF
* Camelot (tables)
* BLIP (image captioning)

---

## 🔄 RAG Pipeline

```
User Query
   ↓
Embedding Model
   ↓
FAISS Vector Search
   ↓
Top-K Chunks
   ↓
Reranker
   ↓
LLM (Groq)
   ↓
Final Answer
```

---

## 🧪 API Endpoints

### Upload PDF

```
POST /upload/
```

### Ask Question

```
POST /query/
Body:
{
  "question": "Your question here"
}
```

---

## 🛠️ Installation & Setup

### 1. Clone Repository

```
git clone https://github.com/your-username/InsightRAG.git
cd InsightRAG
```

---

### 2. Backend Setup

```
cd backend
python -m venv venv
venv\Scripts\activate   # Windows

pip install -r requirements.txt
```

Create `.env` file:

```
GROQ_API_KEY=your_api_key_here
```

Run server:

```
python run.py
```

---

### 3. Frontend Setup

```
cd frontend
npm install
npm run dev
```

---

## 📌 Usage

1. Upload a PDF
2. Wait for processing
3. Ask questions
4. Get answers based on document content

---

## 🚧 Future Enhancements

* Multi-PDF selection per chat
* Persistent chat sessions
* PDF viewer integration
* Streaming LLM responses
* User authentication

---

## 🤝 Contribution

Contributions are welcome! Feel free to fork and improve the project.

---

## 📄 License

This project is open-source and available under the MIT License.

---

## 🌟 Acknowledgements

* Hugging Face
* Groq
* FAISS
* Open-source community

---

💡 InsightRAG bridges the gap between static documents and interactive AI-driven knowledge systems.
