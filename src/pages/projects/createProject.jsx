/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "./createProject.css";
import { getAllUsers } from "../../utils/requestHandler";
import TaskUpdate from "./taskUpdate/taskUpdate";
import TaskModal from './taskModal/taskModal'


export default function CreateProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [toastMessage, setToastMessage] = useState("Task Submetida")
  const [taskDesc, setTaskDesc] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [responsible, setResponsible] = useState("")
  const [responsibleID, setResponsibleID] = useState()
  const [sysUsers, setSysUsers] = useState([])
  const [taskArr, setTaskArr] = useState([])
  const [showToast, setShowToast] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const handleNewTask = () => {
    if(taskDesc === "" || taskTitle === "" || responsible === "") {setToastMessage("Adicione um nome para suas tasks, e defina seus responsáveis"); toggleShowToast(); return}
    addTask({ taskTitle, taskDesc, responsible, responsibleID })
    setTaskTitle("")
    setTaskDesc("")
    setToastMessage("Task submetida")
    toggleShowToast()
  }

  const addTask = (task) => setTaskArr(prev => [...prev, task]);
  const toggleShowToast = () => setShowToast(!showToast)
  const toggleShowModal = () => setShowModal(!showModal)

  useEffect(async ()=>{
    const { user } = await getAllUsers()
    setSysUsers(user)
  },[])

  const populateDropdown = () => {
    if(!sysUsers) return
    return(
      sysUsers.length === 0 ?  <Dropdown.Item>Não há usuários suficientes no sistema</Dropdown.Item> : (
        sysUsers.map(user => <Dropdown.Item key = {user._id} onClick={()=>{setResponsibleID(user._id); setResponsible(user.name)}}>{user.name}</Dropdown.Item> )
      )
    )
  }

  return (
    <div className="update-project-main">
      <div className="update-form">
        <TaskUpdate show ={showToast} toggleShow={toggleShowToast} message={toastMessage}/>
        <TaskModal show={showModal} handleClose={toggleShowModal} tasks={taskArr} title={title} description={description} />
        <div>
          <div>
            <h1> CRIE SEU NOVO PROJETO</h1>
          </div>
          <div>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label style={{ color: "white" }}>
                  {" "}
                  Título do Projeto
                </Form.Label>
                <Form.Control
                  type="email"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  placeholder="Seu novo título"
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label style={{ color: "white" }}>Descrição</Form.Label>
                <Form.Control
                  type="email"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  on
                  placeholder="Sua nova descrição"
                />
              </Form.Group>
            </Form>
          </div>
          <div>
            <h4> Tasks do projeto </h4>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label style={{ color: "white" }}>Título</Form.Label>
                <Form.Control
                  type="email"
                  value={taskTitle}
                  onChange={(e) => {
                    setTaskTitle(e.target.value);
                  }}
                  placeholder="Seu novo título"
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label style={{ color: "white" }}>Descrição </Form.Label>
                <Form.Control
                  as="textarea"
                  value={taskDesc}
                  onChange={(e) => {
                    setTaskDesc(e.target.value);
                  }}
                  rows={2}
                />
              </Form.Group>
            </Form>
            <div className="submit-form">
              <Dropdown>
                  <Dropdown.Toggle>
                  {responsible ? `${responsible}` : 'Selecione o responsável'}
                  </Dropdown.Toggle >
                  <Dropdown.Menu variant="dark" flip={true}>
                    {populateDropdown()}
                  </Dropdown.Menu>
                </Dropdown>
              <Button variant="warning" onClick={() => {handleNewTask()}}>Adicionar mais tasks</Button>
              <Button variant="dark" onClick={()=>{toggleShowModal()}}>Enviar projeto</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
