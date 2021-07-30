import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";


//MUI Imports
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import swal from 'sweetalert';



function AdminRegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  //styles for MUI
  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));
  //defining classes for MUI
  const classes = useStyles();


  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
    swal("Success!", "New Admin Created", "success", {
      button: "OK",
    });
    history.push('/user');
  }; // end registerUser

  return (
    <form  onSubmit={registerUser}>
      <h2>Register New Admin</h2>
      <p>Use this page to create a new Admin account for another user.</p>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}

      <div>
        <TextField
          required
          htmlFor="username"
          name="username"
          label="Username"
          variant="outlined"
          onChange={(event) => setUsername(event.target.value)}
          value={username}>
          Username:
        </TextField>
      </div> <br/>

      <div>
        <TextField
          required
          htmlFor="password"
          name="password"
          label="Password"
          variant="outlined"
          type="password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}>
          Password:
        </TextField>
      </div> <br/>

      <div>
        <Button
          type="submit"
          // onClick={registerUser}
          variant="contained"
          color="primary"
          className="btn"
          value="Register"
          className={classes.LexendTeraFont11}
          >
          Register
        </Button>
      </div>
    </form>
  );
}

export default AdminRegisterForm;
