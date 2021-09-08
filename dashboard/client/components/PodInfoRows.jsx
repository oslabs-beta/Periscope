import React, { useState} from 'react';
import PodInfoTableSetup from './PodInfoTableSetup.jsx'


const PodInfoRows = ({ clickedArray, setClickedArray, podNums, setStep, setTimeWindow }) => {
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const [isStepOpen, setIsStepOpen] = useState(false);

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
  // const podNames = Object.entries(podNums);
  // const podList = [];
  // for (let i = 0; i < podNames.length; i++) {
  //   let pod = podNames[i][1];
  //   podList.push(
  //     <li
  //       style={{ "list-style-type": "none" }}
  //       onClick={() => {
  //         newClick(pod.podName);
  //       }}
  //       key={i}>
  //       {pod.name} {pod.podName}
  //     </li>
  //   );
  // }

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
  const timeStrs = ['1hr', '6hrs', '12hrs', '1day', '3days']
  const timeButtons = [];
  times.forEach((time, i) => { //create dropwdown items to select time range
    timeButtons.push(<div className="dropdown-div" key={`${i}`} onClick={() => { console.log('clicked'); setTimeWindow(time); setClickedArray([]); setIsTimeOpen(false) }} >{timeStrs[i]}</div>);
  })

  const steps = ['1m', '5m', '30m', '1h']; // step range variables in array
  const stepButtons = [];
  steps.forEach((step, i) => { // create dropdown items to select step range
    stepButtons.push(<div className="dropdown-div" key={`${i}`} onClick={() => { console.log('clicked'); setStep(step); setClickedArray([]); setIsStepOpen(false) }} >{step}</div>);
  })

  const toggleStep = () => {
    if (isTimeOpen) setIsTimeOpen(false);
    isStepOpen ? setIsStepOpen(false) : setIsStepOpen(true);
  }

  const toggleTime = () => {
    if (isStepOpen) setIsStepOpen(false);
    isTimeOpen ? setIsTimeOpen(false) : setIsTimeOpen(true)
  }
  // ------------------------------------------------------------------------------------------

  return (
    <div className='pod-info-rows'>
      <div className='dropdowns'>
        <div className='dropdown-time'>
          <button className="dropdown-button" onClick={() => toggleTime()}>Time Range</button>
          {isTimeOpen &&
            (<div className="dropdown-menu" id="timeMenu">{timeButtons}</div>)}
        </div>
        <div className='dropdown-step'>  
          <button className="dropdown-button" onClick={() => toggleStep()}>Step</button>
          {isStepOpen &&
            (<div className="dropdown-menu" id="stepMenu">{stepButtons}</div>)}
        </div>
      </div>
      {/* {' '}
      <ul>{podList}</ul>{' '} */}
      <PodInfoTableSetup podNums={podNums} newClick={newClick} />
    </div>
  );
};

export default PodInfoRows;
