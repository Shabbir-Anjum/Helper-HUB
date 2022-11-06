import {
  NEW_ORDER_SUCCESS,
  NEW_ORDER_FAIL,
	ORDER_LIST_SUCCESS,
	ORDER_LIST_FAIL,
	FETCH_APPOINTLIST_SUCCESS,
	FETCH_APPOINTLIST_FAIL,
	ORDER_COUNT_FAIL,
	ORDER_COUNT_SUCCESS,
	ORDER_REVENUE_SUCCESS,
	ORDER_REVENUE_FAIL,
	SET_LOADING_ORDER,
	ORDER_FEATURED_FAIL,
	ORDER_FEATURED_SUCCESS,
	ORDER_FIND_SUCCESS,
	ORDER_FIND_FAIL,
	ORDER_UPDATE_SUCCESS,
	ORDER_UPDATE_FAIL,
	BOOKING_PAYMENT_SUCCESS,
	BOOKING_PAYMENT_FAIL,
	FETCH_CLEANER_SUCCESS,
	FETCH_STATS_SUCCESS,
	FETCH_STATS_FAIL,
	FETCH_CLEANER_FAIL,
	NEXT_SERVICE_SUCCESS,
	REVIEW_SUCCESS,
	REVIEW_FAIL,
} from "../actions/types";

const INITAL_AUTH_STATE = {
	order: null,
	loading: false,
	orderList:[],
	appointmentList:[],
	count:10,
	edit:false,
	revenueData:null,
	featuredData:null,
	stats:{},
	cleanerInfo:null,
	nextService:null,
	review:{
		total:0,
		review:0
	}
};

export default function authReducer(
	state = INITAL_AUTH_STATE,
	action
){
	switch (action.type) {
		case NEW_ORDER_SUCCESS:
		case ORDER_UPDATE_SUCCESS:
		case BOOKING_PAYMENT_SUCCESS:
		// case ORDER_FIND_SUCCESS:
			return {
				...state,
				loading: false,
				edit:false,
				order: action.payload,
			};
		case ORDER_LIST_SUCCESS:
		case ORDER_FIND_SUCCESS:
			return {
				...state,
				loading:false,
				edit:false,
				orderList:action.payload
			};
		case FETCH_CLEANER_SUCCESS:
			return {
				...state,
				cleanerInfo:action.payload
			};
		case NEXT_SERVICE_SUCCESS:
			return {
				...state,
				nextService:action.payload
			};
		case FETCH_CLEANER_FAIL:
			return {
				...state,
				cleanerInfo:null
			};
		case FETCH_STATS_SUCCESS:
			return {
				...state,
				stats:action.payload
			};
		case FETCH_STATS_FAIL:
			return {
				...state,
				stats:null
			};
		case REVIEW_SUCCESS:{
			return {
				...state,
				review:action.payload
			}
		}
		case FETCH_APPOINTLIST_SUCCESS:
			return {
				...state,
				appointmentList:action.payload,
				loading:false
			};
		case FETCH_APPOINTLIST_FAIL:
			return {
				...state,
				appointmentList:[],
				loading:false
			}
		case ORDER_COUNT_SUCCESS:
			return {
				...state,
				loading:false,
				count:action.payload
			};
		case ORDER_REVENUE_SUCCESS:
			return {
				...state,
				loading:false,
				revenueData:action.payload
			}
		case ORDER_FEATURED_SUCCESS:
			return {
				...state,
				loading:false,
				featuredData:action.payload
			}
		case NEW_ORDER_FAIL:
		case ORDER_LIST_FAIL:
		case ORDER_COUNT_FAIL:
		case ORDER_REVENUE_FAIL:
		case ORDER_FEATURED_FAIL:
		case ORDER_FIND_FAIL:
		case ORDER_UPDATE_FAIL:
		case BOOKING_PAYMENT_FAIL:
		case REVIEW_FAIL:
			return {
				...state,
				loading: false,
			};
		case SET_LOADING_ORDER:
			return {
				...state,
				loading:true
			};
		default:
			return state;
	}
}

