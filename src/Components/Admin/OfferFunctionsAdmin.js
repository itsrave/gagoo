import axios from 'axios';
import path from "../../api";
import { getStandardAjaxConfig } from '../User/UserFunctions';

function acceptOffer(offerPublicIdentifier, bearerToken, onSuccess, onError)
{
  axios
    .patch(
      `${path}api/offer/confirm/${offerPublicIdentifier}`,
      null ,
      getStandardAjaxConfig(bearerToken))
    .then(function (result) {
      onSuccess(result);
    })
    .catch(function (error) {
      onError(error);
    });
}

function deleteOffer(offerPublicIdentifier, bearerToken, onSuccess, onError)
{
  axios
    .delete(
      `${path}api/offer/remove/${offerPublicIdentifier}`,
      getStandardAjaxConfig(bearerToken)
    )
    .then(function (result) {
      onSuccess(result);
    })
    .catch(function (error) {
      onError(error);
    });
}

export { acceptOffer, deleteOffer };
