# React shopping cart
The website shoppingcart is developed using MERN stack. React for front end, MongoDB for backend. Application is responsive to different screen size resolutions.

## Modules. 

### Landing page.
On landing page, available products are listed with empphasis on the pictures. Products are displayed in responsive grid. Number of products displayed in a row is responsive to screen size. Hovering over each picture bring focus to that product and animates the picture size.

Clicking on the picture opens a modal with detailed explaination of the product, available sizes and picture and price. Clicking outside/x button closes the window. Clicking on Add to shopping cart adds it to the cart.

Products can be sorted by price in descending/ascending order. Products can also be filtered by available sizes. Sort and filter work together.

### Shopping cart.
Clicking Add to Cart button for a products adds it to the shoppint cart.

Shoppingcart icon at the top header is updated with the count of products added till now. All shopping cart information is stored in sessionStorage. So refreshing the page will not clear the shopping cart.

Clicking on the shopping cart icon displays individual product quantity, price, subtotal for product and total price of the order. User can remove items from shopping cart by clicking remove icon. Clicking on Proceed button, expands the cart modal and fields for customer name, address and card details are displayed. These fields are mandatory and field checks are implemented. When clicked on Submit, order is sent to backend and order is saved in the backend MongoDB. Each order has unique identifier, along with customer details and products details and total price. As a confirmation to user, the order submitted is displayed in modal popup.

### Login
Login is implemented using Google login. The application identifies if a new user is logged in or returning customer.

### Profile page for logged in user.
Logged in user can add up to 6 addresses. Reference name, address along with zipcode can be added. Each address can be verified using USPS postal API. Addres verification status is notified on the address card using appropriate icons.
User can delete, edit addresses. Tooltip for all the icons are animated. Tooltips are implemented using CSS only.
Address page field validation is implemented.
User can also save one of the address as favorites. Favorite address is color coded and also icon is updated.

### Admin Module
Clicking Admin button at the top header opens up Admin Module. It lists all active orders in MongoDB backend. Orders ID, Customer details and order details are listed in tabular format.
Each row of the table contains details of an order. Rows are alternate colored with primary color border. Individual order can be deleted by clicking del button. Confirmation message is displayed to the user.

Table in the Admin module is wide. It is responsive to screen size. At 1100px break point, the table format changes with each order is split accross multiple rows to make table vertical. At 650px break point i.e. for mobile screens, the product details are removed to fit in most important content needed for Admin module.
