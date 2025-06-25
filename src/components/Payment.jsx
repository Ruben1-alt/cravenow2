import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useMutation } from "@tanstack/react-query";
import { paymentAPI } from "../Services/customerServices";
import { Home, User, Bell, Utensils, Search } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Header = () => {
  return (
    <header className="bg-indigo-900 bg-opacity-95 text-white py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-6">
        <h1 className="text-3xl font-bold">CraveNow</h1>
        <nav>
          <ul className="flex space-x-6 items-center">
            <li><Link to="/customer/chome"><Home className="w-6 h-6" /></Link></li>
            <li><Link to="/employee/profileview"><User className="w-6 h-6" /></Link></li>
            <li><Link to="/customer/notifications"><Bell className="w-6 h-6" /></Link></li>
            <li><Link to="/customer/restaurantview"><Utensils className="w-6 h-6" /></Link></li>
            <li><Link to="/customer/search"><Search className="w-6 h-6" /></Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

const CheckoutForm = ({ orderId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { mutateAsync: createPaymentIntent } = useMutation({
    mutationFn: paymentAPI,
    mutationKey: ["payment"],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!stripe || !elements) {
      setError("Stripe has not been initialized");
      setIsLoading(false);
      return;
    }

    try {
      const clientSecret = await createPaymentIntent(orderId);

      if (clientSecret) {
        toast.success("🎉 Payment successful! Your Order is on the way");
        setTimeout(() => {
          navigate("/customer/chome");
        }, 2000);
      }

      // Optional Stripe confirmCardPayment logic here (if needed)
      // const cardElement = elements.getElement(CardElement);
      // const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      //   payment_method: { card: cardElement },
      // });

    } catch (err) {
      console.error("Payment error:", err);
      setError(err.message || "An error occurred during payment");
      toast.error("❌ Payment failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 border border-gray-300 rounded-xl bg-white shadow-md">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#32325d",
                "::placeholder": { color: "#aab7c4" },
              },
              invalid: { color: "#fa755a" },
            },
          }}
        />
      </div>

      {error && (
        <p className="text-red-600 bg-red-100 p-3 rounded-lg text-sm font-medium">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={!stripe || isLoading}
        className={`w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition duration-300 ${
          (!stripe || isLoading) ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM6 17.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Processing...
          </span>
        ) : "Pay Now"}
      </button>
    </form>
  );
};

const PaymentPage = () => {
  const { orderId } = useParams();

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Header />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-10">
          <h2 className="text-3xl font-extrabold text-center text-indigo-800 mb-4">
            Secure Card Payment
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Your payment is encrypted and secure. Please enter your card details below.
          </p>
          <Elements stripe={stripePromise}>
            <CheckoutForm orderId={orderId} />
          </Elements>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
