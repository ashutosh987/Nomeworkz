import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import React, { Component } from "react";
import zxcvbn from "zxcvbn"
import { auth } from "./../redux/actions"
import firebase from 'firebase';
import db from "./Database"

const validator = require("validator");

function SignUpForm({
  history,
  onSubmit,
  onChange,
  errors,
  user,
  score,
  btnTxt,
  type,
  pwMask,
  onPwChange
}){
  return (
    <div >
      
      {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}

      <form onSubmit={onSubmit}>
        <TextField
        id="outlined-email"
      
          name="email"
          floatingLabelText="email"
          value={user.email}
          onChange={onChange}
          errorText={errors.email}
        />
        <TextField
          type={type}
        
          name="password"
          floatingLabelText="password"
          value={user.password}
          onChange={onPwChange}
          errorText={errors.password}
        />
        <br />
        <RaisedButton
          className="signUpSubmit"
          primary={true}
          type="submit"
          label="CONTINUE"
        />
      </form>
      {/* <p>
        Create new account? <br />
        <a href="/signup-user">Signup here</a>
      </p>
      <p>
        Forgot password? <br />
        <a href="/reset">Reset here</a>
      </p> */}
    </div>
  );
};

const validateSignUpForm = payload => {
  const errors = {};
  let message = "";
  let isFormValid = true;

  // if (
  //   !payload ||
  //   typeof payload.username !== "string" ||
  //   payload.username.trim().length === 0
  // ) {
  //   isFormValid = false;
  //   errors.username = "Please provide a user name.";
  // }

  if (
    !payload ||
    typeof payload.email !== "string" ||
    !validator.isEmail(payload.email)
  ) {
    isFormValid = false;
    errors.email = "Please provide a correct email address.";
  }

  if (
    !payload ||
    typeof payload.password !== "string" ||
    payload.password.trim().length < 8
  ) {
    isFormValid = false;
    errors.password = "Password must have at least 8 characters.";
  }

  // if (!payload || payload.pwconfirm !== payload.password) {
  //   isFormValid = false;
  //   errors.pwconfirm = "Password confirmation doesn't match.";
  // }

  if (!isFormValid) {
    message = "Check the form for errors.";
  }

  return {
    success: isFormValid,
    message,
    errors
  };
};


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      user: {
        username: "",
        email: "",
        password: "",
        pwconfirm: ""
      },
      btnTxt: "show",
      type: "password",
      score: "0"
    };

    this.pwMask = this.pwMask.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitSignup = this.submitSignup.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.pwHandleChange = this.pwHandleChange.bind(this);
  }

  handleChange(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  pwHandleChange(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });

    if (event.target.value === "") {
      this.setState(state =>
        Object.assign({}, state, {
          score: "null"
        })
      );
    } else {
      var pw = zxcvbn(event.target.value);
      this.setState(state =>
        Object.assign({}, state, {
          score: pw.score + 1
        })
      );
    }
  }

  submitSignup(user) {
    var params = { username: user.usr, password: user.pw, email: user.email };
    console.log(params);
    firebase.auth().signInWithEmailAndPassword(params.email, params.password)
    .then((user) => {
      console.log(user.user)
      if(user.user.emailVerified)
      {
        db.collection("users").doc(user.user.uid).get().then((doc)=>{
          let data = doc.data();
          localStorage.setItem("id",user.user.uid);
          localStorage.setItem("email",data.email);
          localStorage.setItem("name",data.fullName);
          localStorage.setItem("phone",data.phone);
          localStorage.setItem("wallet",data.wallet);
        }).then(()=>{
          window.location.replace("/dashboard-user");
        })
      }
      else
      {
        alert("Please verify you email");
      }
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode,errorMessage);
      alert(errorMessage)
    });
  }

  validateForm(event) {
    event.preventDefault();
    console.log("yee")
    var payload = validateSignUpForm(this.state.user);
    if (payload.success) {
      this.setState({
        errors: {}
      });
      var user = {
        usr: this.state.user.username,
        pw: this.state.user.password,
        email: this.state.user.email
      };
      this.submitSignup(user);
    } else {
      const errors = payload.errors;
      this.setState({
        errors
      });
    }
  }

  pwMask(event) {
    event.preventDefault();
    this.setState(state =>
      Object.assign({}, state, {
        type: this.state.type === "password" ? "input" : "password",
        btnTxt: this.state.btnTxt === "show" ? "hide" : "show"
      })
    );
  }

  render() {
    return (
      <div>
        <SignUpForm
          onSubmit={this.validateForm}
          onChange={this.handleChange}
          onPwChange={this.pwHandleChange}
          errors={this.state.errors}
          user={this.state.user}
          score={this.state.score}
          btnTxt={this.state.btnTxt}
          type={this.state.type}
          pwMask={this.pwMask}
        />
      </div>
    );
  }
}

export default Login;