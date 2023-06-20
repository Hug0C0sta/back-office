import axios from "axios";

const UserContries = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `http://localhost:8080/api/v1/users/markets`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const loads = response.data.data;

    const userDataArray = loads.map((load) => ({
      number_of_users: load.quantity,
      country: load.name,
    }));

    return userDataArray;
  } catch (error) {
    console.error(error);
  }
};

export default UserContries;
