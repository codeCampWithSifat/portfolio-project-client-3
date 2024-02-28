import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

// import usePaymentDonation from "../../../Hooks/usePaymentDonation";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CheckoutForm = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  //   const [amounts] = usePaymentDonation();
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const navigate = useNavigate();

  const { data: amounts = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user?.email}`);
      return res.data;
    },
  });

  const totalAmount = amounts.reduce((sum, item) => sum + item.userAmount, 0);

  useEffect(() => {
    if (totalAmount > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalAmount })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalAmount]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error?.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }

    const { paymentIntent, error: paymentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user.email,
            name: user.displayName,
          },
        },
      });

    if (paymentError) {
      console.log(paymentError);
    } else {
      //   console.log("PaymentIntent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        // sent data to the server
        const payment = {
          email: user?.email,
          name: user.displayName,
          price: totalAmount,
          date: new Date(),
          transactionId: paymentIntent.id, // utc converted
          status: "success",
        };

        const res = await axiosSecure.post("/payments", payment);
        if (res.data?.insertedId) {
          navigate("/dashboard/dashboardHome");
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.displayName} Your Donation Done`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    }
  };
  return (
    <div className="mt-40">
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-sm mt-6 bg-indigo-600 text-white hover:bg-indigo-600 hover:text-white"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
      </form>

      {error && <p className="text-red-800 mt-6">{error}</p>}
      {transactionId && (
        <p className="text-green-600 mt-3">
          {" "}
          Your transaction id: {transactionId}
        </p>
      )}
    </div>
  );
};

export default CheckoutForm;
