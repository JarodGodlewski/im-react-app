import React from 'react';
import ChatListComponent from '../chatlist/chatList';
import {Button, withStyles} from '@material-ui/core';
import styles from './styles';
const firebase = require('firebase');

class DashboardComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            selectedChat: null,
            newChatFormVisible: false,
            email: null,
            chats: []
        };
    }

    render(){

        const {classes } = this.props;

        return(
        <div>
            <ChatListComponent history={this.props.history}
                newChatFn={this.newChat}
                selectChatFn={this.selectChat}
                chats={this.state.chats}
                userEmail={this.state.email}
                selectedChatIndex={this.state.selectedChat}> 
            </ChatListComponent>
            <Button className={classes.signOutBtn} onClick={this.signOut}> Sign Out</Button>
        </div>
        );
    }

    signOut = () => firebase.auth().signOut();

    selectChat = (chatIndex) => {
        console.log('Selected a chat', chatIndex);
    }

    newChat = () => this.setState({ newChatFormVisible: true, selectChat: null});

    //when the dashboard is mounted in the DOM we wanna grab the chats from firebase
    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(async _usr => {
            if(!_usr)
            this.props.history.push('/login');
            else{
                await firebase
                    .firestore()
                    .collection('chats')
                    .where('users', 'array-contains', _usr.email) //firestore query 
                    .onSnapshot(async res => {
                        const chats = res.docs.map(_doc => _doc.data())
                        await this.setState({
                            email: _usr.email,
                            chats: chats
                        });
                    }) 
            }
        })
    }
}

export default withStyles(styles)(DashboardComponent);