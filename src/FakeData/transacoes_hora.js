import axios from "axios";

const Transacoes_hora = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `http://localhost:8080/api/v1/transactions/daily`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const loads = response.data.data;

    const transactionsByHour = loads.reduce((acc, load) => {
      acc[load.date] = load.quantity;
      return acc;
    }, {});

    for (let hour = 0; hour <= 23; hour++) {
      for (let minutes = 0; minutes <= 30; minutes += 30) {
        const formattedHour = `${hour.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}`;

        if (!(formattedHour in transactionsByHour)) {
          transactionsByHour[formattedHour] = 0;
        }
      }
    }

    const sortedTransactions = Object.keys(transactionsByHour)
      .sort()
      .map((hour) => ({
        date: hour,
        value: transactionsByHour[hour],
      }));

    return sortedTransactions;
  } catch (error) {
    console.error(error);
  }
};

export default Transacoes_hora;
