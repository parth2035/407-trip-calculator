// Import the necessary libraries
const jsdom = require("jsdom");
const interchanges = require("../data/interchanges.json").locations;
const { JSDOM } = jsdom;
// Create a fake HTML page
const { document } = new JSDOM(`<!DOCTYPE html>
  <html>
    <head>
      <title>Trip Calculator</title>
      <link rel="shortcut icon" href="./images/favicon.ico?">
      <link rel="stylesheet" type="text/css" href="./css/index.css">
      <script src="./js/trip-calculator.js"></script>
    </head>
    <body>
        <form>
        <h1>407 Trip Calculator</h1>
        <label for="location1">Location 1:</label>
        <input type="text" id="location1" name="location1" required>
        <br>
        <label for="location2">Location 2:</label>
        <input type="text" id="location2" name="location2" required>
        <br>
        <button type="button" onclick="costOfTrip('html','html')">Calculate Cost</button>
        <h6>
          Note: This code assumes there is always a path from location 1 to location 2 if they both exist
        </h6>
      </form>
      <p id="result"></p>
    </body>
  </html>`).window;

// Set the global document object
global.document = document;


const { 
    costOfTrip,
    getDistance,
    getInterchangeNames,
    checkLocation
} = require("../js/trip-calculator.js")

const interchangeNames = getInterchangeNames(interchanges);

/** costOfTrip function testing **/

test('Checking distance of trip from QEW to Highway 401 from costOfTrip function', async () => {
    const costDistArr = await costOfTrip(interchanges, "QEW", "Highway 401");
    expect(costDistArr[0].toFixed(4)).toBe("35.0120")
})

test('Checking distance of trip from Highway 401 to QEW from costOfTrip function', async () => {
    const costDistArr = await costOfTrip(interchanges, "Highway 401", "QEW");
    expect(costDistArr[0].toFixed(4)).toBe("35.0120")
})

test('Checking distance of trip from QEW to QEW from costOfTrip function', async () => {
    const costDistArr = await costOfTrip(interchanges, "QEW", "QEW");
    expect(costDistArr[0].toFixed(4)).toBe("0.0000")
})

test('Checking cost of trip from QEW to Highway 401', async () => {
    const costDistArr = await costOfTrip(interchanges, "QEW", "Highway 401");
    expect(costDistArr[1].toFixed(2)).toBe("8.75")
})

test('Checking cost of trip from Highway 401 to QEW', async () => {
    const costDistArr = await costOfTrip(interchanges, "Highway 401", "QEW");
    expect(costDistArr[1].toFixed(2)).toBe("8.75")
})

test('Checking cost of trip from QEW to QEW', async () => {
    const costDistArr = await costOfTrip(interchanges, "QEW", "QEW");
    expect(costDistArr[1].toFixed(2)).toBe("0.00")
})

/** getDistance function testing **/

test('Checking distance of trip from QEW to Highway 401 from getDistance function', async () => {
    const distance = await getDistance(interchanges, interchangeNames, "QEW", "Highway 401");
    expect(distance.toFixed(4)).toBe("35.0120")
})

test('Checking distance of trip from Sideline 22 to Salem Road from getDistance function', async () => {
    const distance = await getDistance(interchanges, interchangeNames, "Sideline 22", "Salem Road");
    expect(distance.toFixed(4)).toBe("7.3130")
})

// Expects to throw since it only counts up
test('Checking distance of trip from Highway 401 to QEW from getDistance function', async () => {
    expect(() => getDistance(interchanges, interchangeNames, "Highway 401", "QEW")).toThrow();
})

/** checkLocation function testing **/

test('Checking existance of location Salem Road', async () => {
    const locationExists = await checkLocation(interchangeNames, "Salem Road");
    expect(locationExists).toBe(true);
})

test('Checking non-existance of location 407 ETR', async () => {
    const locationExists = await checkLocation(interchangeNames, "407 ETR");
    expect(locationExists).toBe(false);
})