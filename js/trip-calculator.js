/**
 * Author: Parth Patel
 * File: trip-calculator.js
 * Holds functions, variables and main method to create a simple toll calculator
 */


/** CONSTANTS **/
// Toll Rate per km in dollars 
const TOLL_RATE = 0.25;

/** DISPLAY FUNCTIONS **/

/**
 * Displays a general message
 * Input: None
 * Return: None
 */
function displayErrorMessage(){
    document.getElementById("result").textContent = "An error has occured and thus, the cost of the distance traveled could not be calculated";
}

/**
 * Displays an error message for an error with the location name
 * Input: None
 * Return: None
 */
function displayLocationErrorMessage(){
    document.getElementById("result").textContent = "An error has occured, one or both of the locations you have entered does not exist in the database. Thus, the cost of the distance traveled could not be calculated";
}

/**
 * Displays the distance and cost of the trip
 * Input: 
 *          distance - Double: Distance between two locations
 *          cost - Double: Cost of toll between two locations
 * Return: None
 */
function displayDistanceAndCost(distance, cost){
    document.getElementById("result").textContent = 
        "The distance of the trip is: " + distance.toFixed(4) +
        " km.\nThe cost of the trip is: $" + cost.toFixed(2) +
        ".";
}

/** UTIL FUNCTIONS **/

/**
 * Checks if location exists in provided database
 * Input: 
 *          interchangeNames - Dictionary: Mapping of names to ids for each interchange
 *          location - String: Name of location to check
 * Return: Boolean
 */
function checkLocation(interchangeNames, location){
    if(location.toLowerCase() in interchangeNames){
        return true
    }
    return false
}

/** GET FUNCTIONS **/

/**
 * Retrieves/Fetches data from Interchanges.json and returns a json array/dictionary of interchanges and their information
 * Input: None
 * Return: Dictionary (If promise fulfilled, otherwise null)
 */
async function getInterchanges() {
    try{
        const resp = await fetch("../data/interchanges.json");
        const data = await resp.json();
        return data.locations;
    } catch (error) {
        console.log(error);
        return null;
    }
}

/**
 * Takes interchanges dictionary and returns a name to id mapping for each interchange in a dictionary
 * Input: 
 *          interchanges - Dictionary: Holds information about interchanges
 * Return: Dictionary 
 */
function getInterchangeNames(interchanges){
    let interchangeNames = {};
    for (let id in interchanges){
        interchangeNames[interchanges[id].name.toLowerCase()] = id;
    }
    return interchangeNames;
}


/**
 * Retrieves the distance between two locations
 * Input: 
 *          interchanges - Dictionary: Holds information about interchanges
 *          interchangeNames - Dictionary: Mapping of names to ids for each interchange
 *          location1 - String: Name of location 1
 *          location2 - String: Name of location 2
 * Return: Double
 */
function getDistance(interchanges, interchangeNames, location1, location2){
    const id1 = interchangeNames[location1.toLowerCase()];
    const id2 = interchangeNames[location2.toLowerCase()];
    let distance = 0
    let currId = id1;
    let currLocation = interchanges[currId];

    while(currId != id2){
        // Setting current location variable for readability
        currLocation = interchanges[currId];

        // Adding distance from current location to next location
        distance += currLocation.routes[0].distance;
        // console.log(currLocation.routes)

        // Setting currId to the next id after distance to next id has been added
        currId = currLocation.routes[0].toId;
    }

    return distance;
}

/** MAIN FUNCTION **/

/**
 * Calculates the cost of the trip between location1 and location2
 * Input: 
 *          location1 - String: Name of location 1
 *          location2 - String: Name of location 2
 * Return: 
 *          Array - [distance, cost]
 */
async function costOfTrip(interchanges, location1, location2){
    let cost = -1;

    // Retrieve values from input boxes if not testing
    if (location1 == "html" || location2 == "html"){
        interchanges = await getInterchanges();   
        try {
            location1 = document.getElementById("location1").value;
            location2 = document.getElementById("location2").value;
        } catch (error) {
            console.log(error);
            displayErrorMessage();
            return cost;
        }
    }

    // Dictionary mapping names to ids, helpful in error checking
    const interchangeNames = getInterchangeNames(interchanges);

    // Checking if location 1 exists in the database
    if(!checkLocation(interchangeNames, location1)){
        displayLocationErrorMessage();
        return cost;
    }

    // Checking if location 2 exists in the database
    if(!checkLocation(interchangeNames, location2)){
        displayLocationErrorMessage();
        return cost;
    }

    const id1 = interchangeNames[location1.toLowerCase()]
    const id2 = interchangeNames[location2.toLowerCase()]
    let distance = 0

    // Ensures the location that comes first is location1 as the algorithm only counts distance going up
    if(id1 < id2){
        distance = getDistance(interchanges, interchangeNames, location1, location2)
    }else{
        distance = getDistance(interchanges, interchangeNames, location2, location1)
    }

    cost = distance*TOLL_RATE
    
    displayDistanceAndCost(distance, cost)
    // document.getElementById("result").textContent = "The cost of the trip is: $" + cost.toFixed(2) + "location 1: "+location1 + "location 2 "+location2;
    return [distance, cost];
}

module.exports = {
   costOfTrip,
   getDistance,
   getInterchangeNames,
   checkLocation
};


