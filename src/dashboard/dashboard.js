import React, { useState, useEffect } from 'react';
// import NewChatComponent from '../NewChat/newChat';

// import ChatViewComponent from '../ChatView/chatView';
// import ChatTextBoxComponent from '../ChatTextBox/chatTextBox';
import styles from './styles';
import { Button, withStyles } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import ChatListComponent from '../chatlist/chatlist';
const firebase = require('firebase');

const DashboardComponent = props => {
	const { history } = props;

	const [state, setState] = useState({
		selectedChat: null,
		newChatFormVisible: false,
		email: null,
		chats: [],
	});

	const newChatBtnClicked = () => {
		setState({
			...state,
			newChatFormVisible: true,
			selectedChat: null,
		});
	};

	const selectChat = chatIndex => {
		console.log('selected a chat', chatIndex);
	};

	useEffect(() => {
		firebase.auth().onAuthStateChanged(async _user => {
			if (!_user) {
				history.push('/login');
			} else {
				await firebase
					.firestore()
					.collection('chats')
					.where('users', 'array-contains', _user.email)
					.onSnapshot(async res => {
						console.log(res.docs);
						// const chats = res.docs.map(_doc => _doc.data());
						// await setState({ ...state, email: _user.email, chats });
					});
				console.log(state);
			}
		});
	}, []);

	return (
		<div>
			Hello from DashboardComponent!
			<ChatListComponent
				newChatBtnFn={newChatBtnClicked}
				selectChatFn={selectChat}
				chats={state.chats}
				userEmail={state.email}
				selectedChatIndex={state.selectedChat}
			/>
		</div>
	);
};

export default withRouter(withStyles(styles)(DashboardComponent));
