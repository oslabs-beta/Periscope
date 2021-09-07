import React, { useState, useEffect } from 'react';
import DropdownButton from 'react-bootstrap/esm/DropdownButton';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';

const PodInfoRows = ({ clickedArray, setClickedArray, podNums, setStep, setTimeWindow }) => {

  // on click function for pod names list to set clickedArray in podContainer
  const newClick = (arg) => {
    let found = false;
    const newClickedArray = clickedArray.slice();
    for (let i = 0; i < newClickedArray.length; i++) {
      if (newClickedArray[i].podName === arg) {
        newClickedArray.splice(i, 1);
        setClickedArray(newClickedArray);
        found = true;
        break;
      }
    }
    if (!found) {
      newClickedArray.push(podNums[arg]);
      setClickedArray(newClickedArray);
    }
  };

  // create list of pod names 
  const podNames = Object.entries(podNums);
  const podList = [];
  for (let i = 0; i < podNames.length; i++) {
    let pod = podNames[i][1];
    podList.push(
      <li
        style={{ "list-style-type": "none" }}
        onClick={() => {
          newClick(pod.podName);
        }}
        key={i}>
        {pod.name} {pod.podName}
      </li>
    );
  }

   /* -----------------------------------------------------------------------------------------
  functionality to change time and step range - 
  to disable functionality: 
  comment out this section and div w/ id of 'dropdowns' in podInfoRows render
  comment out TimeWindow and Step state added to podcontainer */

  //time range variables
  const oneHour = 3600;
  const sixHours = 21600;
  const twelveHours = 43200;
  const oneDay = 86400;
  const threeDays = 259200;

  const times = [oneHour, sixHours, twelveHours, oneDay, threeDays];
  const timeButtons = [];
  times.forEach((time, i) => { //create dropwdown items to select time range
    timeButtons.push(<DropdownItem menuVariant="dark" key={i}> <div onClick={() => { console.log('clicked'); setTimeWindow(time); setClickedArray([]) }} style={{ padding: '5px'}}>{time}</div></DropdownItem>);
  })

  const steps = ['1m', '5m', '30m', '1hr']; // step range variables in array
  const stepButtons = [];
  steps.forEach((step, i) => { // create dropdown items to select step range
    stepButtons.push(<DropdownItem menuVariant="dark" key={i}> <div onClick={() => { console.log('clicked'); setStep(step); setClickedArray([]) }} style={{ padding: '5px'}}>{step}</div></DropdownItem>);
  })
  // ------------------------------------------------------------------------------------------


  return (
    <div>
      <div id='dropdowns'>
        <DropdownButton class="dropdown-button" title="Time Range">
          {timeButtons}
        </DropdownButton>
        <DropdownButton class="dropdown-button" title="Step">
          {stepButtons}
        </DropdownButton>
      </div>
      {' '}
      <ul>{podList}</ul>{' '}
    </div>
  );
};

export default PodInfoRows;

