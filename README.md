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
Login is implemented using Google login. The application identifies if a new user is logged in or returning customer. react-google-login library is used.

### Profile page for logged in user.
#### Address
Logged in user can add up to 6 addresses. Reference name, address along with zipcode can be added. 

1. Verification via USPS. Each address can be verified using USPS postal API. Addres verification status is notified on the address card using appropriate icons.
2. Delete address: Address can be deleted clicking trash icon on the address card.
3. Edit Address: Clicking on the edit icon opens up edit section with the address pre-populated. User can edit and click on save. Editing an address also resets address verification status.
4. Favorite address: User can make any single address favorite by clicking the fav icon. When clicked color of the address card changes in animated (delay) mode.
5. Tooltip: Each icon has tooltip implemented. Tooltip is implemented using CSS only. Tooltip opens up in appropriate position.
6. Add address: If there are less than 6 addresses, user can click + button to open new address section to add new address. If there are 6 addresses already + button is not disaplyed.

#### Cards
Similar to addresses, user can save upto 6 cards.
Except for verification it has same functionality of address.

### Admin Module
Clicking Admin button at the top header opens up Admin Module. It lists all active orders in MongoDB backend. Orders ID, Customer details and order details are listed in tabular format.
Each row of the table contains details of an order. Rows are alternate colored with primary color border. Individual order can be deleted by clicking del button. Confirmation message is displayed to the user.

Table in the Admin module is wide. It is responsive to screen size. At 1100px break point, the table format changes with each order is split accross multiple rows to make table vertical. At 650px break point i.e. for mobile screens, the product details are removed to fit in most important content needed for Admin module.

## Technology
### react
React 16.3 is used for front end development. Modal window and drop down menu are implemented in Higher Order Component pattern for reusability. 

### css
CSS module is used. Every module has a seperate CSS page. While rendering class names of HTML elements are auto generated. Animation, transition are also implemented.
tooltips are implemented in CSS only.

### MongoDB.
For backend mongodb is used. MongoDB Cloud atlas account is created. Product details, order details and user details are stored in DB. All CRUD operations are performed in this application.

### Express.
Express app is used for the route and other middle wares it provides. Also it makes it easier to create schema, model using Express.

### Node.js
Node is used for run time environment for server side scripting.
