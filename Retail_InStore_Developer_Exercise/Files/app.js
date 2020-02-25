"use strict";

//grab the JSON using Fetch API
var fetchData = fetch("./js/navigation.json")
    .then(resp => {
        return resp.json();
    }).then(data => {
        // console.log(JSON.stringify(data));
        navDataLength(data);
        printData(JSON.stringify(data));
    }).catch(error => {
        // alert("Oh no, data could not be found.");
        document.getElementById("slider-nav").innerHTML += "<p> 404, no data found.</p>";
        console.log(error);
    });

// ---------- FUNCTIONS ----------------
//get the length of the data object
var navDataLength = (navData) => {
    console.log( navData.cities.length ); //7
}

//Print the data to the page and add an event listener click to each of the nav links
var printData = (navData) => {
    var jsonData = JSON.parse(navData); // doing this to recheck the json is in the right format to use
    
    var htmlNavList = ""; // html list of cities to be added

    for (let i = 0; i< jsonData.cities.length; i++) { //jsonData.cities.length is 7; loop through all cities 
        // create list component first
        var listComp = document.createElement("li");
        listComp.setAttribute("id", "city");

        // create link component
        var cityLink = document.createElement("a");
        var textnode = document.createTextNode(jsonData.cities[i].label);
        cityLink.setAttribute("class", "gray");
        cityLink.setAttribute("href", "#" + jsonData.cities[i].section);
        cityLink.append(textnode);
        //append the a element in li
        listComp.appendChild(cityLink);

        //have ul append in the new li a element
        document.getElementById("nav-group").appendChild(listComp);
    }

    //line under the nav link
    var currentLink = document.createElement("li");
    currentLink.setAttribute("id", "currentLink");
    document.getElementById("nav-group").appendChild(currentLink);

    //add even listener after appending everything and printing it 
    document.querySelectorAll("a").forEach(item => { item.addEventListener("click", event=> { resize() }, false)});
    
}

//function resize: takes no parameters,
//resizes the underline

function resize(){
    console.log("working");

    //need element && the left position && the width variable to update per link
    var element, leftPosOfLine, newWidth;
    var currentLink = document.getElementById("currentLink"); //grab the line
}


