from sentence_transformers import CrossEncoder

reranker = None


def load_model():

    global reranker

    if reranker is None:

        reranker = CrossEncoder(
            "cross-encoder/ms-marco-MiniLM-L-6-v2"
        )


def rerank(query, passages, top_k=5):

    load_model()

    pairs = [[query, p] for p in passages]

    scores = reranker.predict(pairs)

    scored = list(zip(passages, scores))

    scored.sort(key=lambda x: x[1], reverse=True)

    reranked = [p[0] for p in scored[:top_k]]

    return reranked