import React from 'react';
import styles from './styles';
import ChatListComponent from '../chatlist/chatlist';
import ChatViewComponent from '../chatview/chatview';
import ChatTextBoxComponent from '../chattextbox/chattextbox';
import {Button, withStyles} from '@material-ui/core';

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
            {
                this.state.newChatFormVisible ?
                null :
                <ChatViewComponent
                    user={this.state.email}
                    chat={this.state.chats[this.state.selectedChat]}>
                </ChatViewComponent>
            }
            {
                this.state.selectedChat !== null && !this.state.newChatFormVisible ? 
                <ChatTextBoxComponent submitMessegeFn={this.submitMessege} userClickedInputFn={this.messageRead} ></ChatTextBoxComponent>:
                null
            }
            
            <Button className={classes.signOutBtn} onClick={this.signOut}> Sign Out</Button>
        </div>
        );
    }



    submitMessege = (msg) => {
        const docKey = this.buildDocKey(this.state.chats[this.state.selectedChat].users.filter(_usr => _usr !== this.state.email)[0]);
        firebase
            .firestore()
            .collection('chats')
            .doc(docKey)
            .update({
                messeges: firebase.firestore.FieldValue.arrayUnion({
                    sender: this.state.email,
                    messege: msg,
                    timestamp: Date.now()
                }),
                receiverHasRead: false
            });
    }

    buildDocKey = (friend)  => [this.state.email, friend].sort().join(':');

    signOut = () => firebase.auth().signOut();

    selectChat = (chatIndex) => {
        this.setState({selectedChat: chatIndex});
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