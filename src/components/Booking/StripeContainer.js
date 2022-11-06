import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"

//wand
const PUBLIC_KEY = "pk_test_51EgE2aEUu08wLGaU1UY01Y5e9GpZH27HjhK1Q6bwieXLRZPZPZIONDqI2Za7DnPJczTJqW1Gdobh0gtHAhfpuCw500K8bGGXJh"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
	return (
		<Elements stripe={stripeTestPromise}>
			<PaymentForm />
		</Elements>
	)
}
