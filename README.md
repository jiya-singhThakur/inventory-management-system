# Inventory & Order Management System

A full-stack Inventory and Order Management System built using FastAPI, SQLAlchemy, SQLite, React, and Docker.

## Features

### Product Management

* Create Products
* View Products
* Update Product Stock
* Delete Products
* SKU-based inventory tracking

### Customer Management

* Create Customers
* View Customers
* Delete Customers

### Order Management

* Create Orders
* Automatic stock validation
* Automatic stock reduction after order placement
* Order tracking

### Dashboard

* Total Products
* Total Customers
* Total Orders
* Low Stock Products

## Tech Stack

### Backend

* FastAPI
* SQLAlchemy
* SQLite
* Pydantic

### Frontend

* React
* Axios
* CSS

### DevOps

* Docker
* Docker Compose
* GitHub
* Vercel Deployment

## Project Structure

```text
inventory-management-system/
│
├── frontend/
│   ├── src/
│   └── public/
│
├── routes/
│   ├── products.py
│   ├── customers.py
│   └── orders.py
│
├── main.py
├── models.py
├── schemas.py
├── database.py
├── requirements.txt
├── Dockerfile
└── docker-compose.yml
```

## API Documentation

Swagger Documentation:

```text
https://inventory-management-system-lime-five.vercel.app/docs
```

## Frontend Deployment

```text
https://inventory-management-frontend-vert-gamma.vercel.app
```

## Installation

### Clone Repository

```bash
git clone https://github.com/jiya-singhThakur/inventory-management-system.git
cd inventory-management-system
```

### Backend Setup

```bash
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Docker Setup

```bash
docker-compose up --build
```

## Sample Data

The application loads sample products, customers, and orders for demonstration purposes.

### Sample Products

* Laptop
* Mouse
* Keyboard
* Printer
* CPU

### Sample Customers

* Jiya Singh
* Priya Sharma
* Nitya Sharma
* Sonu Dev

## Future Enhancements

* Authentication & Authorization
* Role-based Access Control
* PostgreSQL Integration
* Advanced Analytics Dashboard
* Email Notifications
* Export Reports (PDF/Excel)

## Author

Jiya Singh

GitHub:
https://github.com/jiya-singhThakur

##Screenshots
<img width="1920" height="1200" alt="Screenshot 2026-06-02 005547" src="https://github.com/user-attachments/assets/d3737408-febd-487f-b073-ca09d9d48364" />
<img width="1920" height="1200" alt="Screenshot 2026-06-02 005755" src="https://github.com/user-attachments/assets/2c5223a7-4132-4945-a223-9e8995323ca4" />



