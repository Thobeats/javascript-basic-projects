const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

//Select deadlines
//Get giveaway
//Select headers

const giveaway = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4");

//set future date
/*let futureDate = new Date(2020,9,26,8,30,0); */

let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

const futureDate = new Date(tempYear, tempMonth, tempDay+10, 8, 30, 0);
//console.log(futureDate);

const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const mins = futureDate.getMinutes();
const month = months[futureDate.getMonth()];
const date = futureDate.getDate();
const day = weekdays[futureDate.getDay()];

// Display the full date
giveaway.textContent= `giveaway ends on ${day}, ${date} ${month} ${year} ${hours}:${mins}am`;

//future time in millisecs
const futureTime = futureDate.getTime();

function getRemainingTime(){
  const today = new Date().getTime();
  const t = futureTime - today;
  
  // 1s = 1000ms
  // 1min = 60s
  // 1hr = 60min
  // 1day = 24hrs

  //values in ms
  const oneDay = 24*60*60*1000;
  const oneHour = 60*60*1000;
  const oneMin = 60*1000;
  
  // calculate all values
  let days = Math.floor(t / oneDay);
  let hours = Math.floor((t % oneDay) / oneHour);
  let mins = Math.floor(((t % oneDay) % oneHour) / oneMin);
  let secs = Math.floor((((t % oneDay) % oneHour) % oneMin) / 1000);

  //set values array 
  const values = [days, hours, mins, secs];

  function format(item){
    if(item < 10){
      return item = `0${item}`;
    }
    return item;
  }

  items.forEach(function(item,index){
    item.innerHTML = format(values[index]);
  });

  if(t < 0){
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired"> Sorry, this giveaway has expired </h4>`;
  }
}

//countdown 
let countdown = setInterval(getRemainingTime, 1000);
getRemainingTime();