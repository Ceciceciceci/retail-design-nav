"use strict";

//grab the JSON using Fetch API
var fetchData = fetch("./js/navigation.json")
    .then(resp => {
        return resp.json();
    }).then(data => {
        navDataLength(data);
        printData(JSON.stringify(data));
    }).catch(error => {
        document.getElementById("slider-nav").innerHTML += "<p> 404, no data found.</p>";
        console.log(error);
    });

// ---------- FUNCTIONS ----------------
//get the length of the data object
var navDataLength = (navData) => {
    var length = navData.cities.length;
    return length;
}

//Print the data to the page and add an event listener click to each of the nav links
var printData = (navData) => {
    var jsonData = JSON.parse(navData); // doing this to recheck the json is in the right format to use
    for (let i = 0; i < jsonData.cities.length; i++) { //loop through all cities 
        // create list component first
        var listComp = document.createElement("li");
        listComp.setAttribute("id", "city");

        // create link component
        var cityLink = document.createElement("a");
        var textnode = document.createTextNode(jsonData.cities[i].label);
        cityLink.append(textnode);
        //this will set the first element to be the active link onload
        (i === 0) ? (cityLink.setAttribute("class", "active")) : (cityLink.setAttribute("class", ""));
        cityLink.setAttribute("href", "#" + jsonData.cities[i].section);
        cityLink.setAttribute("id", jsonData.cities[i].section);

        //append the a element in li
        listComp.appendChild(cityLink);

        //have ul append in the new li a element
        document.getElementById("nav-group").appendChild(listComp);
    }
    //line under the nav link
    var currentLink = document.createElement("li");
    currentLink.setAttribute("id", "currentLink");
    currentLink.style.left = document.getElementsByClassName("active")[0].offsetLeft + "px"; //left pixel postion of the line 
    document.getElementById("nav-group").append(currentLink); //ul append line

    //add even listener after appending everything and printing it 
    document.querySelectorAll("a").forEach(item => { item.addEventListener("click", event=> { resize(item.id); displayTime(item.id)}, false)});
}

//function resize: takes in the clicked element's id attr,
//resizes the underline and moves it
var resize = (item) => {
    document.querySelectorAll('a').forEach(item => {item.classList.remove("active")});
    //need element && the index in the nav && the width variable to check position and width of current line
    var element, newLeftPos, newWidth, currLeftPos, currLength;
    element = item;
    newWidth = document.getElementById(element).offsetWidth; //width of clicked nav elem
    newLeftPos = document.getElementById(element).offsetLeft; //left pixel position of clicked nav elem
    currLeftPos = document.getElementById("currentLink").offsetLeft; //curr line left pixel position
    currLength = document.getElementById("currentLink").style.width; //curr line width

    if (currLeftPos === newLeftPos && currLength === newWidth){
        // if the curr line pixel pos = new nav left pixel pos click, likewise for width
    } else {
        document.getElementById(element).classList.add("active"); //set active to clicked element
        document.getElementById("currentLink").style.left = newLeftPos + "px";
        document.getElementById("currentLink").style.width = newWidth + "px";
    }
}

//display time [8, 5, 0, 1, 9, 8, 11]
//utc for each city, will map it
//Would like to use Google Time API but for less library use, I forgo using it
function displayTime(city) {
    document.getElementById('desc').style.opacity = 0;
    const savedCity = city;
    let utcNum = 0;
    switch(savedCity) {
        case "new-york-city":
          utcNum = 5;
          break;
        case "london":
          utcNum = 0;
          break;
        case "london":
          utcNum = 0;
          break;
        case "amsterdam":
          utcNum = 1;
          break;
        case "tokyo":
          utcNum = 9;
          break;
        case "sydney":
          utcNum = 11;
          break;
        case "hong-kong":
          utcNum = 8;
          break;
        default:
          utcNum = -8;
      }

    //get the day
    var cityDate = calcTime(savedCity, utcNum);
    var dt = new Date(cityDate);
    var yyyy = dt.getFullYear();
    var mm = dt.toLocaleString('default', { month: 'long' });
    var dd = (dt.getDate() + 1 < 10) ? ("0" + dt.getDate()) : (dt.getDate());
    var date = mm + ' ' + dd +  ', ' + yyyy;
    //get the time 
    var ampm = (dt.getHours() > 12) ? ('pm') : ('am');
    var hh = (dt.getHours() > 12) ? (dt.getHours() - 12) : (dt.getHours());
    var mm = (dt.getMinutes() < 10) ? ("0" + (dt.getMinutes())) : (dt.getMinutes());
    var ss = (dt.getSeconds() < 10) ? ("0" + dt.getSeconds()) : (dt.getSeconds());
    var time = hh + " : " + mm + " : " + ss + "   " + ampm; //cupertino time

    //display it
    document.getElementById('date-display').innerHTML = date; //mm dd, yyyy
    document.getElementById('clock-display').innerHTML = time; // h : mm : ss 
    document.getElementById('date-display').style.opacity = 1;
    document.getElementById('clock-display').style.opacity = 1;

    //update time per second
    // setTimeout(displayTime, 1000, savedCity);
}

function calcTime(city, offset) {
    // create Date object for current location
    let d = new Date();
    // get UTC time in msec
    let utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    // create new Date object for different city
    let newDate = new Date(utc + (3600000*offset));
   
    // return time as a string
    return newDate.toLocaleString();
}


