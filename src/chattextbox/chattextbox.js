import React from 'react';
import styles from './styles';
import Send from '@material-ui/icons/Send';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

class ChatTextBoxComponent extends React.Component {

  
    render(){
        const {classes}= this.props;

        return(
            <div className={classes.chatTextBoxContainer}>
                <TextField 
                placeholder='Type your messege...'
                onKeyUp={(e)=> this.userTyping(e)}
                id='chattextbox'
                className={classes.chatTextBox}>
                </TextField>
                <Send onClick={this.submitMessege} className={classes.sendBtn}></Send>

            </div>
        )
    }

    userTyping = (e) => e.keyCode === 13 ? this.submitMessege() : this.setState({chatText: e.target.value});
    messegeValid= (txt) => txt && txt.replace(/\s/g, '').length; //just checks if input is empty or a bunch of spaces
    submitMessege = () => {
        if(this.messegeValid(this.state.chatText)){
            this.props.submitMessegeFn(this.state.chatText);
            document.getElementById('chattextbox').value = '';
        }
    }
    userClickedInput = () => this.props.userClickedInput;
}

export default withStyles(styles)(ChatTextBoxComponent);