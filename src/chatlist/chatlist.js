import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import styles from './styles';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import NotificationImportant from '@material-ui/icons/NotificationImportant';
import { withRouter } from 'react-router-dom';

const ChatListComponent = props => {
	const { classes, history, chats, selectChatFn, selectedChatIndex, userEmail, newChatBtnFn } = props;

	const newChat = () => newChatBtnFn();

	const selectChat = index => selectChatFn(index);

	return (
		<main className={classes.root}>
			<Button
				color="primary"
				variant="contained"
				fullWidth
				onClick={() => newChat()}
				className={classes.newChatBtn}
			>
				New Message
			</Button>
			<List>
				{chats.length > 0
					? chats.map((_chat, _index) => (
							<div key={_index}>
								<ListItem
									onClick={() => selectChat(_index)}
									className={classes.listItem}
									selected={selectedChatIndex === _index}
									alignItems="flex-start"
								>
									<ListItemAvatar>
										<Avatar alt="Remy Sharp">{_chat.sender[0]}</Avatar>
									</ListItemAvatar>
									<ListItemText
										primary={_chat.sender}
										secondary={
											<React.Fragment>
												<Typography component="span" color="textPrimary">
													{_chat.message.substring(0, 30) + '...'}
												</Typography>
											</React.Fragment>
										}
									></ListItemText>
								</ListItem>
								<Divider></Divider>
							</div>
					  ))
					: null}
			</List>
		</main>
	);
};

export default withRouter(withStyles(styles)(ChatListComponent));
