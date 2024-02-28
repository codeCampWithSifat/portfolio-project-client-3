import { Elements } from "@stripe/react-stripe-js";
import { Helmet } from "react-helmet-async";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);

const PaymentHistory = () => {
  return (
    <div className="mt-20">
      <div>
        {" "}
        <Helmet>
          <title>Payment</title>
        </Helmet>
        <div className="max-w-screen-sm mx-auto mt-10">
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
