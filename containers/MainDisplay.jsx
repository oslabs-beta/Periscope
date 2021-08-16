// useeffect to grabs all messages and displays each message to the messageboard component
// display createmassage component
// useeffect to do the get message

import React, {useEffect, useState} from 'react';
import CreateMessage from '../components/CreateMessage.jsx'
import MessageDisplay from '../components/MessageDisplay.jsx'
import axios from 'axios';


const MainDisplay = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [name, setName] = useState('');

  // useEffect to get messages
  useEffect(async () => {
    let result = await axios('/api');
    // the messages are an array of objects (each obj is message)
    if (result) {
      setMessages(result.data);
    }
  }, []);

  const submitForm = async (name, message) => {
    // POST REQUEST
    let result = await axios.post('/api', {
      user: name,
      message: message,
    });
    console.log(result);
  };

  //loop through messages and create a Message
  const output = [];

  for (let i = 0; i < messages.length; i++) {
    output.push(<MessageDisplay key={messages[i]._id} username={messages[i].user} message={messages[i].message} />)
  }

  return (
    <div>
      {output}
      <CreateMessage submitForm={submitForm} />
    </div>
  )

}


export default MainDisplay;