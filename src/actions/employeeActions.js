import axios,{url} from './customAxios';
// axios.defaults.withCredentials = true;
// import moment from 'moment';

// import { history } from '../store';
import {
	SET_LOADING_EMPLOYEE,
	COMPANY_INFO_SUCCESS,
	NOT_LOADING_EMPLOYEE,
	COMPANY_INFO_FAIL,
	EMPLOYEE_LIST_SUCCESS,
	EMPLOYEE_LIST_FAIL,
	SELECT_EMPLOYEE_SUCCESS,
	NOTIFICATION_SUCCESS
} from './types';

import { toast } from "react-toastify";
import {errMsg} from './utils';

export const COMPANY_INFO = (form_data) => async (dispatch,getState) => {
	try {
    dispatch({ type: SET_LOADING_EMPLOYEE });
    const id = getState().auth.user.cleaner.business;
    const cleanerId = getState().auth.user.cleaner.id;
		const cleanerObj ={
			firstName:form_data.firstName,
			lastName:form_data.lastName,
			type:form_data.type,
		}
		debugger;

		const res = await axios.put(`${url}/businesses/${id}`, form_data);
		await axios.put(`${url}/cleaners/${cleanerId}`, cleanerObj);

		dispatch({ type: COMPANY_INFO_SUCCESS, payload: res.data });
		toast.success("Helper Info updated scuccessfully...");
	} catch (error) {

		dispatch({ type: COMPANY_INFO_FAIL});
		errMsg(error)
	}
};

export const FETCH_COMPANY_INFO = () => async (dispatch,getState) => {
	try {
    dispatch({ type: SET_LOADING_EMPLOYEE });
    const id = getState().auth.user.cleaner.business;

		const res = await axios(`${url}/businesses/${id}`);

		dispatch({ type: COMPANY_INFO_SUCCESS, payload: res.data });
	} catch (error) {

		dispatch({ type: COMPANY_INFO_FAIL});
		errMsg(error)
	}
};

export const FETCH_NOTIFICATION = () => async (dispatch,getState) => {
	try {
    dispatch({ type: SET_LOADING_EMPLOYEE });
    const id = getState().auth.user.customer.id;
		const res = await axios(`${url}/notifications?customer_eq=${id}&createdBy_eq=cleaner`);

		dispatch({ type: NOTIFICATION_SUCCESS, payload: res.data });
	} catch (error) {

		dispatch({ type: NOT_LOADING_EMPLOYEE});
		errMsg(error)
	}
};

export const SET_EMPLOYEE_LOADING = () => async (dispatch) => {
	dispatch({ type: SET_LOADING_EMPLOYEE });
};

export const UNSET_EMPLOYEE_LOADING = () => async (dispatch) => {
	dispatch({ type: NOT_LOADING_EMPLOYEE });
};

export const FETCH_CLEANERS_SEARCH = (form_data) => async(dispatch) =>{
	try {
		dispatch({type:SET_LOADING_EMPLOYEE});
		debugger;
		const res  = await axios(`${url}/cleaners?type_eq=${form_data.type}`);
		dispatch({type:EMPLOYEE_LIST_SUCCESS,payload:res.data})
	} catch (error) {
		console.log(error)
		dispatch({type:EMPLOYEE_LIST_FAIL})
	}
}
export const SEND_MESSAGE = (form_data) => async(dispatch,getState) =>{
	try {
		const businessId = getState().auth.user.cleaner.business;
		const res  = await axios.post(`${url}/notifications`,{
			businessID:businessId,
			createdBy:'cleaner',
			sendEmail:false,
			...form_data
		});
		toast.success("Message delivered...");

	} catch (error) {
		console.log(error)
		errMsg(error)
	}
}



export const SELECT_EMPLOYEE= (form_data)=> async(dispatch)=>{
	dispatch({type:SELECT_EMPLOYEE_SUCCESS,payload:form_data})
}