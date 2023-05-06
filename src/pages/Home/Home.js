import React from "react";
import "./style.css";

import PeopleIcon from '@mui/icons-material/People';
import PaidIcon from '@mui/icons-material/Paid';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import HomeCardTopComponent from "../../Components/HomeCardTopComponent/HomeCardTopComponent";
import HomeCardTopDescriptionComponent from "../../Components/HomeCardTopComponent/HomeCardTopDescriptionComponent";
import HomeCardTopBarComponent from "../../Components/HomeCardTopComponent/HomeCardTopBarComponent";


function Home() {
  return (
    <div className="container">
        <div className="row">
            <HomeCardTopComponent name="Utilizadores Online"  icon={PeopleIcon}>
                <HomeCardTopDescriptionComponent value="50 mil"/>
            </HomeCardTopComponent>
            <HomeCardTopComponent name="Transações Diárias"  icon={PaidIcon}>
                <HomeCardTopDescriptionComponent value="777 mil"/>
            </HomeCardTopComponent>
            <HomeCardTopComponent name="Pedidos Respondidos"  icon={MailOutlineIcon}>
                <HomeCardTopBarComponent value="5"/>
            </HomeCardTopComponent>
            <HomeCardTopComponent name="Total de Transações"  icon={AccountBalanceIcon}>
                <HomeCardTopDescriptionComponent value="1 milhão"/>
            </HomeCardTopComponent>
        </div>

        <div className="row">

        </div>
    </div>
  );
}

export default Home;
