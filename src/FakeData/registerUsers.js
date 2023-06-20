import axios from "axios";

const UserData = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `http://localhost:8080/api/v1/users/quantity/new-users`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const loads = response.data.data;

    const userDataArray = loads.map((load) => ({
      number_of_users: load.quantity,
      month: load.date,
    }));

    return userDataArray;
  } catch (error) {
    console.error(error);
  }
};

export default UserData;
