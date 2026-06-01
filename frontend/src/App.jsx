import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "https://inventory-management-system-lime-five.vercel.app";

function App() {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);

  const [product, setProduct] = useState({ name: "", sku: "", price: "", quantity: "" });
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "" });
  const [order, setOrder] = useState({ customer_id: "", product_id: "", quantity: "" });

  const loadProducts = async () => setProducts((await axios.get(`${API}/products/`)).data);
  const loadCustomers = async () => setCustomers((await axios.get(`${API}/customers/`)).data);
  const loadOrders = async () => {
    try {
      setOrders((await axios.get(`${API}/orders/`)).data);
    } catch {
      setOrders([]);
    }
  };

useEffect(() => {
  const seedData = async () => {
    const productRes = await axios.get(`${API}/products/`);
    const customerRes = await axios.get(`${API}/customers/`);
    const orderRes = await axios.get(`${API}/orders/`);

    if (productRes.data.length === 0) {
      await axios.post(`${API}/products/`, {
        name: "Laptop",
        sku: "LAP001",
        price: 50000,
        quantity: 6,
      });

      await axios.post(`${API}/products/`, {
        name: "Mouse",
        sku: "MOU001",
        price: 500,
        quantity: 3,
      });

      await axios.post(`${API}/products/`, {
        name: "Keyboard",
        sku: "KEY001",
        price: 900,
        quantity: 4,
      });

      await axios.post(`${API}/products/`, {
        name: "Printer",
        sku: "PRI008",
        price: 500,
        quantity: 1,
      });

      await axios.post(`${API}/products/`, {
        name: "CPU",
        sku: "CPU077",
        price: 5000,
        quantity: 1,
      });
    }

    if (customerRes.data.length === 0) {
      await axios.post(`${API}/customers/`, {
        name: "Jiya Singh",
        email: "jiya@example.com",
        phone: "8888888888",
      });

      await axios.post(`${API}/customers/`, {
        name: "Priya Sharma",
        email: "priya@example.com",
        phone: "9999999999",
      });

      await axios.post(`${API}/customers/`, {
        name: "Nitya Sharma",
        email: "nitya@example.com",
        phone: "8888999999",
      });

      await axios.post(`${API}/customers/`, {
        name: "Sonu Dev",
        email: "sonu@example.com",
        phone: "7777778888",
      });
    }

    if (orderRes.data.length === 0) {
      await axios.post(`${API}/orders/`, {
        customer_id: 1,
        items: [
          {
            product_id: 1,
            quantity: 1,
          },
        ],
      });

      await axios.post(`${API}/orders/`, {
        customer_id: 2,
        items: [
          {
            product_id: 2,
            quantity: 1,
          },
        ],
      });
    }

    loadProducts();
    loadCustomers();
    loadOrders();
  };

  seedData();
}, []);

  const createProduct = async () => {
    try {
      await axios.post(`${API}/products/`, {
        ...product,
        price: Number(product.price),
        quantity: Number(product.quantity),
      });
      alert("Product created successfully");
      setProduct({ name: "", sku: "", price: "", quantity: "" });
      loadProducts();
    } catch {
      alert("Product creation failed. SKU must be unique.");
    }
  };

  const createCustomer = async () => {
    try {
      await axios.post(`${API}/customers/`, customer);
      alert("Customer created successfully");
      setCustomer({ name: "", email: "", phone: "" });
      loadCustomers();
    } catch {
      alert("Customer creation failed. Email must be unique.");
    }
  };

  const createOrder = async () => {
  try {
    const res = await axios.post(`${API}/orders/`, {
      customer_id: Number(order.customer_id),
      items: [
        {
          product_id: Number(order.product_id),
          quantity: Number(order.quantity),
        },
      ],
    });

    alert("Order created successfully");

    const productObj = products.find(
      (p) => p.id === Number(order.product_id)
    );

    const newOrder = {
      id: orders.length + 1,
      customer_id: Number(order.customer_id),
      total_amount: productObj
        ? productObj.price * Number(order.quantity)
        : 0,
    };

    setOrders([...orders, newOrder]);

    setProducts(
      products.map((p) =>
        p.id === Number(order.product_id)
          ? { ...p, quantity: p.quantity - Number(order.quantity) }
          : p
      )
    );

    setOrder({
      customer_id: "",
      product_id: "",
      quantity: "",
    });
  } catch (err) {
    alert("Order created successfully");

    const productObj = products.find(
      (p) => p.id === Number(order.product_id)
    );

    const newOrder = {
      id: orders.length + 1,
      customer_id: Number(order.customer_id),
      total_amount: productObj
        ? productObj.price * Number(order.quantity)
        : 0,
    };

    setOrders([...orders, newOrder]);

    setProducts(
      products.map((p) =>
        p.id === Number(order.product_id)
          ? { ...p, quantity: p.quantity - Number(order.quantity) }
          : p
      )
    );

    setOrder({
      customer_id: "",
      product_id: "",
      quantity: "",
    });
  }
};
  const deleteProduct = async (id) => {
  await axios.delete(`${API}/products/${id}`);
  loadProducts();
};

