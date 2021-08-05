/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreator } from "../../state/index"
import Button from "react-bootstrap/Button";
import { validateUser } from "../../utils/requestHandler";
import LoginModal from "./loginModal";
import "./home.css";
import "bootstrap/dist/css/bootstrap.min.css";


function Home() {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(false)
  const account = useSelector(state => state.account)
  const dispatch = useDispatch();
  const {depositMoney, withdrawMoney} = bindActionCreators(actionCreator, dispatch)

  const handleClose = () => setShow(false);
  const redirect = (location) => {
    history.push(location);
  };
  useEffect(async () => {
    const user = JSON.parse(window.localStorage.getItem('user'))
    if(!user) return
    const validated = await validateUser(user)
    if(!validated) {alert('Sua sessão está inválida, por favor, logue novamente'); return }
    setUser(validated.data.user)

  }, [])

  const btnStyle = {margin: "20px 20px 20px 20px"};
  const loginBtn = {position: 'absolute',heigth: '10px', bottom: '10%', textTransform: 'uppercase'}

  return ( 
    <div className="my-container">
      { user ? <h1 className = 'welcome-message'>Bem vindo, {user.name}!</h1> : 
      <Button variant = 'info' style = {loginBtn}>Criar conta</Button> 
      }
      <div className="center-div">
        <h1 className="center-text">
          Project <br /> Manager
        </h1>
        <p style={{ textTransform: "uppercase" }}>
          A <strong>nova</strong> forma de organizar seus projetos{" "}
        </p>
        <LoginModal show= {show} handleClose= {handleClose} />
        <div classname="bootstrap-buttons">
          <Button variant="primary" style={btnStyle} onClick = {(e)=>{ if(!user){e.preventDefault(); setShow(true); return} redirect('/projects')}}>
            MINHAS
          </Button>
          <Button variant="warning" style={btnStyle} onClick = {()=>{redirect('/createtasks')}}>
            CRIAR
          </Button>
          <Button variant="danger" style={btnStyle} onClick = {()=>{redirect('/deletetasks')}}>
            DELETAR
          </Button>
          <Button variant="dark" style={btnStyle} onClick = {()=>{redirect('/changetasks')}}>
            MODIFICAR
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
