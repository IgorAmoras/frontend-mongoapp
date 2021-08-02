import React from 'react'
import Toast from 'react-bootstrap/Toast'
function ErrorToast({show, toggleShow, toastMessage}) {
  console.log(toastMessage)
  return (
    <Toast className='toast' show={show} onClose={toggleShow}>
    <Toast.Header>
      <strong className="me-auto">Notificação</strong>
    </Toast.Header>
    <Toast.Body>{toastMessage}</Toast.Body>
  </Toast>
  );
}

export default ErrorToast