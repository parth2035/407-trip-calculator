package trip_calculator.main;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.Map;
import java.io.InputStreamReader;


public class Main {

	// Have function costOfTrip, return cost and distance
	
	public static void main(String[] args) throws IOException {
		// TODO Auto-generated method stub
		

        // Read the JSON file
        BufferedReader br = new BufferedReader(new InputStreamReader(Thread.currentThread().getContextClassLoader().getResourceAsStream("interchanges.json")));

        // Create Gson instance
        Gson gson = new GsonBuilder().create();

        // Parse JSON file to Java object
        InterchangeData interchangeData = gson.fromJson(br, InterchangeData.class);

        // Print the data
        Map<Integer, Location> locations = interchangeData.getLocations();
        for (Map.Entry<Integer, Location> entry : locations.entrySet()) {
            System.out.println(entry.getKey() + " - " + entry.getValue().getName());
        }

        // Create Calculator instance
        Calculator calculator = new Calculator(locations);
        
        // Read user input
        BufferedReader userInput = new BufferedReader(new InputStreamReader(System.in));
        String location1, location2;

        while (true) {
            System.out.println("Enter the first location (or 'exit' to quit): ");
            location1 = userInput.readLine();
            if (location1.equalsIgnoreCase("exit")) {
                break;
            }

            System.out.println("Enter the second location (or 'exit' to quit): ");
            location2 = userInput.readLine();
            if (location2.equalsIgnoreCase("exit")) {
                break;
            }

            // Call costOfTrip and display the result
            System.out.println();
            calculator.costOfTrip(location1, location2, true);
            System.out.println();

        }
	
	}

}
