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
import { Link } from 'react-router-dom';
const firebase = require('firebase');

const SignupComponent = props => {
	const [state, setState] = useState({
		email: null,
		password: null,
		passwordConfirmation: null,
		signupError: '',
	});

	const { classes } = props;

	const submitSignup = e => {
		e.preventDefault();
		if (!formIsValid()) {
			setState({ ...state, signupError: 'Passwords Do Not Match!' });
			return;
		}
		firebase
			.auth()
			.createUserWithEmailAndPassword(state.email, state.password)
			.then(authRes => {
				const userObj = { email: authRes.user.email };
				firebase
					.firestore()
					.collection('users')
					.doc(state.email)
					.set(userObj)
					.then(() => props.history.push('/dashboard'))
					.catch(dbError => {
						console.log(dbError);
						setState({ ...state, signupError: 'DB Problem! Failed to Add User!' });
					});
			})
			.catch(authError => {
				console.log(authError);
				setState({ ...state, signupError: 'Other Problem! Failed to Add User!' });
			});
	};

	const formIsValid = () => state.password === state.passwordConfirmation;

	const userTyping = (type, e) => {
		const { value } = e.target;
		switch (type) {
			case 'email':
				setState({
					...state,
					email: value,
				});
				break;
			case 'password':
				setState({
					...state,
					password: value,
				});
				break;
			case 'passwordConfirmation':
				setState({
					...state,
					passwordConfirmation: value,
				});
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
					Sign Up!
				</Typography>
				<form className={classes.form} onSubmit={e => submitSignup(e)}>
					<FormControl required fullWidth margin="normal">
						<InputLabel htmlFor="signup-email-input">Enter Your Email</InputLabel>
						<Input
							autoComplete="email"
							autoFocus
							id="signup-email-input"
							onChange={e => userTyping('email', e)}
						/>
					</FormControl>
					<FormControl required fullWidth margin="normal">
						<InputLabel htmlFor="signup-password-input">Create a Password</InputLabel>
						<Input
							type="password"
							autoComplete="password"
							autoFocus
							id="signup-password-input"
							onChange={e => userTyping('password', e)}
						/>
					</FormControl>
					<FormControl required fullWidth margin="normal">
						<InputLabel htmlFor="signup-password-confirmation-input">Confirm Your Password</InputLabel>
						<Input
							type="password"
							autoComplete="password"
							autoFocus
							id="signup-password-confirmation-input"
							onChange={e => userTyping('passwordConfirmation', e)}
						/>
					</FormControl>
					<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
						Submit
					</Button>
				</form>
				{state.signupError ? (
					<Typography className={classes.errorText} component="h5" variant="h6">
						{state.signupError}
					</Typography>
				) : null}
				<Typography component="h5" variant="h6" className={classes.hasAccountHeader}>
					Already Have an Account?
				</Typography>
				<Link to="/login" className={classes.logInLink}>
					Login!
				</Link>
			</Paper>
		</main>
	);
};

export default withStyles(styles)(SignupComponent);
