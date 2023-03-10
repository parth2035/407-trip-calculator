# 407 Trip Calculator

The 407 Trip Calculator is a web application that calculates the cost of a trip between two locations on the 407 ETR toll road in Ontario, Canada.

## Getting Started

To use the 407 Trip Calculator, simply enter the names of the two locations (must be in data/interchanges.json) you wish to travel between and click the "Calculate Cost" button. The application will calculate the distance traveled and the cost of the trip.

### Prerequisites

The 407 Trip Calculator requires a web browser with JavaScript enabled. 

### Installing

To install the 407 Trip Calculator, clone the repository from GitHub and run the following commands to install the development dependencies:

npm install --dev

You also need to install the `http-server` package to view the frontend using the following command:

npm install http-server -g

### Running the tests

The 407 Trip Calculator uses jest unit tests to ensure that it functions correctly. To run the tests, run the following command from the root directory:

npm test

### Running the application

To start the application, navigate to the project directory and run the following command:

http-server -c-1

## Built With

- HTML, CSS, and JavaScript for the user interface
- JSON for storing the location and distance data
- Jest for automated testing


