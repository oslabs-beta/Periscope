import React, { useState, useEffect } from 'react';

const PodInfoRows = ({ clickedArray, setClickedArray, podNums }) => {
  console.log('clickedArray; ', clickedArray);

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

  const podNames = Object.entries(podNums);
  const podList = [];

  for (let i = 0; i < podNames.length; i++) {
    let pod = podNames[i][1];
    podList.push(
      <li
        onClick={() => {
          newClick(pod.podName);
        }}
        key={i}>
        {pod.name} {pod.podName}
      </li>
    );
  }

  return (
    <div>
      {' '}
      <ul>{podList}</ul>{' '}
    </div>
  );
};

export default PodInfoRows;

//container

//podinforows
//click fuction to add pods to clickedArray.
//memorytimeseries
//clickedArray
