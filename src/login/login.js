import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import styles from './styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const firebase = require('firebase');

const LoginComponent = props => {
	const { classes } = props;

	const [state, setState] = useState({
		email: null,
		password: null,
		loginError: '',
	});

	const submitLogin = e => {
		e.preventDefault();
		firebase
			.auth()
			.signInWithEmailAndPassword(state.email, state.password)
			.then(() => {
				props.history.push('/dashboard');
			})
			.catch(error => {
				console.log(error);
				setState({ ...state, loginError: 'Server Error!' });
			});
	};

	const userTyping = (type, e) => {
		const { value } = e.target;
		switch (type) {
			case 'email':
				setState({ ...state, email: value });
				break;
			case 'password':
				setState({ ...state, password: value });
				break;
			default:
				break;
		}
	};

	return (
		<main className={classes.main}>
			<CssBaseline></CssBaseline>
			<Paper className={classes.paper}>
				<Typography component="h1" variant="h5">
					Log In!
				</Typography>
				<form className={classes.form} onSubmit={e => submitLogin(e)}>
					<FormControl required fullWidth margin="normal">
						<InputLabel htmlFor="login-email-input">Enter Your Email</InputLabel>
						<Input
							autoComplete="email"
							autofocus
							id="login-email-input"
							onChange={e => userTyping('email', e)}
						></Input>
					</FormControl>
					<FormControl required fullWidth margin="normal">
						<InputLabel htmlFor="login-password-input">Enter Your Password</InputLabel>
						<Input
							type="password"
							id="login-password-input"
							onChange={e => userTyping('password', e)}
						></Input>
					</FormControl>
					<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
						Log In
					</Button>
				</form>
				{state.loginError ? (
					<Typography component="h5" variant="h6" className={classes.errorText}>
						Incorrect Login Information
					</Typography>
				) : null}
				<Typography component="h5" variant="h6" className={classes.noAccountHeader}>
					Don't Have An Account?
				</Typography>
				<Link to="/signup" className={classes.signUpLink}>
					Sign Up!
				</Link>
			</Paper>
		</main>
	);
};

export default withStyles(styles)(LoginComponent);
