import React from 'react'
import Toast from 'react-bootstrap/Toast'

function taskUpdate({show, toggleShow, message}) {
  return (
    <Toast className='toast' style={{position: 'absolute'}}show={show} onClose={toggleShow}>
    <Toast.Header>
      <strong className="me-auto">Notificação</strong>
    </Toast.Header>
    <Toast.Body>{message}</Toast.Body>
  </Toast>
  );
}

export default taskUpdate