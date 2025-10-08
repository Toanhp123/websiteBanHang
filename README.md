# E-Commerce Website

This is a simple e-commerce website project built to provide a basic and extendable online shopping platform. The project consists of two main parts: **frontend (client)** and **backend (server)**.

## 📦 Technologies Used

-   **Frontend**: React, TypeScript, HTML/CSS
-   **Backend**: Node.js, Express.js
-   **Database**: MongoDB (can be switched to MySQL if needed)
-   **Package Manager**: npm

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Toanhp123/websiteBanHang.git
cd websiteBanHang
```

### 2. Setup Database

Install MySQL and create a database same name as database in file.

Set connection info in .env accordingly.

### 3. Setup Backend

Change cors in Index.js same as host in frontend

```bash
cd server
npm install
```

### 4. Setup Frontend

```bash
cd ../client
npm install
```

### 5. Run the Project

#### Start Backend

```bash
cd server
npm start
```

#### Start Frontend

```bash
cd ../client
npm start
```

Then, open your browser and visit:

```
http://localhost:3000
```

## ⚙️ Features

-   **User Authentication:** Sign up, login, JWT-based sessions
-   **Product Listing:** Browse products, search by name, filter by category
-   **Product Details:** View detailed product information and images
-   **Shopping Cart:** Add, remove, update product quantities
-   **Checkout:** Place orders and view order summary
-   **Order History:** Users can view past orders
-   **Admin Panel:** Add, edit, delete products, view all orders

## 📝 Usage Guide

1. **Sign Up / Login**: Create an account or login with existing credentials.
2. **Browse Products**: Navigate through the homepage to view available products.
3. **Search & Filter**: Use the search bar or category filters to find specific items.
4. **Add to Cart**: Click on products to add them to your shopping cart.
5. **Checkout**: Review your cart and submit your order.
6. **Order History**: Access your profile to see past orders.
7. **Admin Actions** (if logged in as admin): Manage products and orders from the admin dashboard.

## 📝 License

This project is licensed under the MIT License.
