import Button from "react-bootstrap/Button";
import { useHistory } from 'react-router-dom'
import Modal from "react-bootstrap/Modal"
import "bootstrap/dist/css/bootstrap.min.css";
function ErrorModal({show, handleClose}) {
    const history = useHistory()
    return (
      <>  
        <Modal show={show} onHide={handleClose}  aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header closeButton>
            <Modal.Title>Ah não! Sua senha tá errada! Ou será seu email? Vai ter que tentar de novo</Modal.Title>
          </Modal.Header>
          <Modal.Body>Nem adianta tentar hackear nossos usuários viu bobinho? Temos criptografia de ponta a ponta(seja lá o que isso quer dizer)</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Tentar novamente
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
  export default ErrorModal