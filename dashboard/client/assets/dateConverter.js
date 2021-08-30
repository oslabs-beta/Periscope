



const unixToDateTime = (unixTime) => {

  const months = {
    0: 'Jan',
    1: 'Feb',
    2: 'Mar',
    3: 'Apr',
    4: 'May',
    5: 'Jun',
    6: 'Jul',
    7: 'Aug',
    8: 'Sept',
    9: 'Oct',
    10: 'Nov',
    11: 'Dec'
  }

  const unixDate = new Date(unixTime);
  let month = unixDate.getMonth();
  if (months[month]) month = months[month];
  let date = unixDate.getDate();
  let hour = unixDate.getHours();
  let min = unixDate.getMinutes();
  if (min < 10) min = `0${min}`;
  return `${month} ${date} ${hour}:${min}`;
};

export default unixToDateTime;