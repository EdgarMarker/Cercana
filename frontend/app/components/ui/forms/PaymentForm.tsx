import React, { FormEvent, useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

const PaymentForm = (): React.ReactElement => {
  const stripe = useStripe();
  const elements = useElements();

  const [messagePayment, setMessagePayment] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);
    setMessagePayment(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
    });

    if (error) {
      setMessagePayment(`Error en el pago: ${error.message}`);
    } else {
      setMessagePayment(`Pago completado!`);
    }

    setLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <h3>Formulario de pago</h3>
      <PaymentElement id="payment-element" />
      <button disabled={loading || !stripe || !elements}>
        {loading ? "Procesando..." : "Pagar"}
      </button>
      {messagePayment && (
        <div
          style={{
            color: messagePayment?.includes("Error") ? "red" : "green",
            marginTop: "10px",
          }}
        >
          {messagePayment}
        </div>
      )}
    </form>
  );
};

export default PaymentForm;
