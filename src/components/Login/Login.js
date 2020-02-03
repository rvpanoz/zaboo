import React, { useEffect, useReducer } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { requestSignin } from "actions/user/actions";
import { isPasswordValid, isEmailValid } from "libraries/validators";
import { TermsModal } from "../common";
import styles from "./styles";

const initialState = {
  isLoginDisabled: false,
  termsAccepted: true,
  termsOpen: false,
  username: "rvpanoz@gmail.com",
  password: "pass1234"
};

const useStyles = makeStyles(styles);

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOGIN_DISABLED": {
      return {
        ...state,
        isLoginDisabled: action.disabled
      };
    }
    case "SET_USERNAME": {
      return {
        ...state,
        username: action.value
      };
    }
    case "SET_PASSWORD": {
      return {
        ...state,
        password: action.value
      };
    }
    case "SET_TERMS": {
      return {
        ...state,
        termsAccepted: action.accepted
      };
    }
    case "TOGGLE_TERMS": {
      return {
        ...state,
        termsOpen: action.open
      };
    }
    default:
      return state;
  }
};

const Login = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [state, dispatchAction] = useReducer(reducer, initialState);

  const {
    termsAccepted,
    termsOpen,
    isLoginDisabled,
    username,
    password
  } = state;

  const validateForm = () => {
    const isDisabled =
      !isPasswordValid(password) || !isEmailValid(username) || !termsAccepted;

    dispatchAction({
      type: "SET_LOGIN_DISABLED",
      disabled: isDisabled
    });
  };

  const handleTerms = accepted => {
    dispatchAction({
      type: "SET_TERMS",
      accepted
    });
    dispatchAction({
      type: "TOGGLE_TERMS",
      open: false
    });
  };

  const requestLogin = () => {
    const { username: email, password } = state;

    dispatch(
      requestSignin({
        email,
        password
      })
    );
  };

  useEffect(() => {
    validateForm();
  }, [username, password, termsAccepted]);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            type="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={e => {
              dispatchAction({
                type: "SET_USERNAME",
                value: e.target.value
              });
            }}
            inputProps={{ "data-testid": "usernameTextField" }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="your password"
            onChange={e => {
              dispatchAction({
                type: "SET_PASSWORD",
                value: e.target.value
              });
            }}
            inputProps={{
              "data-testid": "passwordTextField"
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                value="terms"
                color="primary"
                checked={termsAccepted}
                onClick={() =>
                  dispatchAction({
                    type: "SET_TERMS",
                    accepted: !termsAccepted
                  })
                }
                inputProps={{
                  "data-testid": "termsCheckbox"
                }}
              />
            }
            label={
              <div>
                I have read the{" "}
                <a
                  href="#"
                  onClick={() =>
                    dispatchAction({
                      type: "TOGGLE_TERMS",
                      open: !termsOpen
                    })
                  }
                >
                  Terms and Conditions
                </a>
              </div>
            }
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isLoginDisabled}
            onClick={requestLogin}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <TermsModal
        open={termsOpen}
        handleTerms={handleTerms}
        handleClose={() =>
          dispatchAction({
            type: "TOGGLE_TERMS",
            open: false
          })
        }
      />
    </Container>
  );
};

export default Login;
