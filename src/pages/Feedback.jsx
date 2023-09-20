import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { addFeedback, getFeedbacks } from "../services/web_api";

export default function Home() {
  const [feedbackResuilt, setFeedbackResult] = useState([]); // Estado para armazenar o resultado da pesquisa
  const [feedbackId, setFeedbackId] = useState(0); // Estado para armazenar o texto de pesquisa
  const [inputsData, setInputsData] = useState({
    id: "",
    user_name: "",
    classificacao: "",
    title: "",
    description: "",
  });
  const [isAdmin, setIsAdmin] = useState(false);

  const onChange = (e) => {
    const input = e.target;

    setInputsData({
      ...inputsData,
      [input.name]: input.value,
    });
  };

  const handleListFeedback = async () => {
    const feedbacks = await getFeedbacks();
    setFeedbackResult(feedbacks);
  };

  useEffect(() => {
    handleListFeedback();
    setIsAdmin(Boolean(parseInt(localStorage.getItem("is_admin"))));
  }, []);

  const addFeedbackLocal = async () => {
    setFeedbackId(feedbackId + 1);
    await addFeedback(
      feedbackId,
      inputsData.user_name,
      inputsData.classificacao,
      inputsData.title,
      inputsData.description
    );
  };

  return (
    <Stack
      sx={{ height: "100vh" }}
      justifyContent="space-evenly"
      alignItems="center"
    >
      <Stack
        sx={{ padding: "0 24px" }}
        direction="row"
        spacing={2}
        alignItems="center"
      >
        <TextField
          name="id"
          label="Id"
          variant="outlined"
          onChange={onChange}
          value={inputsData["id"]}
        />
        <TextField
          name="user_name"
          label="Nome do usuario"
          variant="outlined"
          onChange={onChange}
          value={inputsData["user_name"]}
        />
        <TextField
          name="classificacao"
          label="Classificacao"
          variant="outlined"
          onChange={onChange}
          value={inputsData["classificacao"]}
        />
        <TextField
          name="title"
          label="Titulo"
          variant="outlined"
          onChange={onChange}
          value={inputsData["title"]}
        />
        <TextField
          name="description"
          label="Descricao"
          variant="outlined"
          onChange={onChange}
          value={inputsData["description"]}
        />
        {/* <Button onClick={handleListFeedback}>Lista feedback</Button> */}
      </Stack>
      <Button onClick={addFeedbackLocal}>Add feedback</Button>
      {isAdmin && (
        <Button
          onClick={() => {
            localStorage.setItem("feedbackData", []);
            setFeedbackResult([]);
          }}
        >
          Limpar feedbacks
        </Button>
      )}
      <Stack sx={{ height: "60%", width: "100%", overflowY: "auto" }}>
        {isAdmin &&
          feedbackResuilt.map((feedback) => (
            <Stack
              key={feedback.id}
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
            >
              <Typography>ID: {feedback.id}</Typography>
              <Typography>Name: {feedback.user_name}</Typography>
              <Typography>Descricao: {feedback.description}</Typography>
            </Stack>
          ))}
      </Stack>
    </Stack>
  );
}
