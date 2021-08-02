/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/esm/Button";

import { getResponsible, getAllUsers } from "../../../../utils/requestHandler";
import TaskUpdate from "./updateToast/taskUpdate";
import ModalUpdate from "./updateModal/updateModal";
import "./updateProject.css";

function UpdateProject(props) {
  console.log(props.location)
  const { project } = useLocation().state;
  const [responsibles, setResponsibles] = useState([]);
  const [users, setUsers] = useState([]);
  const [tasksArray, setTaskArray] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const refUser = useRef();
  const refTaskTitle = useRef();
  const refTaskDescription = useRef();
  const refProjectTitle = useRef()
  const refProjectDescription = useRef()

  const { tasks } = project;
  let current;

  useEffect(async () => {
    tasks.forEach(async (task) => {
      const res = await getResponsible(task.responsible);
      addResponsible(res);
    });
    const allUsers = await getAllUsers();
    addUser(allUsers);
  }, []);

  const addResponsible = (newResponsible) =>
    setResponsibles((states) => [...states, newResponsible]);

  const addUser = (user) => setUsers((prev) => [...prev, user]);

  const addTask = (task) => setTaskArray((prev) => [...prev, task]);

  const toggleShowToast = () => setShowToast(!showToast);

  const toggleShowModal = () => setShowModal(!showModal);

  const showResponsible = (index) => {
    if (responsibles.length === 0) return <p>Não há responsáveis</p>;
    return (
      <p>
        <strong>Responsável</strong>{" "}
        {responsibles[index]?.user?.name || "Default"}
      </p>
    );
  };

  const listUsers = () => {
    if (users[0]?.length === 0 || users[0] === undefined)
      return (
        <Dropdown.Item>Não há usuários suficientes no sistema</Dropdown.Item>
      );
    return users[0].user.map((user) => (
      <Dropdown.Item
        variant="dark"
        onClick={() => {
          handleChoose(user);
        }}
        key={user._id}
      >
        {user.name}
      </Dropdown.Item>
    ));
  };

  const handleChoose = (user) => {
    if (!refUser.current) return;
    refUser.current.innerText = ` ${user.name}`;
    current = user._id;
  };

  const handleNewTask = async () => {
    const taskObj = {
      title: refTaskTitle.current.value,
      description: refTaskDescription.current.value,
      responsible: current,
      responsibleName: refUser.current.innerText
    };
    await addTask(taskObj);
    refTaskTitle.current.value = "";
    refTaskDescription.current.value = "";
    refUser.current.innerText = "";
    toggleShowToast();
  };


  return (
    <div className="update-main">
      <h1>Seu projeto</h1>
      <TaskUpdate show={showToast} toggleShow={toggleShowToast} />
      <ModalUpdate
        show={showModal}
        handleClose={toggleShowModal}
        tasks={tasksArray}
        title={refProjectTitle.current}
        description={refProjectDescription.current}
      />
      <Form>
        <div className="sub-div">
          <div style={{ marginRight: "10px" }}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ color: "white" }}> | Título |</Form.Label>
              <Form.Control type="email" ref = {refProjectTitle}placeholder="Seu novo título" />
              <p>
                O título atual é <strong>{project.title}</strong>
              </p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ color: "white" }}>Descrição</Form.Label>
              <Form.Control type="email" ref={refProjectDescription} placeholder="Sua nova descrição" />
              <p>
                O título atual é <strong>{project.description}</strong>
              </p>
            </Form.Group>
          </div>
          <div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div>
                {project.tasks.length === 0 ? (
                  <p style={{ margin: "10px" }}>
                    Não há tasks para este projeto,
                    <br /> acho que todas foram finalizadas :)
                  </p>
                ) : (
                  <>
                    <Form.Label style={{ color: "white" }}>
                      {" "}
                      | Tasks em andamento |
                    </Form.Label>
                    {project.tasks.map((task, index) => (
                      <>
                        <div className="tasks-readonly">
                          <div className="task-group">
                            <div className="task-content">
                              <p>
                                {" "}
                                <strong>Título</strong> {task.title}
                              </p>
                              <p>
                                <strong>Descrição </strong> {task.description}
                              </p>
                              {showResponsible(index)}
                              <Button
                                variant="warning"
                                style={{
                                  alignSelf: "flex-end",
                                  justifyContent: "flex-end",
                                  fontSize: "15px",
                                }}
                              >
                                Finalizada!
                              </Button>
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
                  </>
                )}
              </div>
              <div style={{ marginLeft: "10px" }}>
                <p>| Adionar novas task |</p>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label style={{ color: "white" }}>Título </Form.Label>
                  <Form.Control as="textarea" ref={refTaskTitle} rows={1} />
                  
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label style={{ color: "white" }}>Descrição </Form.Label>
                  <Form.Control as="textarea" ref={refTaskDescription} rows={2} />
                </Form.Group>
                <div className="responsible">
                  <strong style={{ color: "white" }}>Responsável</strong>
                  <p ref={refUser} style={{ marginLeft: "10px" }}></p>
                </div>
                <Dropdown>
                  <Dropdown.Toggle variant="dark">
                    Selecione o responsável
                  </Dropdown.Toggle>
                  <Dropdown.Menu variant="dark">{listUsers()}</Dropdown.Menu>
                </Dropdown>
                <Button
                  variant="outline-warning"
                  className="new-task-button"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNewTask();
                  }}
                >
                  Adicionar task
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="update-project-button">
          <Button
            variant="danger"
            onClick={(e) => {
              e.preventDefault();
              toggleShowModal();
            }}
          >
            Alterar projeto!
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default UpdateProject;
