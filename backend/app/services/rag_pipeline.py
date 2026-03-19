from app.services.pdf_parser import extract_text_images
from app.services.image_captioner import caption_image
from app.services.embedding_service import embed
from app.vectorstore.faiss_store import add_vectors, search
from app.utils.chunking import chunk_text
from app.services.llm_service import generate_answer
from app.services.reranker import rerank


def process_document(pdf_path):

    texts, images = extract_text_images(pdf_path)

    captions = []

    for img in images[:5]:

        try:
            captions.append(caption_image(img))
        except:
            pass

    all_content = texts + captions

    full_text = "\n".join(all_content)

    chunks = chunk_text(full_text)

    vectors = embed(chunks)

    add_vectors(vectors, chunks)


def query_rag(question):

    q_vector = embed([question])[0]

    candidates = search(q_vector, k=20)

    best_chunks = rerank(question, candidates, top_k=5)

    context = "\n\n".join(best_chunks)

    answer = generate_answer(question, context)

    return answer