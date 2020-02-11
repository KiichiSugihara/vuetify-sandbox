import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";
import Form from "@/views/Form";
import User from "@/views/User";
import Login from "@/views/Login";
import Table from "@/views/Table";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/form",
    name: "form",
    component: Form
  },
  {
    path: "/user",
    name: "user",
    component: User
  },
  {
    path: "/table",
    name: "table",
    component: Table
  },
  {
    path: "/login",
    name: "login",
    component: Login
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
