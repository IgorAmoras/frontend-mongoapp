import React from 'react'
import Toast from 'react-bootstrap/Toast'
function Toasty({show, toggleShow, toastMessage}) {
  console.log(toastMessage)
  return (
    <Toast style = {{position: 'absolute',alignContent: 'center'}}className='toast' show={show} onClose={toggleShow}>
    <Toast.Header>
      <strong className="me-auto">Notificação</strong>
    </Toast.Header>
    <Toast.Body>{toastMessage}</Toast.Body>
  </Toast>
  );
}

export default Toasty