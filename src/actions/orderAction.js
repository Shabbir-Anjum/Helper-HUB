import axios,{url} from './customAxios';
import moment from 'moment';
// axios.defaults.withCredentials = true;

// import { history } from '../store';
import {
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
	FETCH_APPOINTLIST_SUCCESS,
	FETCH_APPOINTLIST_FAIL,
	FETCH_CLEANER_SUCCESS,
	FETCH_CLEANER_FAIL,
  NEW_ORDER_SUCCESS,
  NEW_ORDER_FAIL,
	BOOKING_PAYMENT_SUCCESS,
	SET_LOADING_ORDER,
	ORDER_REVENUE_SUCCESS,
	ORDER_REVENUE_FAIL,
	ORDER_FIND_FAIL,
	ORDER_FIND_SUCCESS,
	ORDER_UPDATE_SUCCESS,
	ORDER_UPDATE_FAIL,
	FETCH_STATS_SUCCESS,
	FETCH_STATS_FAIL,
	NEXT_SERVICE_SUCCESS,
	SELECT_EMPLOYEE_SUCCESS,
	REVIEW_SUCCESS,
	REVIEW_FAIL
} from './types';

import { toast } from "react-toastify";
import {errMsg} from './utils';

export const NEW_ORDER = (form_data) => async (dispatch,getState) => {

	// const {email} = getState().auth.user;
	// console.log(email)

	try {
		dispatch({ type: NEW_ORDER_SUCCESS, payload: form_data.values });
		form_data.history.push('/bookingPayment')
	} catch (error) {
		dispatch({ type: NEW_ORDER_FAIL});
		errMsg(error)
	}
};
export const BOOKING_PAYMENT = (form_data) => async (dispatch,getState) => {

	try {
    dispatch({ type: SET_LOADING_ORDER });
	

		const {id} = getState().auth.user.customer;
		const sceduleId = getState().employee.employee.schedule.id;
		const cleanerId = getState().employee.employee.id;
		const available = getState().employee.employee.schedule.available;
		const type = getState().employee.employee.type;
		const {order} = getState().order;
		const time = moment(order.time).format('HH:mm:ss.SSS')
    const data={
			...order,
			time,
			customer:id,
			cleaner:cleanerId,
			paidBy:form_data.paidBy,
			type
    };
		debugger;
		if(!available){
			toast.warn("Helper not Available...");
			return;
		}

		const res = await axios.post(`${url}/bookings`,data);
		await axios.put(`${url}/schedules/${sceduleId}`,{available:false})

		dispatch({ type: BOOKING_PAYMENT_SUCCESS, payload: res.data });
		dispatch({ type: SELECT_EMPLOYEE_SUCCESS, payload: {} });
		// form_data.history.push('/orders')
		toast.success("Booking created scuccessfully...");
	} catch (error) {
		errMsg(error)
	}
};

export const FETCH_CLEANER = () => async (dispatch,getState) => {
	try {
		const res = await axios.get(`${url}/cleaners/fetchcleaner`);

		dispatch({ type: FETCH_CLEANER_SUCCESS, payload: res.data });
	} catch (error) {
		dispatch({ type: FETCH_CLEANER_FAIL});
		// errMsg(error)
	}
};

export const ClEANER_CLEANER=()=>async(dispatch,getState)=>{
	try {
		const cleanerId=getState().auth.user.cleaner.id;
		const res = await axios.get(`${url}/cleaners/${cleanerId}`);

		dispatch({ type: FETCH_CLEANER_SUCCESS, payload: res.data });
	} catch (error) {
		dispatch({ type: FETCH_CLEANER_FAIL});
		// errMsg(error)
	}
}

export const FETCH_STATS = () => async (dispatch) => {
	try {
		const res = await axios.get(`${url}/cleaners/stats`);

		dispatch({ type: FETCH_STATS_SUCCESS, payload: res.data });
	} catch (error) {
		dispatch({ type: FETCH_STATS_FAIL});
		// errMsg(error)
	}
};

export const UPDATE_ORDER = (form_data) => async (dispatch) => {
	try {
    dispatch({ type: SET_LOADING_ORDER });

    const data={
			status:form_data.status,
    };



		const res = await axios.put(`${url}/sales/${form_data.id}`, data);
		await axios.put(`${url}/cleaners/${form_data.cleaner.id}`,{available:true})


		dispatch({ type: ORDER_UPDATE_SUCCESS, payload: res.data });
		toast.success("ORDER updated scuccessfully...");
	} catch (error) {

		dispatch({ type: ORDER_UPDATE_FAIL});
		errMsg(error)
	}
};

