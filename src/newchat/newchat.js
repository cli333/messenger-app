import React, { useState } from 'react';
import { FormControl, InputLabel, Input, Button, Paper, withStyles, CssBaseline, Typography } from '@material-ui/core';
import styles from './styles';
const firebase = require('firebase');

const NewChatComponent = props => {
	const { classes } = props;

	const [state, setState] = useState({
		username: null,
		message: null,
	});

	const userTyping = (type, e) => {
		switch (type) {
			case 'username':
				setState({
					...state,
					username: e.target.value,
				});
				break;
			case 'message':
				setState({
					...state,
					message: e.target.value,
				});
				break;
			default:
				break;
		}
	};

	const submitNewChat = async e => {
		e.preventDefault();
		const user = await userExists();
		if (user) {
			const chat = await chatExists();
		}
	};

	const createChat = () => {};

	const userExists = async () => {
		const usersSnapshot = await firebase
			.firestore()
			.collection('users')
			.get();
		const exists = usersSnapshot
			.docs()
			.map(_doc => _doc.data().email)
			.includes(state.username);
		setState({
			serverError: !exists,
		});
		return exists;
	};

	const chatExists = async () => {
		const docKey = buildDocKey();
		const chat = await firebase
			.firestore()
			.collections('chats')
			.doc(docKey)
			.get();
		console.log(chat.exists);
		return chat.exists;
	};

	const buildDocKey = () => [firebase.auth().currentUser.email, state.username].sort().join(' ');

	return (
		<div className={classes.main}>
			<CssBaseline></CssBaseline>
			<Paper className={classes.paper}>
				<Typography component="h1" variant="h5">
					Send a Message!
				</Typography>
				<form className={classes.form} onSubmit={e => submitNewChat(e)}>
					<FormControl fullWidth>
						<InputLabel htmlFor="new-chat-username">Enter Your Friend's Email</InputLabel>
						<Input
							required
							className={classes.input}
							autoFocus
							onChange={e => userTyping('username', e)}
							id="new-chat-username"
						/>
					</FormControl>
					<FormControl fullWidth>
						<InputLabel htmlFor="new-chat-message">Enter Your Message</InputLabel>
						<Input
							required
							className={classes.input}
							onChange={e => userTyping('message', e)}
							id="new-chat-message"
						/>
					</FormControl>
				</form>
			</Paper>
		</div>
	);
};

export default withStyles(styles)(NewChatComponent);
