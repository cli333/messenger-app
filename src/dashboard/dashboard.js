import React, { useState, useEffect } from 'react';
import NewChatComponent from '../newchat/newchat';

import ChatViewComponent from '../chatview/chatview';
import ChatTextBoxComponent from '../chattextbox/chattextbox';
import styles from './styles';
import { Button, withStyles } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import ChatListComponent from '../chatlist/chatlist';
const firebase = require('firebase');

const DashboardComponent = props => {
	const { history, classes } = props;

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
		setState({
			...state,
			newChatFormVisible: false,
			selectedChat: chatIndex,
		});
	};

	const buildDocKey = friend => [state.email, friend].sort().join(' ');

	const submitMessage = message => {
		const friend =
			state.chats.length > 0 && state.chats[0].sender === state.email
				? state.chats[1].sender
				: state.chats.length > 0
				? state.chats[0].sender
				: null;
		const docKey = buildDocKey(friend);
		firebase
			.firestore()
			.collection('chats')
			.doc(docKey)
			.update({
				messages: firebase.firestore.FieldValue.arrayUnion({
					sender: state.email,
					message,
					timestamp: Date.now(),
				}),
				receiverHasRead: false,
			});
	};

	const signOut = () => {
		firebase.auth().signOut();
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
						// fix this, need collection of all chats of user
						const chats = res.docs.length > 0 ? res.docs.map(_doc => _doc.data())[0].messages : [];
						await setState({ ...state, email: _user.email, chats });
					});
			}
		});
	}, [state.email]);

	return (
		<div>
			<ChatListComponent
				newChatBtnFn={newChatBtnClicked}
				selectChatFn={selectChat}
				chats={state.chats}
				userEmail={state.email}
				selectedChatIndex={state.selectedChat}
			/>
			{state.newChatFormVisible ? null : <ChatViewComponent chats={state.chats} user={state.email} />}
			{state.selectedChat ? <ChatTextBoxComponent submitMessageFn={submitMessage} /> : null}
			{state.newChatFormVisible ? <NewChatComponent /> : null}
			<Button onClick={() => signOut()} className={classes.signOutBtn}>
				Sign Out
			</Button>
		</div>
	);
};

export default withRouter(withStyles(styles)(DashboardComponent));
