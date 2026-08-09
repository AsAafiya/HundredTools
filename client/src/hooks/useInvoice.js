import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/InvoiceGenerator.css";

const InvoiceGenerator = () => {
  const navigate = useNavigate();

  // Generate Random Invoice Number
  const generateInvoiceNo = () => {
    return `INV-${Math.floor(1000 + Math.random() * 9000)}`;
  };

  const [company, setCompany] = useState("");
  const [customer, setCustomer] = useState("");
  const [invoiceNo, setInvoiceNo] = useState(generateInvoiceNo());
  const [invoiceDate, setInvoiceDate] = useState("");

  const [items, setItems] = useState([
    {
      id: Date.now(),
      name: "",
      quantity: 1,
      price: 0,
    },
  ]);

  // Handle Item Change
  const handleChange = (index, field, value) => {
    const updated = [...items];

    updated[index][field] =
      field === "name" ? value : Number(value);

    setItems(updated);
  };

  // Add Item
  const addItem = () => {
    setItems([
      ...items,
      {
        id: Date.now(),
        name: "",
        quantity: 1,
        price: 0,
      },
    ]);
  };

  // Remove Item
  const removeItem = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  // Calculations
  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const gst = subtotal * 0.18;

  const grandTotal = subtotal + gst;

  // Reset Form
  const resetForm = () => {
    setCompany("");
    setCustomer("");
    setInvoiceDate("");
    setInvoiceNo(generateInvoiceNo());

    setItems([
      {
        id: Date.now(),
        name: "",
        quantity: 1,
        price: 0,
      },
    ]);
  };

  // Generate Invoice
  const generateInvoice = () => {
    alert("Invoice Generated Successfully!");
  };

  return (
    <div className="invoice-container">

      {/* Back Button */}

      <div className="back-btn-container">
        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
      </div>

      <h1>Invoice Generator</h1>

      <div className="invoice-wrapper">

        {/* LEFT SIDE */}

        <div className="invoice-form">

          <h2>Invoice Details</h2>

          <div className="input-group">
            <label>Company Name</label>

            <input
              type="text"
              placeholder="Company Name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Customer Name</label>

            <input
              type="text"
              placeholder="Customer Name"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Invoice Number</label>

            <input
              type="text"
              value={invoiceNo}
              onChange={(e) => setInvoiceNo(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Invoice Date</label>

            <input
              type="date"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
            />
          </div>

          <h3>Items</h3>

          {items.map((item, index) => (
            <div
              className="item-row"
              key={item.id}
            >
              <input
                type="text"
                placeholder="Item Name"
                value={item.name}
                onChange={(e) =>
                  handleChange(index, "name", e.target.value)
                }
              />

              <input
                type="number"
                placeholder="Qty"
                value={item.quantity}
                onChange={(e) =>
                  handleChange(index, "quantity", e.target.value)
                }
              />

              <input
                type="number"
                placeholder="Price"
                value={item.price}
                onChange={(e) =>
                  handleChange(index, "price", e.target.value)
                }
              />

              <button
                className="remove-btn"
                onClick={() => removeItem(index)}
              >
                ✕
              </button>
            </div>
          ))}

          <button
            className="add-btn"
            onClick={addItem}
          >
            + Add Item
          </button>

          <div className="button-group">

            <button
              className="generate-btn"
              onClick={generateInvoice}
            >
              Generate Invoice
            </button>

            <button
              className="reset-btn"
              onClick={resetForm}
            >
              Reset
            </button>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="invoice-summary">

          <h2>Invoice Preview</h2>

          {!company &&
          !customer &&
          subtotal === 0 ? (

            <div className="empty-summary">
              Fill invoice details to see preview.
            </div>

          ) : (

            <>

              <div className="summary-item">
                <span>Company</span>
                <strong>{company || "-"}</strong>
              </div>

              <div className="summary-item">
                <span>Customer</span>
                <strong>{customer || "-"}</strong>
              </div>

              <div className="summary-item">
                <span>Invoice No</span>
                <strong>{invoiceNo}</strong>
              </div>

              <div className="summary-item">
                <span>Date</span>
                <strong>{invoiceDate || "-"}</strong>
              </div>

              <hr />

              {items.map((item) => (
                <div
                  className="summary-item"
                  key={item.id}
                >
                  <span>
                    {item.name || "Item"}
                  </span>

                  <strong>
                    ₹ {(item.quantity * item.price).toFixed(2)}
                  </strong>
                </div>
              ))}

              <hr />

              <div className="summary-item">
                <span>Subtotal</span>
                <strong>₹ {subtotal.toFixed(2)}</strong>
              </div>

              <div className="summary-item">
                <span>GST (18%)</span>
                <strong>₹ {gst.toFixed(2)}</strong>
              </div>

              <div className="summary-item total">
                <span>Total</span>
                <strong>₹ {grandTotal.toFixed(2)}</strong>
              </div>

            </>

          )}

        </div>

      </div>

    </div>
  );
};

export default InvoiceGenerator;