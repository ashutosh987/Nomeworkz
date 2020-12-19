import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import React, { Component } from "react";
import zxcvbn from "zxcvbn"
import firebase from "firebase"
import db from "./Database";

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
const validator = require("validator");

const PasswordStr = props => {
  var strColor;
  var strWidth;

  switch (props.score) {
    case 1:
      strColor = 'red';
      strWidth = '20%';
      break;
    case 2:
      strColor = 'orange';
      strWidth = '40%';
      break;
    case 3:
      strColor = 'yellow';
      strWidth = '60%';
      break;
    case 4:
      strColor = '#5cff47';
      strWidth = '80%';
      break;
    case 5:
      strColor = 'green';
      strWidth = '100%';
      break;
    default:
  }

  var style = { backgroundColor: strColor, height: '5px', width: strWidth, transition: 'all 300ms ease-in-out' }

  return (
  <div>
    <p className="pwStrWeak">weak</p>
    <p className="pwStrStrong">strong</p>
    <div style={style} />
  </div> 
  );
}

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
          name="username"
          floatingLabelText="User name"
          value={user.username}
          onChange={onChange}
          errorText={errors.username}
        />
        <TextField
          name="email"
          floatingLabelText="Email"
          value={user.email}
          onChange={onChange}
          errorText={errors.email}
        />
        <TextField
          name="accnum"
          floatingLabelText="Account number"
          value={user.accnum}
          onChange={onChange}
        />
        <TextField
          name="ifsc"
          floatingLabelText="IFSC"
          value={user.ifsc}
          onChange={onChange}
        />
        <TextField
          name="phone"
          floatingLabelText="Phone number"
          value={user.phone}
          onChange={onChange}
        />
        <TextField
          name="info"
          floatingLabelText="Info"
          value={user.info}
          onChange={onChange}
        />
        <TextField
          type={type}
          name="password"
          floatingLabelText="password"
          value={user.password}
          onChange={onPwChange}
          errorText={errors.password}
        />

        <div className="pwStrRow">
          {score >= 1 && (
            <div>
              <PasswordStr score={score} /> 
              <FlatButton 
                className="pwShowHideBtn" 
                label={btnTxt} onClick={pwMask} 
                style={{position: 'relative', left: '50%', transform: 'translateX(-50%)'}} 
              />
            </div>
            )} 
        </div>
        <TextField
          type={type}
          name="pwconfirm"
          floatingLabelText="confirm password"
          value={user.pwconfirm}
          onChange={onChange}
          errorText={errors.pwconfirm}
        />

        <FormControlLabel
        control={<Checkbox checked={user.type0} onChange={onChange} name="type0" />}
        label="Paper"
      />
      <FormControlLabel
        control={<Checkbox checked={user.type1} onChange={onChange} name="type1" />}
        label="Ppt"
      />
      <FormControlLabel
        control={<Checkbox checked={user.type2} onChange={onChange} name="type2" />}
        label="Resume"
      />
        <br />
        <RaisedButton
          className="signUpSubmit"
          primary={true}
          type="submit"
          label="submit"
        />
      </form>
      {/* <p>
        Aleady have an account? <br />
       Log in
      </p> */}
    </div>
  );
};

const validateSignUpForm = payload => {
  const errors = {};
  let message = "";
  let isFormValid = true;

  if (
    !payload ||
    typeof payload.username !== "string" ||
    payload.username.trim().length === 0
  ) {
    isFormValid = false;
    errors.username = "Please provide a user name.";
  }

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

  if (!payload || payload.pwconfirm !== payload.password) {
    isFormValid = false;
    errors.pwconfirm = "Password confirmation doesn't match.";
  }

  if (!isFormValid) {
    message = "Check the form for errors.";
  }

  return {
    success: isFormValid,
    message,
    errors
  };
};

const validateLoginForm = payload => {
  const errors = {};
  let message = "";
  let isFormValid = true;

  if (
    !payload ||
    typeof payload.username !== "string" ||
    payload.username.trim().length === 0
  ) {
    isFormValid = false;
    errors.username = "Please provide your user name.";
  }

  if (
    !payload ||
    typeof payload.password !== "string" ||
    payload.password.trim().length === 0
  ) {
    isFormValid = false;
    errors.password = "Please provide your password.";
  }

  if (!isFormValid) {
    message = "Check the form for errors.";
  }

  return {
    success: isFormValid,
    message,
    errors
  };
};


class SignupNome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      user: {
        username: "",
        email: "",
        password: "",
        pwconfirm: "",
        type0:true,
        type1:false,
        type2:false,
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
    this.checkForm = this.checkForm.bind(this);
  }

  checkForm(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      
      user
    });



  }

  handleChange(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      
      user
    });


    user[field] = event.target.checked;

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
    var params = { type0:user.type0 , type1:user.type1,type2:user.type2, username: user.usr, password: user.pw, email: user.email,accnum : user.accnum,ifsc:user.ifsc, phone:user.phone,info : user.info };
      firebase.auth().createUserWithEmailAndPassword(params.email, params.password)
      .then((user) => {
        user.user.sendEmailVerification();
        console.log(user);
        db.collection("gnomz").doc(user.user.uid).set(
         {
            accountNumber : params.accnum,
            ifsc : params.ifsc,
            address : null,
            comments : [],
            email:params.email,
            gnomi_pic_url:"https://miro.medium.com/max/10000/0*wZAcNrIWFFjuJA78",
            info:params.info,
            name : params.username,
            nickname:params.username,
            orders : [],
            phone : params.phone,
            phoneVerified : false,
            rating:0,
            selectedGnomeFace:0,
            services:[params.type0,params.type1,params.type2],
            uid : user.user.uid,
          }
        ).then((user)=>{
          alert("User created please login");
          window.location.replace("/login");
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(error);
          alert(errorMessage)
        });
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
    var payload = validateSignUpForm(this.state.user);
    if (payload.success) {
      this.setState({
        errors: {}
      });
      var user = {
        usr: this.state.user.username,
        pw: this.state.user.password,
        email: this.state.user.email,
        accnum: this.state.user.accnum,
        ifsc: this.state.user.ifsc,
        phone : this.state.user.phone,
        info : this.state.user.info
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

export default SignupNome;