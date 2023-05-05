import React from "react";
import "./style.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import PeopleIcon from '@mui/icons-material/People';

const paises = [
  { name: "Portugal", value: 500 },
  { name: "Espanha", value: 400 },
  { name: "França", value: 300 },
  { name: "Alemanha", value: 200 },
  { name: "Inglaterra", value: 100 },
  { name: "Suécia", value: 50 },
  { name: "Itália", value: 450 },
  { name: "Polónia", value: 20 },
];

function Home() {
  return (
    <div className="container">
        <div className="row">
            <Card sx={{ minWidth: 350 }}>
                <div className="cardRow">
                    <div className="cardColumn">
                        <CardContent>
                            <p>Utilizadores Online</p>
                            <p>50 mil</p>
                        </CardContent>
                    </div>
                    <div className="cardColumn">
                        <CardContent>
                            <PeopleIcon />
                        </CardContent>
                    </div>
                </div>
            </Card>
            <Card sx={{ minWidth: 350 }}>
                <div className="cardRow">
                    <div className="cardColumn">
                        <CardContent>
                            <p>Utilizadores Online</p>
                            <p>50 mil</p>
                        </CardContent>
                    </div>
                    <div className="cardColumn">
                        <CardContent>
                            <PeopleIcon />
                        </CardContent>
                    </div>
                </div>
            </Card>
            <Card sx={{ minWidth: 350 }}>
                <div className="cardRow">
                    <div className="cardColumn">
                        <CardContent>
                            <p>Utilizadores Online</p>
                            <p>50 mil</p>
                        </CardContent>
                    </div>
                    <div className="cardColumn">
                        <CardContent>
                            <PeopleIcon />
                        </CardContent>
                    </div>
                </div>
            </Card>
            <Card sx={{ minWidth: 350 }}>
                <div className="cardRow">
                    <div className="cardColumn">
                        <CardContent>
                            <p>Utilizadores Online</p>
                            <p>50 mil</p>
                        </CardContent>
                    </div>
                    <div className="cardColumn">
                        <CardContent>
                            <PeopleIcon />
                        </CardContent>
                    </div>
                </div>
            </Card>
        </div>
    </div>
  );
}

export default Home;
