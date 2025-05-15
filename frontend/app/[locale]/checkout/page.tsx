"use client";
import PaymentForm from "@/app/components/forms/PaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const page = () => {
  const [client, setClient] = useState<string>("");
  const [loadingClient, setLoadingClient] = useState<boolean>(true);
  const [errorClient, setErrorClient] = useState<string | null>(null);
  const [loadingPayPal, setLoadingPayPal] = useState<boolean>(false);

  useEffect(() => {
    const fetchClient = async () => {
      const paymentDetails = { amount: 1000 };
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_URL_SERVER}/api/payments/create-payment-intent`,
          paymentDetails
        );
        if (res.data.clientSecret) {
          setClient(res.data.clientSecret);
        } else {
          throw new Error(
            res.data.error || "Error inspected by fetching client"
          );
        }
      } catch (error: any) {
        console.error("Error to obtain client:", error);
        let errorMessage = "Unknown error when initiating payment";
        if (error.response) {
          errorMessage =
            error.response.data.error ||
            `Server error ${error.response.status}`;
        } else if (error.request) {
          errorMessage = "Network Error: Could not connect to the server.";
        } else {
          errorMessage = `Application error: ${error.message}`;
        }
        setErrorClient(errorMessage);
      } finally {
        setLoadingClient(false);
      }
    };
    fetchClient();
  }, []);

  const handlePayPalClick = async () => {
    setLoadingPayPal(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL_SERVER}/api/payments/create-paypal-order`,
        {
          amount: 1000,
        }
      );
      const { approveUrl } = res.data;
      if (approveUrl) {
        const popup = window.open(
          approveUrl,
          "PayPal Popup",
          "width=800,height=600,scrollbars=yes,resizable=yes"
        );
        if (!popup) {
          console.error(
            "Error al intentar abrir la ventana emergente. Por favor, asegúrate de permitir popups en tu navegador."
          );
          return;
        }
      } else {
        alert("No se pudo obtener la URL de aprobación de PayPal.");
      }
    } catch (error) {
      console.error("Error al iniciar pago con PayPal:", error);
      alert("Error al iniciar pago con PayPal. Intenta más tarde.");
    } finally {
      if (!loadingClient) {
        setLoadingPayPal(false);
      }
    }
  };

  const elementsOptions = {
    clientSecret: client,
  };
  if (loadingClient) return <div>Cargando formulario de pago...</div>;
  if (errorClient) return <div style={{ color: "red" }}>{errorClient}</div>;
  return (
    <section>
      <h1>Pagina de pago</h1>
      {client && (
        <>
          <Elements stripe={stripePromise} options={elementsOptions}>
            <PaymentForm />
          </Elements>

          <div style={{ marginTop: "2rem" }}>
            <button
              onClick={handlePayPalClick}
              disabled={loadingPayPal}
              style={{
                padding: "10px 20px",
                backgroundColor: "#ffc439",
                border: "none",
                color: "#111",
                fontWeight: "bold",
                cursor: "pointer",
                borderRadius: "5px",
              }}
            >
              {loadingPayPal ? "Redirigiendo a PayPal..." : "Pagar con PayPal"}
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default page;
