import {
	COMPANY_INFO_SUCCESS,
	COMPANY_INFO_FAIL,
	SET_LOADING_EMPLOYEE,
	NOT_LOADING_EMPLOYEE,
	EMPLOYEE_LIST_SUCCESS,
	SELECT_EMPLOYEE_SUCCESS,
	NOTIFICATION_SUCCESS
} from "../actions/types";

const INITAL_AUTH_STATE = {
	employee: null,
	loading: false,
	employeeList:[],
	cleanerList:[],
	count:10,
	edit:false,
	company:null,
	notificationlist:[]
};

export default function authReducer(
	state = INITAL_AUTH_STATE,
	action
){
	switch (action.type) {
		case COMPANY_INFO_SUCCESS:
			return {
				...state,
				company:action.payload,
				loading:false
			};
		case COMPANY_INFO_FAIL:
			return {
			...state,
			company:null,
			loading:false
		};
		case EMPLOYEE_LIST_SUCCESS:
			return {
				...state,
				employeeList:action.payload,
				loading:false
			}
		case SET_LOADING_EMPLOYEE:
		return {
			...state,
			loading:true
		};
		case NOTIFICATION_SUCCESS:
		return {
			...state,
			loading:true,
			notificationlist:action.payload
		};
		case SELECT_EMPLOYEE_SUCCESS:
			return {
				...state,
				employee:action.payload,
				
			}
		case NOT_LOADING_EMPLOYEE:
		return {
			...state,
			loading:false
		}
		default:
			return state;
	}
}

