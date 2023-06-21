import React, { useEffect, useState } from "react";
import "./style.css";
import PeopleIcon from "@mui/icons-material/People";
import PaidIcon from "@mui/icons-material/Paid";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import HomeCardTopComponent from "../../Components/HomeCardTopComponent/HomeCardTopComponent";
import HomeCardTopDescriptionComponent from "../../Components/HomeCardTopComponent/HomeCardTopDescriptionComponent";
import HomeCardTopBarComponent from "../../Components/HomeCardTopComponent/HomeCardTopBarComponent";
import CardComponent from "../../Components/Card/CardComponent";
import { LineChartComponent } from "../../Components/LineChart/LineChartComponent";
import { PieChartComponent } from "../../Components/PieChart/PieChart";
import CarouselSliderComponent from "../../Components/CarouselSlider/CarouselSliderComponent";
import ExchangeRateHome from "../../Components/ExchangeRateHome/ExchangeRateHome";
import { COLORS } from "../../colors.js";
import UserData from "../../FakeData/registerUsers";
import UserContries from "../../FakeData/countries";
import TimelineIcon from "@mui/icons-material/Timeline";
import PieChartOutlineIcon from "@mui/icons-material/PieChartOutline";
import LinearScaleIcon from "@mui/icons-material/LinearScale";
import TaxaCambio from "../../FakeData/taxa_cambio";
import Transacoes_hora from "../../FakeData/transacoes_hora";
import LoadFundsHome from "../../Components/LoadFundsHome/LoadFundsHome";
import axios from "axios";
import load_funds_home from "../../FakeData/load_funds_home";

function Home() {
  const [loadItems, setLoadItems] = useState([]);
  const [loadTaxaCambio, setTaxaCambio] = useState([]);

  const [loadItemsChart, setLoadItemsChart] = useState([]);
  const [loadItemsPie, setLoadItemsPie] = useState([]);
  const [loadItemsDaily, setLoadItemsDaily] = useState([]);

  const months = loadItemsChart.map((loadItemsChart) => loadItemsChart.month);
  const data = loadItemsChart.map(
    (loadItemsChart) => loadItemsChart.number_of_users
  );

  const countries = loadItemsPie.map((loadItemsPie) => loadItemsPie.country);
  const number_of_users_country = loadItemsPie.map(
    (loadItemsPie) => loadItemsPie.number_of_users
  );

  const hour = loadItemsDaily.map((data) => data.date);
  const value = loadItemsDaily.map((data) => data.value);

  const [dailyTransaction, setDailyTransaction] = useState("");
  const [totalTransaction, setTotalTransaction] = useState("");

  useEffect(() => {
    getDailyTransactions();
    getTotalTransactions();
    getTotalUsers();
  }, []);

  useEffect(() => {
    load_funds_home().then((res) => setLoadItems(res));
    UserData().then((res) => setLoadItemsChart(res));
    UserContries().then((res) => setLoadItemsPie(res));
    Transacoes_hora().then((res) => setLoadItemsDaily(res));
    TaxaCambio().then((res) => setTaxaCambio(res));
  }, []);

  const getDailyTransactions = async () => {
    try {
      const currentDate = new Date();
      const day = currentDate.getDate().toString().padStart(2, "0");
      const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
      const year = currentDate.getFullYear().toString();
      const formattedDate = `${day}-${month}-${year}`;

      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:8080/api/v1/transactions/quantity?date=${formattedDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDailyTransaction(response.data);
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };

  const getTotalTransactions = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:8080/api/v1/transactions/quantity?date=`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTotalTransaction(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const [utilizadoresRegistados, setUtilizadoresRegistados] = useState();
  const getTotalUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:8080/api/v1/users/quantity`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUtilizadoresRegistados(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (
    !totalTransaction ||
    !dailyTransaction ||
    !loadItemsDaily ||
    !loadItemsPie ||
    !loadItemsChart ||
    !loadItems ||
    !utilizadoresRegistados
  ) {
    return "Loading...";
  }

  return (
    <div className="grid_home">
      <HomeCardTopComponent
        col="#4E2E50"
        name="Utilizadores Registados"
        icon={PeopleIcon}
      >
        <HomeCardTopDescriptionComponent
          value={utilizadoresRegistados.quantity}
        />
      </HomeCardTopComponent>
      <HomeCardTopComponent
        col="#503D2E"
        name="Transações Diárias"
        icon={PaidIcon}
      >
        <HomeCardTopDescriptionComponent value={dailyTransaction.quantity} />
      </HomeCardTopComponent>
      <HomeCardTopComponent
        col="#30502E"
        name="Pedidos Respondidos"
        icon={MailOutlineIcon}
      >
        <HomeCardTopBarComponent value="5" />
      </HomeCardTopComponent>
      <HomeCardTopComponent
        col="#2E4150"
        name="Total de Transações"
        icon={AccountBalanceIcon}
      >
        <HomeCardTopDescriptionComponent value={totalTransaction.quantity} />
      </HomeCardTopComponent>
      <div className="grid_span_2">
        <CardComponent
          height="400px"
          col="#f71735"
          fontCol="#EE9B00"
          name="Novos utilizadores"
          icon={TimelineIcon}
        >
          <LineChartComponent
            labelName="Novo utilizadores"
            labels={months}
            data={data}
            height="300"
            backgroundColor={COLORS.dourado}
            chart_border_color="#011627"
          />
        </CardComponent>
      </div>
      <div className="grid_span_2">
        <CardComponent
          height="400px"
          col="#333333"
          fontCol="#9B2226"
          name="Lojas que mais faturaram"
          icon={PieChartOutlineIcon}
        >
          <PieChartComponent
            labels={countries}
            data={number_of_users_country}
          />
        </CardComponent>
      </div>
      <CardComponent
        col="#4C0013"
        fontCol="#4C0013"
        name="Taxas de Câmbio"
        icon={LinearScaleIcon}
      >
        <CarouselSliderComponent items={loadTaxaCambio}>
          <ExchangeRateHome />
        </CarouselSliderComponent>
      </CardComponent>
      <div className="grid_span_2">
        <CardComponent
          col="#4C0013"
          fontCol="#4C0013"
          name="Número de transações (hoje)"
          icon={TimelineIcon}
        >
          <LineChartComponent
            labelName="Novo utilizadores"
            labels={hour}
            data={value}
            height="110"
            backgroundColor={COLORS.laranja}
            chart_border_color="#011627"
          />
        </CardComponent>
      </div>
      <CardComponent
        col="#4C0013"
        fontCol="#4C0013"
        name="Carreg. de Fundos"
        height="500"
        icon={LinearScaleIcon}
      >
        <CarouselSliderComponent items={loadItems}>
          <LoadFundsHome />
        </CarouselSliderComponent>
      </CardComponent>
    </div>
  );
}

export default Home;
