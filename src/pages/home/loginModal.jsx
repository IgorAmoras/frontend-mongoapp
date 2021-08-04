import Button from "react-bootstrap/Button";
import { useHistory } from 'react-router-dom'
import Modal from "react-bootstrap/Modal"
import "bootstrap/dist/css/bootstrap.min.css";
function LoginModal({show, handleClose}) {
    const history = useHistory()
    return (
      <>  
        <Modal show={show} onHide={handleClose}  aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header closeButton>
            <Modal.Title>Opaaaa, calma aí, você precisa de uma conta</Modal.Title>
          </Modal.Header>
          <Modal.Body>Para acessar essa tecnologia estado da arte você estar logado em nosso sistema.<br /> Se não tiver uma conta com a gente é só fechar o modal e criar uma!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Fechar
            </Button>
            <Button variant="primary" onClick={() => {history.push('/login')}}>
              Fazer login
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
  export default LoginModal