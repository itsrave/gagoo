function getStandardAjaxConfig(bearerToken)
{
  return {
    headers: { Authorization: `Bearer ${bearerToken}` }
  };
}

function isUserDataEmpty(userData)
{
  // if (userData.name === ''){
  //   this.setState({validateMessage: true, isLoading: false});
  //   return
  // }
  // if (userData.phoneNumber === ''){
  //   this.setState({validateMessage: true, isLoading: false});
  //   return
  // }
  // if (userData.city === ''){
  //   this.setState({validateMessage: true, isLoading: false});
  //   return
  // }
  // if (userData.state === ''){
  //   this.setState({validateMessage: true, isLoading: false});
  //   return
  // }
  // if (userData.zipCode === ''){
  //   this.setState({validateMessage: true, isLoading: false});
  //   return
  // }

  return !userData.name
    || !userData.phoneNumber
    || !userData.city
    || !userData.state
    || !userData.zipCode;
}

function isUserDataEqual(oldUserData, newUserData)
{
  return oldUserData.name === newUserData.name
    && oldUserData.phoneNumber === newUserData.phoneNumber
    && oldUserData.city === newUserData.city
    && oldUserData.state === newUserData.state
    && oldUserData.zipCode === newUserData.zipCode;
}

export { getStandardAjaxConfig, isUserDataEmpty, isUserDataEqual };
