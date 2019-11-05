import React from 'react';
import { Route } from "react-router-dom";
import './App.scss';
import Input from "./components/inputs/Input/input";
import AccountService from "./services/AccountService/account.service";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";
import { COOKIES, ENV } from "./constants/constants";
import { updateAccount } from "./store/actions";

const  accountService = new AccountService();

export class AppComponent extends React.Component<any> {
  readonly state: any;

  constructor(props) {
    super(props);

    this.state = {
      loadingAccount: true,
      email: null,
      password: null
    }
  }

  componentDidMount = () => {
    this.getAccount();
  }

  getAccount = async () => {
    let cookies = this.props.cookies;
    let token = cookies.get(COOKIES.token);
    if (!token) {
      this.setState({ loadingAccount: false });
      return;
    }
    try {
      let data = await accountService.authenticateByToken(token);
      if (!data.token) {
        this.setState({ loadingAccount: false });
        return;
      }
      cookies.set(COOKIES.token, data.token, { secure: !ENV.isLocal });
      this.props.updateAccount(data.account);
      this.setState({ loadingAccount: false });
    } catch {
      this.setState({ loadingAccount: false });
    }
  }

  handleEmail = (event: any) => {
    this.setState({ email: event.target.value });
  }

  handlePassword = (event: any) => {
    this.setState({ password: event.target.value });
  }

  handleLogin = async () => {
    if (this.state.email === "" || this.state.password === "") return;

    let options = {
      email: this.state.email,
      password: this.state.password
    };

    try {
      let data = await accountService.authenticate(options);
      if (!data.token) return;

      this.props.cookies.set(COOKIES.token, data.token, { secure: !ENV.isLocal });
      this.props.updateAccount(data.account);
      window.location.replace(`/${data.account._id}`);
    } catch (err) {
      console.log('err: ', err);
      console.log("Error Logging in");
    }
  }

  getContent = () => {
    if (
      !this.state.loadingAccount
    ) {
      return (
        <div className="App">
          <Route
            path="/"
            render={() => <div></div>}
          />
        </div>
      );
    }
    return null;
  }

  render() {
    return(
      <div className="App">
        <header className="App-header">
        <Input type="text" header="Email" onChange={this.handleEmail}/>
        <Input type="password" header="Password" onChange={this.handlePassword}/>
        <button type="button" onClick={this.handleLogin}>Login</button>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    state: state,
    cookies: ownProps.cookies
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  updateAccount: (account: any) => dispatch(updateAccount(account)),
});

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppComponent);

export default withCookies(App);
