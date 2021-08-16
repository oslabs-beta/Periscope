// input box and submit button
import React, { useEffect, useState} from 'react';


const CreateMessage = (props) => {
  return (
  <div>
    <form onSubmit={() => props.submitForm(document.getElementById('name').value, document.getElementById('enterMessage').value)}>
      <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" placeholder="Your Name..." />
      <label htmlFor="enterMessage">Enter Message:</label>
        <input type="text" id="enterMessage" name="enterMessage" placeholder="Your message..." />
      <input type="submit" value="Submit"/>
    </form>
  </div>
  )
}

export default CreateMessage;