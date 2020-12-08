# React shopping cart
The website shoppingcart is developed using MERN stack. React for front end, MongoDB for backend. Application is responsive to different screen size resolutions.

## Functionality. 
On landing page, available products are listed with empphasis on the pictures. Products are displayed in responsive grid. Number of products displayed in a row is responsive to screen size. Hovering over each picture bring focus to that product and animates the picture size.

Clicking on the picture opens a modal with detailed explaination of the product, available sizes and picture and price. Clicking outside/x button closes the window. Clicking on Add to shopping cart adds it to the cart.

Products can be sorted by price in descending/ascending order. Products can also be filtered by available sizes. Sort and filter work together.

Clicking Add to Cart button for a products adds it to the shoppint cart.

Shoppingcart icon at the top header is updated with the count of products added till now. All shopping cart information is stored in sessionStorage. So refreshing the page will not clear the shopping cart.

Clicking on the shopping cart icon displays individual product quantity, price, subtotal for product and total price of the order. User can remove items from shopping cart by clicking remove icon. Clicking on Proceed button, expands the cart modal and fields for customer name, address and card details are displayed. These fields are mandatory and field checks are implemented. When clicked on Submit, order is sent to backend and order is saved in the backend MongoDB. Each order has unique identifier, along with customer details and products details and total price. As a confirmation to user, the order submitted is displayed in modal popup.

### Login
Login is implemented using Google login. The application identifies if a new user is logged in or returning customer.

### Profile page for logged in user.
Logged in user can add up to 6 addresses. Reference name, address along with zipcode can be added. Each address can be verified using USPS postal API. Addres verification status is notified on the address card using appropriate icons.
User can delete, edit addresses. 
User can also save one of the address as favorites. Favorite address is color coded and also icon is updated.
