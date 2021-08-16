// useeffect to grabs all messages and displays each message to the messageboard component
// display createmassage component
// useeffect to do the get message

import React, {useEffect, useState} from 'react';
import CreateMessage from '../components/CreateMessage.jsx'
import MessageDisplay from '../components/MessageDisplay.jsx'
import axios from 'axios';


const MainDisplay = () => {
  const [messages, setMessage] = useState([]);
  const [input, setInput] = useState('');
  const [name, setName] = useState('');

  //useEffect to get messages
  // useEffect(async () => {
  //   // let result = await axios('/api/api');
  //   // if (result) {
  //   //   setMessages(result)
  //   }
  // });

  const submitForm = async (name, message) => {
    // POST REQUEST
    // let result = await axios.post('/api/api', {

    // }),

  }

  //loop through messages and create a Message

    return (
        <div>
        <CreateMessage submitForm={submitForm} />
        {/* {output} */}
        </div>
    )

}


export default MainDisplay;