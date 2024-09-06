import { BarChartOutlined, HomeOutlined } from "@ant-design/icons";
import { routesType } from "types/Sidebar";
import { MdOutlinePayments } from "react-icons/md";
import { SlNotebook } from "react-icons/sl";

// eslint-disable-next-line import/prefer-default-export
export const AdminRoutes: routesType = [
  {
    path: "/",
    key: "home",
    name: "Home",
    icon: <HomeOutlined rev="label" />,
    children: [],
  },
  {
    path: "/production",
    key: "production",
    name: "Production",
    icon: <MdOutlinePayments />,
    children: [
      {
        path: "/production/bill-of-material",
        key: "production/bill-of-material",
        name: "Bill of Material",
      },
      {
        path: "/production/production-card",
        key: "production/production-card",
        name: "Production Card",
      },
      {
        path: "/production/production-order",
        key: "production/production-order",
        name: "Production Order",
      },
    ],
  },
  {
    path: "/planning",
    key: "planning",
    name: "Planning",
    icon: <SlNotebook />,
    children: [],
  },
  {
    path: "/reports",
    key: "reports",
    name: "Reports",
    icon: <BarChartOutlined rev="label" />,
    children: [
      {
        path: "/reports/ibor",
        key: "reports/ibor",
        name: "IBOR",
      },
      {
        path: "/reports/production",
        key: "reports/production",
        name: "Production",
      },
      {
        path: "/reports/workcenter",
        key: "reports/workcenter",
        name: "Workcenter",
      },
      {
        path: "/reports/quality-control",
        key: "reports/quality-control",
        name: "Quality Control",
      },
    ],
  },
];
