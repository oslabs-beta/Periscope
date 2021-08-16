// styling for a message
import React, {useEffect, useState} from 'react';


const MessageDisplay = (props) => {
    return (
        <div className='message-display'>
            <p>{props.username}</p>
            <p>{props.message}</p>
        </div>
    )

}


export default MessageDisplay;


