import React, { useEffect } from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';

const ChatViewComponent = props => {
	const { classes, chats, user } = props;

	const users = chats.map(chat => chat.sender).filter(_user => _user !== user);

	useEffect(() => {
		const container = document.getElementById('chatview-container');
		if (container) {
			container.scrollTo(0, container.scrollHeight);
		}
	}, [chats.length]);

	return chats.length > 0 ? (
		<div>
			<div className={classes.chatHeader}>Your conversation with: {users[0]}</div>
			<main className={classes.content} id="chatview-container">
				{chats.map((_message, _index) => (
					<div key={_index} className={_message.sender === user ? classes.userSent : classes.friendSent}>
						{_message.message}
					</div>
				))}
			</main>
		</div>
	) : (
		<main className={classes.content}></main>
	);
};

export default withStyles(styles)(ChatViewComponent);
