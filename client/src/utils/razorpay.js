import api from "../api/axios";

export const startPayment = async ({
  totalAmount,
  bookingData,
  navigate,
}) => {
  try {
    // 1️⃣ Create order on backend
    const { data } = await api.post("/payment/create-order", {
      totalAmount: totalAmount, // ✅ backend expects amount
    });

    const order = data.order;

    // 2️⃣ Razorpay options
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "Sthaan",
      description: "Home Booking",
      order_id: order.id,

      // ✅ PAYMENT SUCCESS
      handler: async function (response) {
        try {
          // 3️⃣ Verify payment + create booking
          const res = await api.post("/payment/verify", {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            bookingData,
          });

          // ✅ SUCCESS REDIRECT
          navigate("/payment/success", {
            state: { booking: res.data.booking },
          });
        } catch (err) {
          console.error("Verification failed", err);
          navigate("/payment/failed?reason=verification");
        }
      },

      // ❌ PAYMENT CANCELLED
      modal: {
        ondismiss: function () {
          navigate("/payment/failed?reason=cancelled");
        },
      },

      prefill: {
        name: bookingData?.userName || "",
        email: bookingData?.userEmail || "",
      },

      theme: {
        color: "#EC4899",
      },

      method: {
        upi: true,
        card: true,
        netbanking: true,
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error("Payment init error", err);
    navigate("/payment/failed?reason=init");
  }
};
