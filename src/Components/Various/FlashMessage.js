import Toast from "react-bootstrap/Toast";
import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import Col from "react-bootstrap/Col";
import {Link} from "react-router-dom";

function FlashMessage(props)
{
  const [showToast, setShowToast] = useState(false);
  const [header, addHeader] = useState(props.header);
  const [body, addBody] = useState(props.body);

  const closeToast = () => setShowToast(false);
  const setHeader = (content) => addHeader(content);
  const setBody = (context) => addBody(context);

  return (
    <Toast style={{
      position: 'absolute',
      top: '25px',
      right: '25px',
      zIndex: 2,
      display: showToast ? 'block' : 'none'
    }} show={showToast} onClose={closeToast}>
      <Toast.Header>
        {header}
      </Toast.Header>
      <Toast.Body>
        {body}
      </Toast.Body>
    </Toast>
  );
}

export default FlashMessage;
