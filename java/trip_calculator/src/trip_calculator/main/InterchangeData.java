package trip_calculator.main;

import java.util.Map;

public class InterchangeData {
    private Map<Integer, Location> locations;

    public Map<Integer, Location> getLocations() {
        return locations;
    }

    public void setLocations(Map<Integer, Location> locations) {
        this.locations = locations;
    }
}
