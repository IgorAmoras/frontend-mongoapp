import React, { useState, useRef } from "react";
import {useHistory} from 'react-router-dom'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ErrorToast from "./errorToast/errorToast";
import { createUser } from "../../../utils/requestHandler";
import { setUser } from "../../../utils/getCurrentUser";
import "./createUser.css";

function CreateUser() {
  const [radioValue, setRadioValue] = useState("1");
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const history = useHistory()
  const refName = useRef();
  const refEmail = useRef();
  const refConfEmail = useRef();
  const refPassword = useRef();
  const refConfPassword = useRef();
  const radios = [
    { name: "Membro", value: "1" },
    { name: "Administrador", value: "2" },
  ];

  const validateData = () => {
    if (
      refPassword.current.value !== refConfPassword.current.value ||
      refPassword.current.value === ""
    ) {
      setToastMessage("Password does not match");
      return true;
    }
    else if (
      refEmail.current.value !== refConfEmail.current.value ||
      refEmail.current.value === ""
    ) {
      setToastMessage("Email does not match");
      return true
    }
    else if(!refEmail.current.value.includes('@')) {
      setToastMessage("Invalid email")
      return true
    }
    else{ return false } ;
  };

  const handleCreate = async () => {
    if (
      !refName.current ||
      !refConfEmail.current ||
      !refEmail.current ||
      !refPassword.current ||
      !refConfPassword.current
    ) return;
    if (validateData()) {toggleShowToast(); return;}
    const user = {
      name: refName.current.value,
      email: refEmail.current.value,
      password: refPassword.current.value
    }
    try {
      const data= await createUser(user)
      setUser(parseUser(data.data))
      history.push('/home')
    } catch (error) {
      console.log(error)
      //setToastMessage(`${error.data.error}, change email, or login into the system`)
    }
  };

  const toggleShowToast = () => setShowToast(!showToast);

  const parseUser = (user) => {
    let parsedUser = {}
    parsedUser.user= user.user
    parsedUser.token=user.token
    return parsedUser
  }

  return (
    <div className="update-user">
      <ErrorToast
        show={showToast}
        toggleShow={toggleShowToast}
        toastMessage={toastMessage}
      />
      <h1> CRIE SEUS PROJETOS COM A GENTE</h1>
      <Form>
        <div className="first-part-form">
          <Form.Group
            style={{ padding: "0 10px 0 0" }}
            className="mb-3"
            controlId="formBasicEmail"
          >
            <Form.Label className="text-light">Nome</Form.Label>
            <Form.Control
              ref={refName}
              type="email"
              placeholder="Seu lindissimo nome"
            />
          </Form.Group>
          <Form.Group
            style={{ padding: "0 10px 0 0" }}
            className="mb-3"
            controlId="formBasicEmail"
          >
            <Form.Label className="text-light">Email</Form.Label>
            <Form.Control ref={refEmail} type="email" placeholder="Seu email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="text-light">Confirme seu email</Form.Label>
            <Form.Control
              ref={refConfEmail}
              type="email"
              placeholder="Seuemail@email.com"
            />
          </Form.Group>
        </div>
        <div className="second-part-form">
          <Form.Group
            style={{ padding: "0 50px 0 0" }}
            className="mb-3"
            controlId="formBasicPassword"
          >
            <Form.Label className="text-light">Senha</Form.Label>
            <Form.Control
              ref={refPassword}
              type="password"
              placeholder="Digite sua senha"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="text-light">Confirme sua senha</Form.Label>
            <Form.Control
              ref={refConfPassword}
              type="password"
              placeholder="Digite sua senha"
            />
            <Form.Text className="text-light">
              Não dê sua senha a estranhos
            </Form.Text>
          </Form.Group>
        </div>
        <div className="user-role">
          <p>Função</p>
          <ButtonGroup className="mb-2">
            {radios.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant="primary"
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => setRadioValue(e.currentTarget.value)}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </div>
        <div
          style={{ display: "flex", justifyContent: "center", margin: "10px" }}
        >
          <Button
            variant="warning"
            type="button"
            onClick={e => {
              e.preventDefault();
              handleCreate();
            }}
          >
            Criar usuário
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreateUser;
