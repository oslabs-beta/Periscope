import React, { useState, useEffect } from 'react';

const PodInfoRows = ({newClick, podNums}) => {
   
    console.log('newClick: ', newClick);
    console.log('podNums: ', podNums);

    const podNames = Object.entries(podNums);
    const podList = [];
    
    for (let i = 0; i < podNames.length; i++) {
        let pod = podNames[i][1];
        console.log(pod.name, pod)
        podList.push(<li onClick={()=>{newClick(pod.podName)}} key={i}>{pod.name} {pod.podName}</li>)
    }

    return (<div> <ul>{podList}</ul> </div>)


}

export default PodInfoRows;