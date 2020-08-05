function getStandardAjaxConfig(bearerToken)
{
  return {
    headers: { Authorization: `Bearer ${bearerToken}` }
  };
}

function isUserDataEmpty(userData)
{
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
