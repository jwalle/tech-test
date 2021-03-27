import axios from "axios";
import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import Button from "../../components/Button";
import LoginInput from "../../components/LoginInput";
import { useAppContext } from "../../contexts/AppContext";

const StyledLogin = styled.div`
  max-width: 50%;
  margin: 0 auto;
  form {
    text-align: center;
  }
`

export default function Login() {
  const history = useHistory();
  const { setUserId, setToken } = useAppContext();

  return (
    <StyledLogin>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const username = e?.target['username']?.value;
          const password = e?.target['password']?.value;

          if (!username || !password) return;

          axios.post('http://localhost:4242/auth', {
            username,
            password,
          }).then((res) => {
            setToken(res.data.token)
            setUserId(res.data.userId)
            history.push("/forum?token=" + res.data.token);
          }) //TODO: catch ERROR
        }}
      >
        <LoginInput name="username" placeholder="username" type="text" />
        <LoginInput name="password" placeholder="password" type="password" />
        <Button name="Login" />
      </form>
    </StyledLogin>
  );
}