**🛍️ ShoppyGlobe – E-Commerce Web Application**
⚡ Overview

ShoppyGlobe is a modern, responsive, single-page e-commerce web application built using React, Redux Toolkit, React Router, and Bootstrap 5.
It features product listings, detailed product views, an interactive shopping cart, a checkout flow, and a stylish dark-theme neon UI.

The app demonstrates:

Dynamic routing with lazy loading for performance.

Centralized state management via Redux Toolkit.

Reusable components and consistent dark-mode design.

Clean animations and toast notifications for better UX.

**🚀 Tech Stack**
Technology	Purpose
React + Vite	Frontend framework and build tool
React Router DOM	Routing between pages
Redux Toolkit	State management (cart, products, etc.)
Bootstrap 5 + Bootstrap Icons	UI components and grid system
Custom CSS	Neon dark theme and responsive styles

**🗂️ Project Structure**
shoppyglobe/
│
├── src/
│   ├── features/
│   │   └── cartSlice.js           # Redux slice for cart state
│   ├── pages/
│   │   ├── Header.jsx             # Navbar component
│   │   ├── productPages/
│   │   │   ├── ProductList.jsx    # Product listing page
│   │   │   └── ProductDetails.jsx # Individual product details page
│   │   ├── cartPages/
│   │   │   ├── Cart.jsx           # Main cart page with checkout
│   │   │   └── CartDetails.jsx    # Edit item quantity and view details
│   │   └── unknownPages/
│   │       └── NotFound.jsx       # 404 page for invalid routes
│   ├── App.jsx                    # Main routing and lazy loading
│   ├── index.css                  # Global dark theme + neon styles
│   └── main.jsx                   # React entry point
│
└── package.json

**🧭 Page Descriptions**
**🏠 ProductList Page (/)**

Displays all products in responsive cards with images, price, and title.
Each card includes:

View Details button → navigates to product details.
![Home page](src/assets/Screenshot%202025-11-12%20194242.png)

Add to Cart button → adds item using Redux.
Features include text trimming, hover glow effects, and a consistent dark background.

**📄 ProductDetails Page (/product/:id)**

Shows detailed product information for a selected item:

Large image preview

Description, price, and category

Add-to-Cart button with feedback toast message

Neon-themed buttons and responsive layout
![Product details](src/assets/Screenshot%202025-11-12%20194320.png)

**🛒 Cart Page (/cart)**

Displays all cart items dynamically from Redux state.
Each item card shows:

Title, quantity, thumbnail, and total price

Buttons for “Remove” and “View Details”

Includes:

Clear Cart and Place Order buttons
![Cart](src/assets/Screenshot%202025-11-12%20194447.png)
Customer details form with validation
![Personal Details](src/assets/Screenshot%202025-11-12%20194545.png)
Order Summary on successful placement
![alt text](src/assets/Screenshot%202025-11-12%20194558.png)

**📦 CartDetails Page (/cart-details/:id)**

Allows user to:

Adjust item quantity interactively

Update cart with confirmation toast

View product image, title, description, and total cost

Styled with clean glowing card layout and responsive design
![alt text](src/assets/Screenshot%202025-11-12%20194619.png)

**🚫 NotFound Page (*)**

Custom 404 error page with:

Animated glowing “404” number

Subtle neon text and shadow effects

“Back to Home” glowing button

Fully responsive full-screen layout
![alt text](src/assets/Screenshot%202025-11-12%20195731.png)

**🎨 UI & Theme Highlights**

Dark Neon Aesthetic: black background with glowing cyan elements.

Animated Toasts: top-centered, fixed glowing notification messages.

Custom Buttons: glowing borders, hover highlights, and rounded edges.

Smooth Animations: fade-in and slide transitions on page load.

**⚙️ Setup & Installation**

1️⃣ Clone the repository

git clone https://github.com/anistars/shoppyglobe-e-commerce-application.git

cd shoppyglobe-e-commerce-application

2️⃣ Install dependencies

npm install

3️⃣ Run the app

npm run dev

The app will start on http://localhost:5173