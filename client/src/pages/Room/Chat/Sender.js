import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';

const Sender = ({ handleSubmit, handleChange, handleKeyPress, message}) => {
    function handleFocus(event) {
        event.preventDefault();
        document.getElementById('sender').style.backgroundColor = "rgba(256,256,256,0.7)"
    }
    function handleFocusOut(event) {
        event.preventDefault();
        document.getElementById('sender').style.backgroundColor = "rgba(256,256,256,0.4)"
    }

    return (
        <form className='sender' onSubmit={handleSubmit} id="sender">
            <TextareaAutosize id="text" onChange={handleChange} onKeyPress={handleKeyPress} onFocus={handleFocus} onBlur={handleFocusOut} value ={message} autoFocus />
            <button className="send">Send</button>
        </form>
    );

}

export default Sender;