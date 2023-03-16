package trip_calculator.main;
import java.util.HashMap;
import java.util.Map;

public class Calculator {
	private final double TOLL_RATE = 0.25; // Toll rate in dollars/km
    private Map<Integer, Location> locations;
    private Map<String, Integer> interchangeNames;

    public Calculator(Map<Integer, Location> locations) {
        this.locations = locations;
        initializeInterchangeNames();
    }

    private void initializeInterchangeNames() {
        this.interchangeNames = new HashMap<>();
        for (Map.Entry<Integer, Location> entry : this.locations.entrySet()) {
            interchangeNames.put(entry.getValue().getName().toLowerCase(), entry.getKey());
        }
    }

    public double getDistance(String location1, String location2) {
        int id1 = interchangeNames.get(location1.toLowerCase());
        int id2 = interchangeNames.get(location2.toLowerCase());
        double distance = 0;
        int currId = id1;
        Location currLocation = locations.get(currId);

        while (currId != id2) {
            currLocation = locations.get(currId);
            distance += currLocation.getRoutes().get(0).getDistance();
            currId = currLocation.getRoutes().get(0).getToId();
        }

        return distance;
    }

    public double[] costOfTrip(String location1, String location2, boolean verbose) {
        double[] result = new double[2];
        double cost = -1;
        double distance = 0;
       
        if (!interchangeNames.containsKey(location1.toLowerCase()) || !interchangeNames.containsKey(location2.toLowerCase())) {
            if(verbose) {
            	System.out.println("One or both of the locations do not exist in the database.");
            }
            result[0] = -1;
            result[1] = -1;
            return result;
        }

        int id1 = interchangeNames.get(location1.toLowerCase());
        int id2 = interchangeNames.get(location2.toLowerCase());

        if (id1 < id2) {
            distance = getDistance(location1, location2);
        } else {
            distance = getDistance(location2, location1);
        }

        cost = distance * TOLL_RATE;
        
        if(verbose) {
        	System.out.println(String.format("Trip from %s to %s:\nDistance: %.4f km\nCost: $%.2f", location1, location2, distance, cost));
        }
        
        result[0] = distance;
        result[1] = cost;
        return result;
    }
    

}
