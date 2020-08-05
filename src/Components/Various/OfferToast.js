import Col from "react-bootstrap/Col";
import Toast from "react-bootstrap/Toast";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";

function OfferToast(props)
{
  return (<Toast style={{
    position: 'fixed',
    top: '25px',
    right: '25px',
    zIndex: 2,
    display: props.show ? 'block' : 'none'
  }} show={props.show} onClose={props.onClose}>
    <Toast.Header>
      <FontAwesomeIcon icon={faEnvelope} />
      <Col><strong className="mr-auto">Wystąpił błąd</strong></Col>
    </Toast.Header>
    <Toast.Body>
      Nie można dodać ogłoszenia, z powodu błędów w formularzu.
    </Toast.Body>
  </Toast>);
}

export default OfferToast;
