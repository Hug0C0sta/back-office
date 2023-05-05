import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

export default function BreadcrumbsComponent() {
  const location = useLocation();

  let currrentLink = "";

  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb) => {
      currrentLink = +`/${crumb}`;

      return <Link to={currrentLink}>{crumb}</Link>;
    });

  return (
    <Breadcrumbs separator="›" aria-label="breadcrumb">
      {crumbs}
      <Typography color="text.primary">Breadcrumbs</Typography>
    </Breadcrumbs>
  );
}
