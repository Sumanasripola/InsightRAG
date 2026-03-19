import faiss
import pickle
import os
import numpy as np

INDEX_PATH = "vector_db/faiss.index"
META_PATH = "vector_db/meta.pkl"

dimension = 384

index = None
documents = []

# ensure folder exists
os.makedirs("vector_db", exist_ok=True)


def load_index():

    global index, documents

    try:

        if os.path.exists(INDEX_PATH) and os.path.exists(META_PATH):

            index = faiss.read_index(INDEX_PATH)

            with open(META_PATH, "rb") as f:
                documents = pickle.load(f)

        else:

            index = faiss.IndexFlatL2(dimension)
            documents = []

    except Exception:

        print("FAISS index corrupted. Creating new index...")

        index = faiss.IndexFlatL2(dimension)
        documents = []


def save_index():

    faiss.write_index(index, INDEX_PATH)

    with open(META_PATH, "wb") as f:
        pickle.dump(documents, f)


def add_vectors(vectors, texts):

    index.add(np.array(vectors))

    documents.extend(texts)

    save_index()


def search(query_vector, k=20):

    distances, indices = index.search(
        np.array([query_vector]), k
    )

    results = []

    for i in indices[0]:

        if i < len(documents):

            results.append(documents[i])

    return results


# load index when server starts
load_index()