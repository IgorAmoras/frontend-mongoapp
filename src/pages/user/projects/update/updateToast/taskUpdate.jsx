import React from 'react'
import Toast from 'react-bootstrap/Toast'
import './taskUpdate.css'
function taskUpdate({show, toggleShow}) {
  return (
    <Toast className='toast' show={show} onClose={toggleShow}>
    <Toast.Header>
      <strong className="me-auto">Notificação</strong>
    </Toast.Header>
    <Toast.Body>Sua task foi submetida</Toast.Body>
  </Toast>
  );
}

export default taskUpdate