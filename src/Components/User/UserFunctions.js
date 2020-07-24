function getStandardAjaxConfig(bearerToken)
{
  return {
    headers: { Authorization: `Bearer ${bearerToken}` }
  };
}

export { getStandardAjaxConfig };
