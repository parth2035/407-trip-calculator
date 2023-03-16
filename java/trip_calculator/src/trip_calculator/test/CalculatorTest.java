package trip_calculator.test;

// Imports
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.io.BufferedReader;
import java.util.Map;
import java.io.InputStreamReader;
import trip_calculator.main.*;



public class CalculatorTest {
    private Calculator calculator;
    private final double TOLL_RATE = 0.25; // Toll rate in dollars/km
    
    @BeforeEach
    void setUp() {

        // Read the JSON file
        BufferedReader br = new BufferedReader(new InputStreamReader(Thread.currentThread().getContextClassLoader().getResourceAsStream("interchanges.json")));

        // Create Gson instance
        Gson gson = new GsonBuilder().create();

        // Parse JSON file to Java object
        InterchangeData interchangeData = gson.fromJson(br, InterchangeData.class);
        
        Map<Integer, Location> locations = interchangeData.getLocations();
        calculator = new Calculator(locations);
    }

    @Test
    public void testGetDistance() {
        String location1 = "QEW";
        String location2 = "Dundas Street";
        double expectedDistance = 6.062;
        double actualDistance = calculator.getDistance(location1, location2);
        assertEquals(expectedDistance, actualDistance, 0.001, "The distance should be equal to the expected distance");
    }

    @Test
    public void testGetDistance2() {
        String location1 = "QEW";
        String location2 = "Highway 401";
        double expectedDistance = 35.012;
        double actualDistance = calculator.getDistance(location1, location2);
        assertEquals(expectedDistance, actualDistance, 0.001, "The distance should be equal to the expected distance");
    }
    
    @Test
    public void testCostOfTrip() {
        String location1 = "QEW";
        String location2 = "Dundas Street";
        double expectedDistance = 6.062;
        double expectedCost = expectedDistance * TOLL_RATE;

        double[] actualResult = calculator.costOfTrip(location1, location2, false);
        assertEquals(expectedDistance, actualResult[0], 0.001, "The distance should be equal to the expected distance");
        assertEquals(expectedCost, actualResult[1], 0.001, "The cost should be equal to the expected cost");
    }
    
    @Test
    public void testCostOfTrip2() {
        String location1 = "Highway 401";
        String location2 = "QEW";
        double expectedDistance = 35.012;
        double expectedCost = expectedDistance * TOLL_RATE;

        double[] actualResult = calculator.costOfTrip(location1, location2, false);
        assertEquals(expectedDistance, actualResult[0], 0.001, "The distance should be equal to the expected distance");
        assertEquals(expectedCost, actualResult[1], 0.001, "The cost should be equal to the expected cost");
    }
}
