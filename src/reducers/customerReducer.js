import {
  NEW_CUSTOMER_SUCCESS,
  NEW_CUSTOMER_FAIL,
	SET_LOADING_CUSTOMER,
	NOT_LOADING_CUSTOMER
} from "../actions/types";

const INITAL_AUTH_STATE = {
	customer: null,
	loading: false,
	customerList:[],
	count:10,
	edit:false,
	customerInfo:{},
	customerYearly:null,
	success:false
};

export default function authReducer(
	state = INITAL_AUTH_STATE,
	action
){
	switch (action.type) {
		case NEW_CUSTOMER_SUCCESS:
			return {
				...state,
				loading: false,
				success:true,
				customer: action.payload,
			};
		case NOT_LOADING_CUSTOMER:
			return {
				...state,
				edit:false,
				loading:false
			};
		case NEW_CUSTOMER_FAIL:
			return {
				...state,
				loading:false,
				failure:true,
			}
		case SET_LOADING_CUSTOMER:
			return {
				...state,
				loading:true
			};
		default:
			return state;
	}
}

