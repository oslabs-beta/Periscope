/*
 * *****************************************************************************
 * @description Information and selection of individual pods to be displayed in PodInfoTable; 
   functions to select time and step range for time-series queries
 * *****************************************************************************
 */


import React, { useState } from 'react';
import PodInfoTableSetup from './PodInfoTableSetup.jsx';

const PodInfoRows = ({
  clickedArray,
  setClickedArray,
  podNums,
  setStep,
  setTimeWindow,
}) => {
  const [isTimeOpen, setIsTimeOpen] = useState(false); // state for time range dropdown
  const [isStepOpen, setIsStepOpen] = useState(false); // state for step range dropdown

  // on click function to select pods to add to clickedArray in podContainer
  const newClick = (arg) => {
    let found = false;
    const newClickedArray = clickedArray.slice(); // copy of current clickedArray to update
    for (let i = 0; i < newClickedArray.length; i++) {
      if (newClickedArray[i].podName === arg) { // if selected pod is already in clickedArray, remove it
        newClickedArray.splice(i, 1);
        setClickedArray(newClickedArray);
        found = true;
        break;
      }
    }
    if (!found) { // if selected pod is not in clickedArray, add it 
      newClickedArray.push(podNums[arg]);
      setClickedArray(newClickedArray);
    }
  };

  // changes all colors of pods back to gray (unselects) once the time-range or time-step is changed
  function changeColorsBack() {
    const rows = document.querySelectorAll('.table-row');
    for (const row of rows) {
      if (row.style.color === 'orange') row.style.color = "gray";
    }
  }

  //time range variables for time range selection
  const oneHour = 3600;
  const sixHours = 21600;
  const twelveHours = 43200;
  const oneDay = 86400;
  const threeDays = 259200;

  const times = [oneHour, sixHours, twelveHours, oneDay, threeDays];
  const timeStrs = ['1hr', '6hrs', '12hrs', '1day', '3days'];
  const timeButtons = [];
  times.forEach((time, i) => {
    //create dropwdown items to select time range
    timeButtons.push(
      <div
        className='dropdown-div'
        key={`${i}`}
        onClick={() => {
          setTimeWindow(time);
          setClickedArray([]);
          setIsTimeOpen(false);
          changeColorsBack();
        }}>
        {timeStrs[i]}
      </div>
    );
  });

  const steps = ['5m', '15m', '30m', '1h']; // step range variables in array
  const stepButtons = [];
  steps.forEach((step, i) => {
    // create dropdown items to select step range
    stepButtons.push(
      <div
        className='dropdown-div'
        key={`${i}`}
        onClick={() => {
          setStep(step);
          setClickedArray([]);
          setIsStepOpen(false);
          changeColorsBack();
        }}>
        {step}
      </div>
    );
  });

  // functions to toggle time and step dropdowns 
  const toggleStep = () => {
    if (isTimeOpen) setIsTimeOpen(false);
    isStepOpen ? setIsStepOpen(false) : setIsStepOpen(true);
  };

  const toggleTime = () => {
    if (isStepOpen) setIsStepOpen(false);
    isTimeOpen ? setIsTimeOpen(false) : setIsTimeOpen(true);
  };

  

  return (
    <div className='pod-info-rows'>
      <div className='dropdowns'>
        <div className='dropdown-time'>
          <button className='dropdown-button' onClick={() => toggleTime()}>
            Time Range
          </button>
          {isTimeOpen && (
            <div className='dropdown-menu' id='timeMenu'>
              {timeButtons}
            </div>
          )}
        </div>
        <div className='dropdown-step'>
          <button className='dropdown-button' onClick={() => toggleStep()}>
            Step
          </button>
          {isStepOpen && (
            <div className='dropdown-menu' id='stepMenu'>
              {stepButtons}
            </div>
          )}
        </div>
        <div className='unselect-all'>
          <button
            className='dropdown-button'
            onClick={() => {
              setClickedArray([]);
              changeColorsBack();
            }}>
            Unselect All
          </button>
        </div>
      </div>
      <div>
        <PodInfoTableSetup
          podNums={podNums}
          newClick={newClick}
          clickedArray={clickedArray}
        />
      </div>
    </div>
  );
};

export default PodInfoRows;
