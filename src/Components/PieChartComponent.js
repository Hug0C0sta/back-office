import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, LabelList } from 'recharts';


const data = [
    { name: "Portugal", value: 500 },
    { name: "Espanha", value: 400 },
    { name: "França", value: 300 },
    { name: "Alemanha", value: 200 },
    { name: "Inglaterra", value: 100 },
    { name: "Suécia", value: 50 },
    { name: "Itália", value: 450 },
    { name: "Polónia", value: 20 },
];

const COLORS = [];


function getRandomHexColor() {
    const hexChars = "0123456789ABCDEF";
    let hex = "#";
    for (let i = 0; i < 6; i++) {
        hex += hexChars[Math.floor(Math.random() * 16)];
    }
    return hex;
}

for (let i = 0; i < 10; i++) {
    COLORS.push(getRandomHexColor());
}


export default class PieChartComponent extends PureComponent {
    static demoUrl = 'https://codesandbox.io/s/pie-chart-with-padding-angle-7ux0o';

    render() {
        return (
            <PieChart width={450} height={450} onMouseEnter={this.onPieEnter}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    nameKey="name"
                    label={true}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />

                        ))}
                    <LabelList dataKey="name" position="top" />

                </Pie>

            </PieChart>
        );
    }
}