export const ORDER_LIST = () => async (dispatch,getState) => {
	try {
    dispatch({ type: SET_LOADING_ORDER });
		// debugger;
		const type = getState().auth.user.role.name;
		const cleanerId=getState().auth.user.cleaner?.id
		let res=[];
		if(type==='cleaner' || type==='premium' || type==='Authenticated'){
			res = await axios.get(`${url}/bookings?cleaner_eq=${cleanerId}`);
			dispatch({ type: ORDER_LIST_SUCCESS, payload: res.data });
		}
	} catch (error) {
		dispatch({ type: ORDER_LIST_FAIL});
		errMsg(error)
    
	}
};

export const ORDER_LIST_CUSTOMER = () => async (dispatch,getState) => {
	try {
    dispatch({ type: SET_LOADING_ORDER });
		// debugger;
		const customerId=getState().auth.user.customer?.id
		let res=[];
			res = await axios.get(`${url}/bookings?customer_eq=${customerId}`);
			dispatch({ type: ORDER_LIST_SUCCESS, payload: res.data });
	} catch (error) {
		dispatch({ type: ORDER_LIST_FAIL});
		errMsg(error)
    
	}
};

export const FETCH_APPOINTLIST = (form_data) => async (dispatch,getState) => {
	try {
		// const today= moment().format('YYYY-MM-DD')
		// debugger;
    dispatch({ type: SET_LOADING_ORDER });
		const cleanerId=getState().auth.user.cleaner.id;

		const res = await axios.get(`${url}/bookings?status_eq=${form_data}&cleaner_eq=${cleanerId}`);
		dispatch({ type: FETCH_APPOINTLIST_SUCCESS, payload: res.data });

	} catch (error) {
		dispatch({ type: FETCH_APPOINTLIST_FAIL});
		// errMsg(error)
	}
};
export const NEXT_SERVICE = () => async (dispatch,getState) => {
	try {
		const type = getState().auth.user.role.name;
		var res;
		dispatch({ type: SET_LOADING_ORDER });
		if(type==='customer'){
			const customerId=getState().auth.user.customer.id;
			res = await axios.get(`${url}/bookings?status_eq=ACTIVE&customer_eq=${customerId}&_sort=date:asc,time:asc&_limit=1`);
		}else{
			const cleanerId=getState().auth.user.cleaner.id;
			res = await axios.get(`${url}/bookings?status_eq=ACTIVE&cleaner_eq=${cleanerId}&_sort=date:asc,time:asc&_limit=1`);
		}
		
		dispatch({ type: NEXT_SERVICE_SUCCESS, payload: res.data[0] });
	} catch (error) {
		dispatch({ type: FETCH_APPOINTLIST_FAIL});
		// errMsg(error)
	}
};

export const TOGGLE_ORDER_STATUS = (form_data) => async (dispatch) => {
	try {
		let obj={},res;
    dispatch({ type: SET_LOADING_ORDER });
		if(form_data.status==="COMPLETED"){
			obj.status = "ACTIVE"
		}else{
			obj.status="COMPLETED"
		}
		if(form_data.rating>0){
			obj.rating = form_data.rating
		}
		debugger;
		if(moment(form_data.date).add(form_data.duration-1,'days').isAfter(moment(new Date()))){
			toast.warn("More than one Day left, try later...");
			return;
		}
		await axios.put(`${url}/bookings/${form_data.id}`,obj);
		await axios.put(`${url}/schedules/${form_data.cleaner.schedule}`,{available:true});
		dispatch({ type: SELECT_EMPLOYEE_SUCCESS, payload: {} });
		// dispatch({ type: FETCH_APPOINTLIST_SUCCESS, payload: res.data });
		toast.success('order completed...')

	} catch (error) {
		errMsg(error)
	}
};


export const ORDER_FEATURED = (form_data) => async (dispatch) => {
	try {
    dispatch({ type: SET_LOADING_ORDER });

		const res = await axios.post(`${url}/bookings/revenueYearly`,form_data);

		dispatch({ type: ORDER_REVENUE_SUCCESS, payload: res.data });
	} catch (error) {

		dispatch({ type: ORDER_REVENUE_FAIL});
		// errMsg(error)
	}
};

export const ORDER_FIND = (form_data) => async (dispatch) => {
	try {
    dispatch({ type: SET_LOADING_ORDER });
    var res;
		debugger;
        res = await axios.post(`${url}/bookings/finder`,form_data);
        dispatch({ type: ORDER_FIND_SUCCESS, payload: res.data });

	} catch (error) {

		dispatch({ type: ORDER_FIND_FAIL});
		errMsg(error)
    
	}
};

export const REVIEW = (form_data) => async (dispatch) => {
	try {
    dispatch({ type: SET_LOADING_ORDER });
    var res;
		debugger;
        res = await axios.get(`${url}/bookings/getReview/${form_data.id}`);
        dispatch({ type: REVIEW_SUCCESS, payload: res.data });

	} catch (error) {

		dispatch({ type: REVIEW_FAIL});
		errMsg(error)
    
	}
};

// export const ORDER_EDIT = (form_data) => async (dispatch) => {
// 		dispatch({ type: ORDER_EDIT_SUCCESS, payload: form_data });
// };

