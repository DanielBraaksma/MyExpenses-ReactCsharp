import { TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { authorizeUser } from "../slices/userSlice";
import { Button } from "@mui/material";
// import { useSelector } from "react-redux";
// import { selectIsAuth } from "../slices/userSlice";

const LoginForm = ({ handleIsLoggingIn, handleChange, handleLogin }: any) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
        }}
      >
        <Button
          variant="outlined"
          size="small"
          style={{ margin: "10px", marginBottom: "2em", alignSelf: "flex-end" }}
          onClick={handleIsLoggingIn}
        >
          Register here
        </Button>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "60%",
          }}
        >
          <h2>Login</h2>
          <TextField
            id="email"
            name="email"
            label="email"
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            id="password"
            type="password"
            name="password"
            label="password"
            variant="standard"
            onChange={handleChange}
          />
          <Button
            variant="contained"
            style={{
              marginTop: "18px",
              width: "100px",
            }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </div>
      </div>
    </>
  );
};

const RegisterForm = ({
  handleIsLoggingIn,
  handleChange,
  handleRegister,
}: any) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
        }}
      >
        <Button
          variant="outlined"
          size="small"
          style={{ margin: "10px", marginBottom: "2em", alignSelf: "flex-end" }}
          onClick={handleIsLoggingIn}
        >
          Login here
        </Button>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "60%",
          }}
        >
          <h2>Register</h2>
          <TextField
            id="email"
            name="email"
            label="email"
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            id="password"
            type="password"
            name="password"
            label="password"
            variant="standard"
            onChange={handleChange}
          />
          <Button
            variant="contained"
            style={{
              marginTop: "18px",
              width: "100px",
            }}
            onClick={handleRegister}
          >
            Register
          </Button>
        </div>
      </div>
    </>
  );
};

export const Login = () => {
  // const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  console.log("formData: ", formData);

  const loginStyles = {
    container: {
      background:
        "linear-gradient(90deg, rgb(2, 0, 36) 0%, rgb(9, 9, 121) 35%, rgb(0, 212, 255) 100%)",
      with: "100vw",
      height: "100vh",
      margin: 0,
      padding: "2em",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    loginContainer: {
      width: "300px",
      height: "400px",
      backgroundColor: "white",
      display: "flex",
      borderRadius: "5px",
      flexDirection: "column" as "column",
      alignItems: "center",
      justifyContent: "center",
    } as React.CSSProperties,
  };

  const handleChange = (e: {
    target: {
      name: any;
      value: any;
    };
  }) => {
    console.log("event", e);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleIsLoggingIn = () => {
    setFormData({
      email: "",
      password: "",
    });
    setIsLoggingIn((prevState) => !prevState);
  };

  const handleLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
    const data = { password: formData.password, username: formData.email };
    // TODO: change url when deployed
    fetch(
      `https://app-myexpenses-eastus-dev-001.azurewebsites.net/api/Auth/Login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.jwtToken) {
          // this mean succsfuly

          console.log("inside");
          localStorage.setItem("token", res.jwtToken);
          dispatch(authorizeUser());

          navigate("/home");
        }
        if (res.error) {
          // this mean failed
          console.log("not found");

          //   const err = res.message;
          //   setData((prevData) => ({ ...prevData, errors: err }));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRegister = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
    const data = {
      password: formData.password,
      username: formData.email,
      roles: ["Reader"],
    };
    // TODO: change url when deployed
    fetch(
      `https://app-myexpenses-eastus-dev-001.azurewebsites.net/api/Auth/Register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.message) {
          // this mean succsfuly
          alert("successfully registered, please login to continue");

          setIsLoggingIn(true);
        }
        if (res.error) {
          // this mean failed
          console.log(res.error);

          //   const err = res.message;
          //   setData((prevData) => ({ ...prevData, errors: err }));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div style={loginStyles.container}>
      <div style={loginStyles.loginContainer}>
        {isLoggingIn ? (
          <LoginForm
            handleIsLoggingIn={handleIsLoggingIn}
            handleChange={handleChange}
            handleLogin={handleLogin}
          />
        ) : (
          <RegisterForm
            handleIsLoggingIn={handleIsLoggingIn}
            handleChange={handleChange}
            handleRegister={handleRegister}
          />
        )}
      </div>
    </div>
  );
};