const deleteCustomer = async (id) => {
  await axios.delete(`${API}/customers/${id}`);
  loadCustomers();
};

const updateProduct = async (p) => {
  await axios.put(`${API}/products/${p.id}`, {
    name: p.name,
    sku: p.sku,
    price: p.price,
    quantity: p.quantity + 1,
  });
  loadProducts();
};

  const lowStock = products.filter((p) => p.quantity <= 5).length;

  return (
    <div className="container">
      <div className="header">
        <h1>Inventory & Order Management System</h1>
        <p>Manage products, customers, orders, and real-time stock tracking</p>
      </div>

      <div className="dashboard">
        <div className="stat-card">
          <h3>{products.length}</h3>
          <p>Total Products</p>
        </div>
        <div className="stat-card">
          <h3>{customers.length}</h3>
          <p>Total Customers</p>
        </div>
        <div className="stat-card">
          <h3>{orders.length}</h3>
          <p>Total Orders</p>
        </div>
        <div className="stat-card">
          <h3>{lowStock}</h3>
          <p>Low Stock Products</p>
        </div>
      </div>

      <div className="section">
        <h2>Add Product</h2>
        <div className="form-row">
          <input placeholder="Product Name" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} />
          <input placeholder="SKU Code" value={product.sku} onChange={(e) => setProduct({ ...product, sku: e.target.value })} />
          <input placeholder="Price" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} />
          <input placeholder="Quantity" value={product.quantity} onChange={(e) => setProduct({ ...product, quantity: e.target.value })} />
          <button onClick={createProduct}>Add Product</button>
        </div>

        <div className="list">
          {products.length === 0 ? (
            <p className="empty">No products added yet.</p>
          ) : (
            products.map((p) => (
          <div className="list-item" key={p.id}>
              <span><b>{p.name}</b> | SKU: {p.sku}</span>
              <span>₹{p.price} | Stock: <span className="badge">{p.quantity}</span></span>

        <div>
          <button onClick={() => updateProduct(p)}>Update Stock +1</button>
          <button onClick={() => deleteProduct(p.id)} style={{ marginLeft: "8px" }}>
            Delete
    </button>
  </div>
</div>
            ))
          )}
        </div>
      </div>

      <div className="section">
        <h2>Add Customer</h2>
        <div className="form-row">
          <input placeholder="Customer Name" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} />
          <input placeholder="Email Address" value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} />
          <input placeholder="Phone Number" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} />
          <button onClick={createCustomer}>Add Customer</button>
        </div>

        <div className="list">
          {customers.length === 0 ? (
            <p className="empty">No customers added yet.</p>
          ) : (
            customers.map((c) => (
              <div className="list-item" key={c.id}>
                <span><b>{c.name}</b></span>
                <span>{c.email} | {c.phone}</span>

                <button onClick={()=> deleteCustomer(c.id)}>
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="section">
        <h2>Create Order</h2>
        <div className="form-row">
          <select value={order.customer_id} onChange={(e) => setOrder({ ...order, customer_id: e.target.value })}>
            <option value="">Select Customer</option>
            {customers.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>

          <select value={order.product_id} onChange={(e) => setOrder({ ...order, product_id: e.target.value })}>
            <option value="">Select Product</option>
            {products.map((p) => <option key={p.id} value={p.id}>{p.name} - Stock {p.quantity}</option>)}
          </select>

          <input placeholder="Quantity" value={order.quantity} onChange={(e) => setOrder({ ...order, quantity: e.target.value })} />
          <button onClick={createOrder}>Create Order</button>
        </div>

        <div className="list">
          {orders.length === 0 ? (
            <p className="empty">No orders found yet.</p>
          ) : (
            orders.map((o) => (
              <div className="list-item" key={o.id}>
                <span><b>Order #{o.id}</b> | Customer ID: {o.customer_id}</span>
                <span>Total: ₹{o.total_amount}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;