import fitz


def extract_text_images(pdf_path):

    doc = fitz.open(pdf_path)

    texts = []
    images = []

    for page in doc:

        text = page.get_text()

        if text.strip():

            texts.append(text)

        img_list = page.get_images()

        for img in img_list[:2]:   # limit images per page

            xref = img[0]

            base_image = doc.extract_image(xref)

            images.append(base_image["image"])

    return texts, images