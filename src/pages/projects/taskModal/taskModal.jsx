import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import getUser from '../../../utils/getCurrentUser';
import { createProject } from '../../../utils/requestHandler';

export default function ReviewModal({show, handleClose, title, description, tasks}){

  const parseTasks = (tasks) => {
    const parsed = [];
    tasks.forEach(task => {
      const obj = { 
        title: task.taskTitle,
        description: task.taskDesc,
        user: task.responsibleID
      }
      parsed.push(obj)
    })
    return parsed
  }
  const submitProject = async () => {
    const parsed = parseTasks(tasks);
    const project = {
      title, 
      description, 
      tasks: parsed
    }
    const user = getUser()
    try{
      const projectCreated = await createProject(project, user)
      console.log(projectCreated)
    }catch(error){
      console.log(error)
    }

  }
  return(
    <Modal show={show} onHide={handleClose}  aria-labelledby="contained-modal-title-vcenter" centered>
    <Modal.Header closeButton>
      <Modal.Title>Então é este seu projeto?</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <h6><strong>Título</strong> {title}</h6>
      <h6><strong>Descrição</strong> {description}</h6>
      <div className="tasks">
      {tasks.map((task, index) => 
      <>
      <h6>Task {index+1}</h6>
      <ul>
        <li><strong>Título </strong>{task.taskTitle}</li>
        <li><strong>Descrição </strong>{task.taskDesc}</li>
        <li><strong>Responsável </strong>{task.responsible}</li>
      </ul>
      </>
    )}
    </div>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="primary" onClick={handleClose}>
          Não, quero mudar
      </Button>
      <Button variant="danger" onClick={submitProject}>
          Mentira, é isso mesmo
      </Button>
    </Modal.Footer>
  </Modal>
  )
}