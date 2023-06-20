import { BiDollar, BiPound, BiYen } from "react-icons/bi";
import { TbCurrencyReal, TbCurrencyYuan } from "react-icons/tb";
import axios from "axios";

const TaxaCambio = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `http://localhost:8080/api/v1/transactions/rates?currency=EUR`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const loads = response.data;
    return [
      {
        id: 1,
        coin: "Dollar",
        acronym: "USD",
        value: loads.rates.USD,
        imageUrl: <BiDollar style={{ fontSize: "70px", color: "#85bb65" }} />,
        color: "#85bb65",
      },
      {
        id: 2,
        coin: "Libra",
        acronym: "GBP",
        value: loads.rates.GBP,
        imageUrl: <BiPound style={{ fontSize: "70px", color: "#3183BC" }} />,
        color: "#3183BC",
      },
      {
        id: 3,
        coin: "Real",
        acronym: "BRL",
        value: loads.rates.BRL,
        imageUrl: (
          <TbCurrencyReal style={{ fontSize: "70px", color: "#935579" }} />
        ),
        color: "#935579",
      },
      {
        id: 4,
        coin: "Iene japonês",
        acronym: "JPY",
        value: loads.rates.JPY,
        imageUrl: <BiYen style={{ fontSize: "70px", color: "#935579" }} />,
        color: "#935579",
      },
      {
        id: 5,
        coin: "Remimbi",
        acronym: "CNY",
        value: loads.rates.CNY,
        imageUrl: (
          <TbCurrencyYuan style={{ fontSize: "70px", color: "#935579" }} />
        ),
        color: "#935579",
      },
    ];
  } catch (error) {
    console.error(error);
  }
};

export default TaxaCambio;
