import { BarChartOutlined, HomeOutlined, OrderedListOutlined } from "@ant-design/icons";
import { routesType } from "types/Sidebar";
import { MdOutlinePayments } from "react-icons/md";
import { SlNotebook } from "react-icons/sl";
import { FaTicketAlt } from "react-icons/fa";

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
    path: "/event",
    key: "event",
    name: "Event",
    icon: <SlNotebook />,
    children: [],
  },
  {
    path: "/tickets",
    key: "tickets",
    name: "Tickets",
    icon: <FaTicketAlt />,
    children: [],
  },
  {
    path: "/orders",
    key: "orders",
    name: "Orders",
    icon: <OrderedListOutlined rev={''} />,
    children: [],
  }
];
