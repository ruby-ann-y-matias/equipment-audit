import { RouteInfo } from "./sidebar.metadata";

export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: "mdi mdi-gauge",
    class: "",
    extralink: false,
    submenu: [],
  },
  {
    path: "/equipments",
    title: "Equipment",
    icon: "fas fa-cogs",
    class: "",
    extralink: false,
    submenu: [],
  },
  {
    path: "/offices",
    title: "Offices",
    icon: "fas fa-building",
    class: "",
    extralink: false,
    submenu: [],
  },
  {
    path: "/users",
    title: "Users",
    icon: "fas fa-users",
    class: "",
    extralink: false,
    submenu: [],
  },

  {
    path: "/logout",
    title: "Logout",
    icon: "fas fa-sign-out-alt",
    class: "",
    extralink: false,
    submenu: [],
  },
];
