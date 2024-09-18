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
    path: "/planning",
    key: "planning",
    name: "Planning",
    icon: <SlNotebook />,
    children: [],
  }
];
