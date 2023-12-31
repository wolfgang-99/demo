// Define a global map variable
var map;

// Function to initialize the map
function initMap() {
    // Replace 'map' with the ID of the div where you want to display the map
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 34.707130, lng: 33.022617 },
        zoom: 9, // Adjust the initial zoom level as needed
    });
}

// Define city data for different countries
const cityData = {
    Cyprus: ["Limassol", "Nicosia", "Larnaca", "Paphos", "Kyrenia"],
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

    // Add the default "Select City First" option
    const defaultOption = document.createElement("option");
    defaultOption.disabled = true;
    defaultOption.selected = true;
    defaultOption.textContent = "Select City";
    cityDropdown.appendChild(defaultOption);

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
        defaultOption.textContent = "Select a Country First";
        cityDropdown.appendChild(defaultOption);
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
        "Peyia": { lat: 34.88837261065296, lng: 32.396820887617096 },
    },
    // Add more countries and cities as needed
};

// Function to update the map based on the selected country and city
function updateMap() {
    const selectedCountry = document.getElementById("country").value;
    const selectedCity = document.getElementById("city").value;

    // Check if the selected country and city are valid
    if (locationData[selectedCountry] && locationData[selectedCountry][selectedCity]) {
        const location = locationData[selectedCountry][selectedCity];

        // Set the center and zoom of the existing map
        map.setCenter(location); // Update the existing map
        map.setZoom(10); // Adjust the zoom level as needed

        // Add a marker at the selected location
        new google.maps.Marker({
            position: location,
            map: map,
            title: selectedCity,
        });
    }
}


