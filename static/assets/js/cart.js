document.addEventListener('DOMContentLoaded', function () {
    // Retrieve cart items from localStorage
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));

    // Get the cart element where items will be displayed
    const cart = document.getElementById('cart');

    // Get elements for the summary
    const totalScreensElement = document.getElementById('totalScreens');
    const totalPriceElement = document.getElementById('totalPrice');

    // Initialize total screens and total price
    let totalScreens = 0;
    let totalPrice = 0;

    // Function to create a cart item element
    function createCartItemElement(item) {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');

        const image = document.createElement('img');
        image.src = item.image; // Update with the actual image source
        image.alt = `Product ${item.screen}`;

        const itemDetailsDiv = document.createElement('div');
        itemDetailsDiv.classList.add('item-details');

        const screenName = document.createElement('h4');
        screenName.textContent = item.screen;

        const price = document.createElement('p');
        price.textContent = `Price: £${item.cost.toFixed(2)}`;

        const packageInfo = document.createElement('p');
        packageInfo.textContent = `Package: ${item.package}`;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('btn', 'btn-danger', 'btn-sm');
        // Add an event listener to the "Remove" button
            removeButton.addEventListener('click', () => {
                removeFromCart(item);
                // Remove the cart item element from the DOM
                cartItemDiv.remove();
            });

        itemDetailsDiv.appendChild(screenName);
        itemDetailsDiv.appendChild(price);
        itemDetailsDiv.appendChild(packageInfo);
        itemDetailsDiv.appendChild(removeButton);

        cartItemDiv.appendChild(image);
        cartItemDiv.appendChild(itemDetailsDiv);

        return cartItemDiv;
    }

    // Function to update the cart display
    function updateCartDisplay() {
        cart.innerHTML = ''; // Clear the cart
        totalScreens = 0;
        totalPrice = 0;

        if (storedCartItems && storedCartItems.length > 0) {
            storedCartItems.forEach((item) => {
                const cartItemElement = createCartItemElement(item);
                cart.appendChild(cartItemElement);

                // Update total screens and total price
                totalScreens++;
                totalPrice += item.cost;
            });
        } else {
            const emptyCartMessage = document.createElement('p');
            emptyCartMessage.textContent = 'Your cart is empty.';
            cart.appendChild(emptyCartMessage);
        }

        // Update the total screens and total price in the summary
        totalScreensElement.textContent = totalScreens;
        totalPriceElement.textContent = totalPrice.toFixed(2);
    }

    // Initial cart display
    updateCartDisplay();

    // Get the "Checkout" button
    const checkoutButton = document.querySelector('.btn-checkout');

    // Add a click event listener to the "Checkout" button
    checkoutButton.addEventListener('click', function () {
        if (totalScreens === 0) {
            alert('Error: There are no screens in your cart. Add screens to proceed.');
        } else {
            $('#paymentMethods').modal('show');
            console.log(checkoutButton);
        }
    });

    // Function to remove an item from the cart
    function removeFromCart(item) {
//    // Example: assuming you have a storedCartItems array in localStorage
//    const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
//
//    if (!storedCartItems) {
//        return;
//    }

    // Filter out the item to be removed
//    const updatedCartItems = storedCartItems.filter((cartItem) => cartItem.id !== item.id);

    // Update localStorage with the updated cart items
//    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

    // Call updateCartDisplay() to refresh the cart display
//    updateCartDisplay();
}
});
