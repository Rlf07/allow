import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { userAutorize } from "../services/web_api";

export default function Login() {
  const [emailText, setEmailText] = useState(""); // Estado para armazenar o texto de pesquisa
  const [passText, setPassText] = useState(""); // Estado para armazenar o texto de pesquisa

  const autorize = async () => {
    if (emailText === "" || passText === "") {
      alert("Email ou senha vazios");
      return;
    }

    if ((await userAutorize(emailText, passText)) == false) {
      alert("Usuario sem acesso");
    } else {
      setTimeout(() => {
        window.location.href = "/feedback";
      }, 500);
      alert("Usuario com acesso");
    }
  };

  return (
    <>
      <Stack
        sx={{ height: "100vh" }}
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Typography component="h2" variant="h2">
          Login
        </Typography>
        <Stack spacing={2}>
          <TextField
            id="email"
            type="text"
            placeholder="Digite o Email"
            value={emailText}
            onChange={(e) => setEmailText(e.target.value)}
          />
          <TextField
            id="pass"
            type="password"
            placeholder="Digite a senha"
            value={passText}
            onChange={(e) => setPassText(e.target.value)}
          />
        </Stack>
        <Button onClick={autorize}>Login</Button>
      </Stack>
    </>
  );
}
