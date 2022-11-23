import axios, { url } from "./customAxios";

import {
  NEW_CUSTOMER_SUCCESS,
  NEW_CUSTOMER_FAIL,
  SET_LOADING_CUSTOMER,
} from "./types";

import { toast } from "react-toastify";
import { errMsg } from "./utils";

export const NEW_CUSTOMER = (form_data) => async (dispatch, getState) => {
  try {
    dispatch({ type: SET_LOADING_CUSTOMER });
    if (form_data.termsCheck) {
      form_data.billingAddress = form_data.address1;
      delete form_data.termsCheck;
    }

    const res = await axios.post(`${url}/customers`, form_data);
    toast.success("Customer successfully added...");
    var inviteObj = {
      businessID: getState().auth.user.cleaner.business,
      body: `you are invited in Wandcleaners as a customer. you should use userName:${form_data.email} password:${form_data.password} for login`,
      URL: "app.wandcleaning.pro/login",
      sendTo: form_data.email,
    };
    const a = await axios.post(`${url}/notifications/invite`, inviteObj);
    console.log(a);
    dispatch({ type: NEW_CUSTOMER_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: NEW_CUSTOMER_FAIL });
    errMsg(error);
  }
};
