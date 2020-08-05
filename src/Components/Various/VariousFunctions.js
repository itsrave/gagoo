import React from 'react';
import '../Css/Additional.css';

function arrayToString(errorsArray)
{
  return errorsArray.map(error => <p className="error-p">{error}</p>);
}

export { arrayToString };
