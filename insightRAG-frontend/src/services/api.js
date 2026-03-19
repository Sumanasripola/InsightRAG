import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

export const uploadPDF = async (file) => {

  const formData = new FormData();
  formData.append("file", file);

  const res = await API.post("/upload/", formData,{
    headers:{
      "Content-Type":"multipart/form-data"
    }
  });

  return res.data;

};

export const askQuestion = async (question,pdfs) => {

  const res = await API.post("/query/",{
    question,
    pdfs
  });

  return res.data;

};