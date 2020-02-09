import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";
import Form from "@/views/Form";
import User from "@/views/User";
import Login from "@/views/Login";

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
