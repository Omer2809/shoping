import React from "react";
import Joi from "joi-browser";
import Form from "../common/form/form";

import { Container, FormWrap } from "../styles/styledFormComponents";
import { toast } from "react-toastify";
import Spinner from "../common/spinner";
import { register } from "../services/userService";

class RegisterForm extends Form {
  state = {
    data: { name: "", phone: "", email: "", password: "" },

    errors: {},
    loading: false,
    saving: false,
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().min(4).label("Name"),
    phone: Joi.string().required().min(5).label("Contact No"),
  };

  doSubmit = async () => {
    try {
      this.setState({ loading: true, saving: true });
      await register(this.state.data);
      console.log(this.state.data);
      this.setState({ loading: false, saving: false });

      window.location = "/";
      
      toast.info("new user added");

    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        toast.info(`${errors.email}`);
        this.setState({ errors });
      }
      this.setState({ loading: false, saving: false });
    }
  };

  render() {
    return (
      <Container>
        {" "}
        {this.state.loading ? (
          <Spinner saving={this.state.saving} reg />
        ) : (
          <FormWrap>
            <h1>Register New User</h1>
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("name", "Name")}
              {this.renderInput("phone", "Contact No")}
              {this.renderInput("email", "Email", "email")}
              {this.renderInput("password", "Password", "password")}
              {this.renderButton("Save")}
            </form>
          </FormWrap>
        )}
      </Container>
    );
  }
}

export default RegisterForm;
