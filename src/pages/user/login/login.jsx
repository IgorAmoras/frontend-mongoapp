import React, { useState, useRef } from 'react'
import {useHistory} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { loginUser } from "../../../utils/requestHandler";
import ErrorModal from './errorModal';
import './login.css'
function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [show, setShow] = useState(false);
    const history = useHistory()
  
    const handleClose = () => setShow(false);
  
    const logUser = async () => {
        emailRef.current.value = ''
        passwordRef.current.value = ''
        const res = await loginUser({email, password})
        if(!res){ setShow(true); return }
        window.localStorage.setItem('user', JSON.stringify(res))
        history.push('/projects')
    }

    return (
    <div className = 'login'>
        <div class="wrapper">
            <span>P</span>
            <span>R</span>
            <span>O</span>
            <span>J</span>
            <span>E</span>
            <span>C</span>
            <span>T</span>
            
            <span>M</span>
            <span>A</span>
            <span>N</span>
            <span>A</span>
            <span>G</span>
            <span>E</span>
            <span>R</span>
        </div>
        <div className = 'login-content'>
        <ErrorModal show = {show} handleClose={handleClose}/>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="text-light">Email</Form.Label>
                <Form.Control ref = {emailRef}type="email" placeholder="Entre com seu email" onChange={(e)=>{setEmail(e.target.value)}} />
                <Form.Text className="text-light" >
                Seu email está seguro com a gente
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="text-light">Senha</Form.Label>
                <Form.Control ref = {passwordRef}type="password" placeholder="Digite sua senha" onChange={(e) => { setPassword(e.target.value)}}/>
                <Form.Text className="text-light" >
                Não dê sua senha a estranhos
                </Form.Text>
            </Form.Group>
            <div style = {{display:'flex', justifyContent: 'center'}}>
            <Button variant="warning" type="button" onClick={(e)=> {e.preventDefault(); logUser()}}>
                Fazer login
            </Button>
            </div>
        </Form>
        </div>
    </div>
    )

}

export default Login