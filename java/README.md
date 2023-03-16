# 407 ETR Trip Calculator - Java Version

The Java version of the 407 ETR Trip Calculator is a desktop application that calculates the cost of a trip between two locations on the 407 ETR toll road in Ontario, Canada.

## Getting Started

To use the Java version of the 407 ETR Trip Calculator, simply open the project in Eclipse and run the Main.java file. 

### Prerequisites

- Eclipse IDE with JavaSE-17 installed
- Java 17 or later

### Dependencies

The Java version of the 407 ETR Trip Calculator has the following dependencies:

- Gson (included as `gson-2.6.2.jar` in the `lib/` folder)
- JUnit 5 (for testing)

### Importing the Project in Eclipse

1. Open Eclipse IDE.
2. Click File > Import.
3. Choose General > Existing Projects into Workspace and click Next.
4. Click the Browse button next to the Select root directory: field and navigate to the `java/trip_calculator` folder containing the project.
5. Ensure the project is selected in the Projects: list and click Finish.

### Adding Dependencies in Eclipse

1. Right-click the project in the Package Explorer and select Build Path > Configure Build Path....
2. Click the Libraries tab.
3. Click Add External JARs (In Classpath) and navigate to the `lib/` folder in the project directory.
4. Select the `gson.jar` file and click Open.
5. For JUnit 5, click Add Library (In Classpath), select JUnit, click Next, choose JUnit 5, and click Finish.
6. Click Apply and Close to save the changes.

### Running the Application

1. In the Package Explorer, expand the project and locate the main class (`Main.java`).
2. Right-click the main class and select Run As > Java Application.
3. Interact with the calculator through the console.

### Running the Tests

1. In the Package Explorer, locate the test class (`TripCalculatorTest.java`).
2. Right-click the test class and select Run As > JUnit Test.

## Built With

- Java 17
- Gson for JSON parsing and handling
- JUnit 5 for automated testing
