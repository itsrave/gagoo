import Col from "react-bootstrap/Col";
import Toast from "react-bootstrap/Toast";
import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import axios from "axios";
import path from "../../api";

function EmailToast(props) {
  const [token, setToken] = useState(props.token);
  const [showToast, setShowToast] = useState(!props.emailVerification);
  const closeToast = () => setShowToast(false);
  useEffect(() => {
    setShowToast(!props.emailVerification)
  }, [props.emailVerification]);
  useEffect(() => {
    setToken(props.token)
  }, [props.token]);

  function send(e) {
    e.preventDefault();
    const AuthStr = 'Bearer ' + token;
    axios
      .post(path + 'email/resend-confirmation', {headers: {Authorization: AuthStr}})
      .then(res => {
        closeToast()
      });
  }

  return (
    <Toast style={{
      position: 'absolute',
      top: '25px',
      right: '25px',
      zIndex: 2,
      display: showToast ? 'block' : 'none'
    }} show={showToast} onClose={closeToast}>
      <Toast.Header>
        <FontAwesomeIcon icon={faEnvelope}/>
        <Col><strong className="mr-auto">Potwierdź swój email</strong></Col>
      </Toast.Header>
      <Toast.Body>Jeszcze nie potwierdziłeś swojego e-maila, aby wysłać wiadomość jeszcze raz możesz kliknąć
        <Link to={'#'} onClick={send}> tutaj</Link>.
      </Toast.Body>
    </Toast>
  );
}

export default EmailToast;
