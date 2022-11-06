import { toast } from "react-toastify";

export const errMsg=(error)=>{
	// debugger;
	console.log(error.response)
	try {
		if(!error.response){
			return toast.warn("server error");
		}
		else if(error.response.data==="Not Found" || error.response.data=== "Method Not Allowed"){
			return toast.warn("server error");
		}
		else if(error.response.data.error==="Forbidden"){
			return toast.warn("Not authenticated");
		}
		else{
			const msg=error.response?.data?.message[0]?.messages[0]?.message;
			return toast.warn(msg);
		}
	} catch (error) {
		return toast.warn("Server Error")
	}
}
