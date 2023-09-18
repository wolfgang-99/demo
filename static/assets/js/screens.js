 const locationInfo = {
    'Limassol': [
        {
            location: 'Spyrou Kyprianou Ave 135, Limassol 3083, Cyprus',
            screen: 'Screen A',
            image: '../static/assets/images/shell.jpg',
            package: null, // To store the selected package
            cost: 0 // To store the calculated cost
        },
        {
            location: 'P24G+J2C, Agias Filaxeos, Limassol 3116, Cyprus',
            screen: 'Screen B',
            image: '../static/assets/images/petrolina.png',
            package: null,
            cost: 0
        },
        {
            location: 'Arch. Makarios III Avenue 162, Limassol 3026, Cyprus',
            screen: 'Screen C',
            image: '../static/assets/images/eko.jpg',
            package: null,
            cost: 0
        },
        {
            location: 'Kato Polemidia 4154, Cyprus',
            screen: 'Screen D',
            image: '../static/assets/images/eko.jpg',
            package: null,
            cost: 0
        },
        {
            location: 'Agias Zonis 14, Limassol 3027, Cyprus',
            screen: 'Screen E',
            image: '../static/assets/images/esso.jpg',
            package: null,
            cost: 0
        },
        // Add more screen details as needed
    ],
};


// Define package prices
const productPrices = {
    '24Hours': 3.99,
    '7Days': 24.99,
    '30Days': 99.99
};

// Cart data
const cartItems = [];

// Function to populate the location list based on the selected city
function populateLocationList() {
    const cityDropdown = document.getElementById('city');
    const citySelected = cityDropdown.value;
    const locationList = document.getElementById('locationList');
    locationList.innerHTML = ''; // Clear the existing list
    if (locationInfo[citySelected]) {
        locationInfo[citySelected].forEach(screen => {
            const listItem = createListItem(screen);
            locationList.appendChild(listItem);
        });
    } else {
        const listItem = document.createElement('li');
        listItem.textContent = 'No screens available for the selected city.';
        locationList.appendChild(listItem);
    }
}

// Function to create a list item for a screen
function createListItem(screen) {
    const listItem = document.createElement('li');

    // Create an image element
    const image = document.createElement('img');
    image.src = screen.image;
    image.style.maxWidth = '30px'; // Adjust image size as needed

    // Create a div for details
    const detailsDiv = document.createElement('div');
    detailsDiv.innerHTML = `
        <h4 id="screen">${screen.screen}</h4>
        <p><strong>Location:</strong> ${screen.location}</p>
    `;

    listItem.appendChild(image);
    listItem.appendChild(detailsDiv);

    // Add a click event listener to the list item
    listItem.addEventListener('click', () => showPackageModal(screen));

    return listItem;
}

// Function to show the package modal for a specific screen
function showPackageModal(screen) {
    // Clear any previous selections in the modal
    document.getElementById('set24Hours').classList.remove('active');
    document.getElementById('set7Days').classList.remove('active');
    document.getElementById('set30Days').classList.remove('active');
    // Event listener for selecting a package
    const packageButtons = document.querySelectorAll('.package-btn');
    packageButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedPackage = button.dataset.package;
            selectPackage(screen, selectedPackage); // Assign the selected package to the screen
            calculateCost(screen); // Calculate the cost based on the selected package
            displayCart(); // Update the cart
            $('#packagesModal').modal('hide'); // Close the modal
            console.log("Screen object before selecting a package:", screen);
        });
    });
    // Add the screen to cartItems
    cartItems.push(screen);

    // Show the modal
    $('#packagesModal').modal('show');
}

// Function to select a package for a screen
function selectPackage(screen, packageName) {
    screen.package = packageName;
}

// Function to calculate the cost for a screen based on the selected package
function calculateCost(screen) {
    const packageName = screen.package;
    if (packageName && productPrices[packageName]) {
        screen.cost = productPrices[packageName];
    }
}

// Function to create a cart item element for a screen
function createCartItemElement(screen) {
    const cartItem = document.createElement('li');
    cartItem.classList.add('col-md-3'); // Add Bootstrap classes

    // Create an image element for the screen
    const image = document.createElement('img');
    image.src = screen.image;
    image.style.maxWidth = '30px'; // Adjust image size as needed

    // Create a text element for the screen name
    const screenName = document.createElement('span');
    screenName.textContent = screen.screen;

    // Display the selected package and cost for each screen
    const packageDisplay = document.createElement('p');
    packageDisplay.textContent = `Package: ${screen.package}`;

    const costDisplay = document.createElement('p');
    costDisplay.textContent = `Cost: £${screen.cost}`;

    cartItem.appendChild(image);
    cartItem.appendChild(screenName);
    cartItem.appendChild(packageDisplay);
    cartItem.appendChild(costDisplay);

    return cartItem;
}

// Function to display the cart
function displayCart() {
    const cart = document.getElementById('cart');
    console.log(cartItems);
    cart.innerHTML = '';

    cartItems.forEach(screen => {
        const cartItem = createCartItemElement(screen);
        cart.appendChild(cartItem);
    });

    // Add a Bootstrap-styled "Next" button
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Checkout';
    nextButton.id = 'nextButton';
    nextButton.classList.add('btn', 'btn-primary'); // Add Bootstrap classes

    cart.appendChild(nextButton);

    // Add a click event listener to the "Next" button to open a modal
    nextButton.addEventListener('click', () => {
        $('#calendarModal').modal('show'); // Open the Bootstrap modal
    });
    // Function to transfer cart items to cart.html
    function transferCartItemsToCartHtml() {
        // Store cart items in localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        console.log(cartItems);
        // Redirect to cart.html
        window.location.href = '/cart';
    }

    // Event handler for the "Next" button
    document.getElementById('continueButton').addEventListener('click', () => {
        transferCartItemsToCartHtml();
    });

}


// Event listener for the city dropdown to update the location list
const cityDropdown = document.getElementById('city');
console.log("City Dropdown: ", cityDropdown);
cityDropdown.addEventListener('change', populateLocationList);

// Initial population of the location list
populateLocationList();
