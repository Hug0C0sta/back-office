import { FaCreditCard, FaPaypal } from "react-icons/fa";
import axios from "axios";

const getTotalTransactions = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `http://localhost:8080/api/v1/payment-methods/funds`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const loads = response.data.data;
    return [
      {
        method: "Paypal",
        value: loads[1].balance,
        icon: <FaPaypal style={{ fontSize: "70px", color: "#253b80" }} />,
      },
      {
        method: "Card",
        value: loads[0].balance,
        icon: <FaCreditCard style={{ fontSize: "70px", color: "#EB001B" }} />,
      },
    ];
  } catch (error) {
    console.error(error);
  }
};

export default getTotalTransactions;
