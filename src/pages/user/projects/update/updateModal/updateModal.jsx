import React from "react";
import { useLocation, useHistory } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { updateProject } from "../../../../../utils/requestHandler";
import getUser from "../../../../../utils/getCurrentUser";
import "./updateModal.css";
import "bootstrap/dist/css/bootstrap.min.css";

function UpdateModal({ show, handleClose, tasks, title, description }) {
  const { project } = useLocation().state;
  const history = useHistory();
  const parseTasks = () =>
    tasks.map((task, index) => {
      return (
        <div>
          <h6>Task {index + 1}</h6>
          <ul>
            <li>
              <strong>Título</strong> {task.title}
            </li>
            <li>
              <strong>Descrição</strong> {task.description}
            </li>
            <li>
              <strong>Responsável</strong> {task.responsibleName}
            </li>
          </ul>
        </div>
      );
    });

  const handleUpdate = async () => {
    const newProject = {
      title: title.value,
      description: description.value,
      tasks,
    };
    const user = getUser();
    updateProject(project._id, newProject, user);
    history.push("/projects");
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Tem certeza?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          O projeto ficará da seguinte maneira:
          <br />
          <hr />
          <strong>Título</strong> {title?.value || "default"}
          <br />
          <strong>Descrição</strong> {description?.value || "default"}
          <hr />
          <div className="tasks">{parseTasks()}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleUpdate}>
            Atualizar projeto
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateModal;
