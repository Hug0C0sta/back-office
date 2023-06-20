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
    console.log(loads);

    // Create an object to store transactions by hour
    const transactionsByHour = loads.reduce((acc, load) => {
      acc[load.date] = load.quantity;
      return acc;
    }, {});

    // Add missing hours from 24:00 to 23:30 in 30-minute intervals with a value of 0
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

    // Sort the transactionsByHour object by hour
    const sortedTransactions = Object.keys(transactionsByHour)
      .sort()
      .map((hour) => ({
        date: hour,
        value: transactionsByHour[hour],
      }));

    console.log(sortedTransactions);

    return sortedTransactions;
  } catch (error) {
    console.error(error);
  }
};

export default Transacoes_hora;
