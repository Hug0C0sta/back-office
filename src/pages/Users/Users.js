import React from "react";
import "./style.css";
import BreadcrumbsComponent from "../../Components/Breadcrumbs";

const columns = ["name", "username", "enabled", "actived", "user_group"];
const rows = [
    {
        name: "Gerald Tacker",
        username: "gtacker0@issuu.com",
        enabled: false,
        actived: false,
        user_group: "default",
    },
    {
        name: "Sol Healing",
        username: "shealing1@g.co",
        enabled: false,
        actived: true,
        user_group: "admin",
    },
    {
        name: "Gerti Arr",
        username: "garr2e@creativecommons.org",
        enabled: true,
        actived: true,
        user_group: "admin",
    },
    {
        name: "Faunie Belden",
        username: "fbelden2f@usda.gov",
        enabled: false,
        actived: false,
        user_group: "admin",
    },
    {
        name: "Jobi Spada",
        username: "jspada2g@springer.com",
        enabled: false,
        actived: true,
        user_group: "manager",
    },
    {
        name: "Ardelia Bickerstaff",
        username: "abickerstaff2h@nyu.edu",
        enabled: true,
        actived: true,
        user_group: "admin",
    },
    {
        name: "Gustave Toppas",
        username: "gtoppas2i@sohu.com",
        enabled: true,
        actived: false,
        user_group: "admin",
    },
    {
        name: "Nora Dionisio",
        username: "ndionisio2j@nyu.edu",
        enabled: false,
        actived: true,
        user_group: "default",
    },
    {
        name: "Judah Edgeon",
        username: "jedgeon2k@icq.com",
        enabled: false,
        actived: false,
        user_group: "default",
    },
    {
        name: "Langsdon Lawlee",
        username: "llawlee2l@geocities.com",
        enabled: false,
        actived: false,
        user_group: "default",
    },
    {
        name: "Zachery Ponsford",
        username: "zponsford2m@soundcloud.com",
        enabled: false,
        actived: true,
        user_group: "admin",
    },
    {
        name: "Madeline Dumbarton",
        username: "mdumbarton2n@pcworld.com",
        enabled: true,
        actived: false,
        user_group: "manager",
    },
    {
        name: "Zea Stanislaw",
        username: "zstanislaw2o@amazon.co.uk",
        enabled: true,
        actived: true,
        user_group: "admin",
    },
    {
        name: "Pat McAleese",
        username: "pmcaleese2p@t-online.de",
        enabled: true,
        actived: true,
        user_group: "admin",
    },
    {
        name: "Leanor Jerzyk",
        username: "ljerzyk2q@tinypic.com",
        enabled: false,
        actived: false,
        user_group: "default",
    },
    {
        name: "Stacie Lyptrit",
        username: "slyptrit2r@slate.com",
        enabled: false,
        actived: false,
        user_group: "default",
    },
];

function Users() {
    return (
        <>
            <BreadcrumbsComponent/>
        </>
    );
}

export default Users;
