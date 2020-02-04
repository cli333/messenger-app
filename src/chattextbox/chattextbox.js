import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Send from '@material-ui/icons/Send';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';

const ChatTextBoxComponet = props => {
	const { classes, submitMessageFn } = props;

	const [state, setState] = useState({
		chatText: '',
	});

	const userTyping = e => {
		if (e.keyCode === 13) {
			submitMessage(state.chatText);
			return;
		}
		setState({ chatText: e.target.value });
	};

	const messageValid = text => text && text.replace(/\s/g, '').length;

	const userClickedInput = () => console.log('clicekd input');

	const submitMessage = () => {
		if (messageValid(state.chatText)) {
			document.getElementById('chattextbox').value = '';
		}
		submitMessageFn(state.chatText);
		setState({
			chatText: '',
		});
	};

	return (
		<div className={classes.chatTextBoxContainer}>
			<TextField
				placeholder="Type your message..."
				onKeyUp={e => userTyping(e)}
				id="chattextbox"
				className={classes.chatTextBox}
				onFocus={() => userClickedInput()}
			></TextField>
			<Send onClick={() => submitMessage()} className={classes.sendBtn} />
		</div>
	);
};

export default withStyles(styles)(ChatTextBoxComponet);
