import { Typography } from "@material-ui/core"
import { 
	// useElements, 
	// useStripe,
	CardCvcElement,
	CardNumberElement } from "@stripe/react-stripe-js"
import { makeStyles  } from '@material-ui/core/styles';

import React from 'react'

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "black",
			color: "black",
			fontWeight: 500,
			boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#00C5C8" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

const useStyles = makeStyles((theme) => ({
	justifyStart:{
    textAlign:'left',
		fontWeight:'600',
		color:theme.palette.primary.lightDark,
		fontSize:'13px',
		[theme.breakpoints.up('md')]: {
			fontSize:"0.8vw",
		},
  },
	feildWrapper:{
		paddingBottom:'2vw'
	}
}))

export default function PaymentForm() {
  const classes = useStyles();

		// const stripe = useStripe()
		// const elements = useElements()

		// const handleSubmit = async (e) => {
		// 		e.preventDefault()
		// 		const {error, paymentMethod} = await stripe.createPaymentMethod({
		// 				type: "card",
		// 				card: elements.getElement(CardElement)
		// 		})
		// if(!error) {
		// 		try {
		// 				const {id} = paymentMethod
		// 				// const response = await axios.post("http://localhost:1337/bookings/payStripe", {
		// 				// 		id,
		// 				// 		bookingID:2
		// 				// },{
		// 				// 	headers:{
		// 				// 		Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNjQ0NzM2NzcyLCJleHAiOjE2NDczMjg3NzJ9.lzBNkMR3QWof9JQG4SpieGSNz40GHGifhr-fsF0nuEQ"
		// 				// 	}
		// 				// })
		// 				const response = await axios.post("https://api.wandcleaning.pro/bookings/payStripe", {
		// 						id,
		// 						bookingID:3
		// 				},{
		// 					headers:{
		// 						Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiaWF0IjoxNjQ0NzU2NDY0LCJleHAiOjE2NDczNDg0NjR9.PSZpa4MBtkt3ECwXkhBHHLZPAb9u8Hh3aMSyO-vwyAc"
		// 					}
		// 				})
		// 				console.log(response.data);

		// 				const confirmPayment = await stripe.confirmCardPayment(
		// 					response.data.clientSecret);

		// 					console.log(confirmPayment);

		// 		} catch (error) {
		// 				console.log("Error", error)
		// 		}
		// } else {
		// 		console.log(error.message)
		// }
		// }

		return (
				<>
				<div className={classes.feildWrapper}>
					<Typography variant='body1' className={classes.justifyStart}>
						Card Number
					</Typography>
					<fieldset className="FormGroup">
						<div className="FormRow">
							<CardNumberElement options={CARD_OPTIONS}/> 
						</div>
					</fieldset>
				</div>
				<Typography variant='body1' className={classes.justifyStart}>
					CVC
				</Typography>
				<fieldset className="FormGroup">
					<div className="FormRow">
						<CardCvcElement options={CARD_OPTIONS}/>
					</div>
				</fieldset>
				</>
		)
}
