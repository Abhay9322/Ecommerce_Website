# 🛒 Ecommerce Website (MERN Stack)

This is a complete **Ecommerce Website** built using the **MERN stack (MongoDB, Express, React, Node.js)**. It includes an admin panel, product listings, cart system, secure authentication, and order management.

---

## 📁 Folder Structure

Ecommerce-Website/
├── admin/ → Admin dashboard for managing products & orders
├── backend/ → Node.js + Express API (MongoDB, JWT, Bcrypt)
├── frontend/ → React.js frontend for customer-facing ecommerce store



---

## 🚀 Key Features

- 🔐 User Authentication (JWT)
- 🛍️ Product Listing & Details
- 🛒 Shopping Cart Functionality
- 📦 Place Orders
- 🧑‍💻 Admin Dashboard (CRUD for Products & Orders)
- ⚡ Responsive Design
- 🌐 RESTful API Integration

---

## 🧰 Tech Stack

- **Frontend**: React.js, React Router, Axios, CSS/Tailwind
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT, Bcrypt
- **Dev Tools**: VS Code, Git, Postman

---

## 💻 How to Run Locally

### 📌 1. Clone Repository

```bash
git clone https://github.com/Abhay9322/Ecommerce_Website.git
cd Ecommerce_Website


cd backend
npm install

cd ../frontend
npm install

cd ../admin
npm install


Create .env in the backend/ folder:

PORT = 500
JWT_SECRET = "greatstack"
ADMIN_EMAIL = "admin@example.com"
ADMIN_PASSWORD = "greatstack123"

MONGODB_URI =  "Paste MongoDB Url

CLOUDINARY_API_KEY = " "
CLOUDINARY_SECRET_KEY = " "
CLOUDINARY_NAME = " "

STRIPE_SECRET_KEY = "Paste Stripe Secret key"

RAZORPAY_KEY_SECRET = 'Paste Razorpay Secret key'
RAZORPAY_KEY_ID = 'Paste Razorpay key Id'


Start the App

cd backend
npm start

cd ../frontend
npm start

cd ../admin
npm start

