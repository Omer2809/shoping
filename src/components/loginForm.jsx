import React from "react";
import Joi from "joi-browser";
import Form from "../common/form/form";
import auth from "../services/authService";
import { Container, FormWrap } from "../styles/styledFormComponents";
import { toast } from "react-toastify";
import Spinner from "../common/spinner";

class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
    loading: false,
    saving: false,
  };

  schema = {
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      this.setState({ loading: true, saving: true });
      const response = await auth.login(this.state.data);
      
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
      
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
     
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        toast.info(`${errors.email}`);
        this.setState({ errors });
      }
      this.setState({loading: false, saving: false });
    }
  };

  render() {
    

    return (
      <Container>
        {this.state.loading ? (
          // <p>loading</p>
           <Spinner saving={this.state.saving} reg log/> 
        ) : (
          <FormWrap>
            <h1>Login</h1>
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("email", "Email", "email")}
              {this.renderInput("password", "Password", "password")}
              {this.renderButton("Login")}
            </form>
          </FormWrap>
        )}
      </Container>
    );
  }
}

export default LoginForm;
