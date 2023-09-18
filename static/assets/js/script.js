// Function to initialize the map
function initMap() {
    // Replace 'map' with the ID of the div where you want to display the map
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {  lat: 34.707130, lng: 33.022617},
        zoom: 2 , // Adjust the initial zoom level as needed
    });
 
    // Event listener to update the map when the country dropdown changes
    document.getElementById('country').addEventListener('change', function () {
        var selectedCountry = this.value;
        // You can use selectedCountry to fetch and populate the city dropdown
        // Here, we'll just set a default city for demonstration purposes
        var selectedCity = 'defaultCity';
        updateMap(selectedCity);
    });
}
// Define city data for different countries
const cityData = {
    Cyprus: ["Limassol", "Nicosia", "Larnaca", "Paphos", "kyrenia"],
    // Add more countries and cities as needed
};

// Function to populate the city dropdown based on the selected country
function populateCities() {
// Get the selected country value
const selectedCountry = document.getElementById("country").value;

// Get the city dropdown element
const cityDropdown = document.getElementById("city");

// Clear existing city options
cityDropdown.innerHTML = "";

// Populate city options based on the selected country
const cities = cityData[selectedCountry];
if (cities) {
    cities.forEach((city) => {
        const option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        cityDropdown.appendChild(option);
    });
} else {
    const option = document.createElement("option");
    option.textContent = "Select a country first";
    cityDropdown.appendChild(option);
}
}

// Initial population of cities when the page loads
populateCities();


    // Define location data for different countries and cities
        const locationData = {
            Cyprus: {
                "Limassol": { lat: 34.707130, lng: 33.022617 },
                "Kirklar": { lat: 35.14143626865848, lng: 33.50644000730356 },  
                "Agros": { lat: 34.91089885388734, lng: 32.9983223411105 }, 
                "Nicosia": { lat: 35.18746568131545, lng: 33.36911090833246 }, 
                "Peyia": { lat: 34.88837261065296,  lng: 32.396820887617096 }, 
            },
            // Add more countries and cities as needed
        };

        // Function to update the map based on the selected country and city
        function updateMap() {
            const selectedCountry = document.getElementById("country").value;
            const selectedCity = document.getElementById("city").value;
            const mapContainer = document.getElementById("map");

            // Check if the selected country and city are valid
            if (locationData[selectedCountry] && locationData[selectedCountry][selectedCity]) {
                const location = locationData[selectedCountry][selectedCity];
                
                // Create a new map centered on the selected location
                const map = new google.maps.Map(mapContainer, {
                    center: location,
                    zoom: 13, // Adjust the zoom level as needed
                });

                // Add a marker at the selected location
                new google.maps.Marker({
                    position: location,
                    map: map,
                    title: selectedCity,
                });
            } else {
                // Display a message when the selected country or city is not valid
                mapContainer.innerHTML = "Invalid selection. Please choose a valid country and city.";
            }
        }
    // Initialize an empty array to store selected locations
        const selectedLocations = [];
 
        // Create a marker for a location and add it to the map
        function addMarkers(locations) {
            locations.forEach(location => {
                const marker = new google.maps.Marker({
                    position: location,
                    map: map, // Assuming 'map' is a global variable referencing your Google Map
                    title: selectedCity,
                });
            // Add a click event listener to the marker
            marker.addListener("click", () => {
                // Check if the location is already selected
                if (!selectedLocations.includes(location)) {
                    selectedLocations.push(location);
                    updateSelectedLocationsList();
                }
            });
        });
    }
        // Update the list of selected locations
        function updateSelectedLocationsList() {
        const locationList = document.getElementById("location-list");
        locationList.innerHTML = "";

        selectedLocations.forEach((location, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = `Location ${index + 1}: Lat ${location.lat()}, Lng ${location.lng()}`;
            locationList.appendChild(listItem);
        });
        }
        //// Usage
        const specificLocations = [
            { lat: 34.707130, lng: 33.022617 },
            { lat: 35.14143626865848, lng: 33.50644000730356 },  
            { lat: 34.91089885388734, lng: 32.9983223411105 }, 
            { lat: 35.18746568131545, lng: 33.36911090833246 }, 
            { lat: 34.88837261065296,  lng: 32.396820887617096 }, 
        // Add more locations as needed
        ];

        // Call the function to add markers to specific locations
        addMarkers(specificLocations);