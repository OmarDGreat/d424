E-Commerce Application
======================

Introduction
------------

This is a full-stack e-commerce application designed to provide a seamless shopping experience. The application allows users to browse products, add items to the cart, place orders, and track their purchases.

The project includes:

-   A React-based frontend for a dynamic and interactive user interface.
-   A Node.js/Express backend with MongoDB for data storage.
-   Industry-standard security features like JWT authentication.

* * * * *

Setup Guide
-----------

1.  **Install Dependencies**

    Backend:

    -   Navigate to the backend folder: `cd backend`
    -   Install dependencies: `npm install`

    Frontend:

    -   Navigate to the frontend folder: `cd ../frontend`
    -   Install dependencies: `npm install`
2.  **Set Up Environment Variables**

    Backend:

    -   Create a `.env` file in the `backend` folder with the following:
        -   `PORT=5000`
        -   `MONGO_URI=<your_mongodb_connection_string>`
        -   `JWT_SECRET=<your_secret_key>`

    Frontend:

    -   Create a `.env` file in the `frontend` folder with:
        -   `VITE_API_URL=http://localhost:5000`
3.  **Seed the Database**

    -   Navigate to the backend folder: `cd backend`
    -   Seed initial data: `npm run seed`
4.  **Start the Application**

    Backend:

    -   Start the backend server: `npm start`

    Frontend:

    -   Navigate to the frontend folder: `cd ../frontend`
    -   Start the frontend application: `npm run dev`
5.  **Access the Application**

    -   Open the application in your browser at `http://localhost:5173`

* * * * *

User Guide
----------

1.  **Accessing the Application**

    -   Visit the deployed application URL:
        -   Example: `https://my-ecommerce-app.com`
2.  **Features Overview**

    -   **Browse Products**

        -   View all available products on the homepage.
        -   Use the search bar to find specific items.
    -   **View Product Details**

        -   Click on a product to view its details, such as price, description, and stock.
    -   **Add to Cart**

        -   Select a quantity and click "Add to Cart" on the product details page.
    -   **Place an Order**

        -   Go to the cart, review your items, and click "Checkout."
        -   Fill in:
            -   Shipping address
            -   Payment method
        -   Confirm the order.
    -   **Track Orders**

        -   Log in to your account.
        -   Navigate to "My Orders" to view your order history, including:
            -   Order ID
            -   Total price
            -   Order status (e.g., Delivered, Pending)
    -   **Account Management**

        -   Sign up for an account or log in.
        -   Update your profile details like name, email, and password.
3.  **Tips for Best User Experience**

    -   Account Required: Log in or sign up to place orders.
    -   Search Functionality: Use the search bar for easy product discovery.
    -   Order Review: Double-check your cart items before placing an order.