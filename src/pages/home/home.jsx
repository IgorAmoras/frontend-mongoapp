/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreator } from "../../state/index"
import Button from "react-bootstrap/Button";
import { validateUser } from "../../utils/requestHandler";
import LoginModal from "./loginModal";
import "./home.scss";
import "bootstrap/dist/css/bootstrap.min.css";


function Home() {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(false)
  const account = useSelector(state => state.account)
  const dispatch = useDispatch();
  const {depositMoney, withdrawMoney} = bindActionCreators(actionCreator, dispatch)

  const handleRedux = () => {
    dispatch(depositMoney(2000));
  }

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
  const loginBtn = {heigth: '10px', bottom: '10%', textTransform: 'uppercase'}

  return ( 
    <div className="my-container">
      <div className="center-div">
        <h1 className="center-text">
          Project <br /> Manager
        </h1>
        <p style={{ textTransform: "uppercase" }}>
          A <strong>nova</strong> forma de organizar seus projetos{" "}
        </p>
        <LoginModal show= {show} handleClose= {handleClose} />
        <div classname="bootstrap-buttons">
          <div>
          <Button variant="primary" style={btnStyle} onClick = {(e)=>{ if(!user){e.preventDefault(); setShow(true); return} redirect('/projects')}}>
            MEUS PROJETOS
          </Button>
          <Button variant="warning" style={btnStyle} onClick = {(e)=>{ if(!user){e.preventDefault(); setShow(true); return} redirect('/createproject')}}>
            CRIAR NOVOS
          </Button>
          {user ? ( 
            <>
            <Button variant="dark" style={btnStyle} onClick = {(e)=>{ if(!user){e.preventDefault(); setShow(true); return} redirect('/userdata')}}>
              MEUS DADOS
            </Button>     
            </>
          ):null}
          </div>
          <div className='lower-row'>
            {user ?
            (<>
              <h1 className = 'welcome-message'>Bem vindo, {user.name}!</h1> 
              <Button variant = 'light' className = 'create-button' onClick={handleRedux}>Redux</Button> 
              <h1>{account}</h1>
            </>): (
              <div className = 'buttons-login'>
              <Button variant = 'info' className = 'create-button' onClick={()=>{history.push('/createuser')}}>CRIAR CONTA</Button> 
              <Button variant = 'light' className = 'create-button' onClick={()=>{history.push('/login')}}>FAZER LOGIN</Button> 
              <Button variant = 'light' className = 'create-button' onClick={()=>{}}>Redux</Button> 

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
