import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./App.css";

import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";

import Logout from "./components/logout";
import NotFound from "./components/notFound";

import "./App.css";
import auth from "./services/authService";
import Navbar from "./components/navbar";
import Home from "./components/home";
import { CartProvider } from "./contexts/use-cart";
import ProductForm from "./components/product/productForm";
import Products from "./components/product/products";
import History from "./components/history/history";
import WelcomeScreen from "./components/welcomeScreen";
// http://localhost:3000

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <>
        {user ? (
          <CartProvider>
            <ToastContainer />
            <Navbar user={user} />
            <Switch>
              <Route path="/products/:id" component={ProductForm} />
              <Route path="/products" component={Products} />
              <Route path="/history" component={History} />
              <Route path="/login" component={LoginForm} />
              <Route path="/logout" component={Logout} />
              <Route path="/not-found" component={NotFound} />
              <Route path="/register" component={RegisterForm} />
              {/* <ProtectedRoute path="/register" component={RegisterForm} /> */}
              <Route exact path="/" component={Home} />
              <Redirect to="/not-found" />
            </Switch>
            {/* <GoTo/> */}
          </CartProvider>
        ) : (
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/" component={WelcomeScreen} />
            <Redirect to="/not-found" />
          </Switch>
        )}
      </>
    );
  }
}
export default App;
