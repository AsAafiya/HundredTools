import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/InvoiceGenerator.css";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const InvoiceGenerator = () => {
  const navigate = useNavigate();

  // =======================
  // Company Details
  // =======================

  const [company, setCompany] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const [customer, setCustomer] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("INV-1001");
  const [invoiceDate, setInvoiceDate] = useState("");

  const [companyLogo, setCompanyLogo] = useState(null);
  const [gstNumber, setGstNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [currency, setCurrency] = useState("₹");

  // =======================
  // More Company Details
  // =======================

  const [showMoreDetails, setShowMoreDetails] = useState(false);

  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [panNumber, setPanNumber] = useState("");

  // =======================
  // Signature
  // =======================

  const [signature, setSignature] = useState(null);

  // =======================
  // Font Style
  // =======================

  const [totalFontStyle, setTotalFontStyle] = useState("normal");

  // =======================
  // Invoice Items
  // =======================

  const [items, setItems] = useState([
    {
      id: 1,
      name: "",
      quantity: 1,
      price: 0,
    },
  ]);

  // =======================
  // Upload Company Logo
  // =======================

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setCompanyLogo(URL.createObjectURL(file));
    }
  };

  // =======================
  // Upload Signature
  // =======================

  const handleSignatureUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSignature(URL.createObjectURL(file));
    }
  };

  // =======================
  // Update Item
  // =======================

  const handleChange = (index, field, value) => {
    const updatedItems = [...items];

    updatedItems[index][field] =
      field === "name" ? value : Number(value);

    setItems(updatedItems);
  };

  // =======================
  // Add Item
  // =======================

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

  // =======================
  // Remove Item
  // =======================

  const removeItem = (index) => {
    const updatedItems = [...items];

    updatedItems.splice(index, 1);

    setItems(updatedItems);
  };

  // =======================
  // Calculations
  // =======================

  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const gst = subtotal * 0.18;

  const grandTotal = subtotal + gst;

  // =======================
  // Font Helper
  // =======================

  const getPDFStyle = () => {
    if (totalFontStyle === "bold") {
      return "bold";
    }

    if (totalFontStyle === "italic") {
      return "italic";
    }

    if (totalFontStyle === "bold italic") {
      return "bolditalic";
    }

    return "normal";
  };

  // =======================
  // Download PDF
  // =======================

  const downloadPDF = () => {
    const pdf = new jsPDF("p", "mm", "a4");

    // Company Name
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(22);
    pdf.text(company || "Your Company", 14, 18);

    // Company Details
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);

    let companyY = 25;

    if (companyAddress) {
      pdf.text(`Address: ${companyAddress}`, 14, companyY);
      companyY += 6;
    }

    if (mobileNumber) {
      pdf.text(`Mobile: ${mobileNumber}`, 14, companyY);
      companyY += 6;
    }

    if (email && showMoreDetails) {
      pdf.text(`Email: ${email}`, 14, companyY);
      companyY += 6;
    }

    if (website && showMoreDetails) {
      pdf.text(`Website: ${website}`, 14, companyY);
      companyY += 6;
    }

    if (panNumber && showMoreDetails) {
      pdf.text(`PAN No: ${panNumber}`, 14, companyY);
      companyY += 6;
    }

    if (gstNumber) {
      pdf.text(`GST No: ${gstNumber}`, 14, companyY);
      companyY += 6;
    }

    if (accountNumber) {
      pdf.text(`Account No: ${accountNumber}`, 14, companyY);
    }

    // Invoice Details
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(11);

    pdf.text(`Invoice No : ${invoiceNo}`, 140, 20);
    pdf.text(`Date : ${invoiceDate || "-"}`, 140, 27);

    pdf.line(14, 55, 196, 55);

    // Customer
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(11);

    pdf.text("Bill To", 14, 64);

    pdf.setFont("helvetica", "normal");
    pdf.text(customer || "-", 14, 72);

    // Items
    const tableData = items.map((item) => [
      item.name || "-",
      item.quantity,
      `${currency}${item.price.toFixed(2)}`,
      `${currency}${(item.quantity * item.price).toFixed(2)}`,
    ]);

    autoTable(pdf, {
      startY: 82,

      head: [["Item", "Qty", "Price", "Total"]],

      body: tableData,

      theme: "grid",

      headStyles: {
        fillColor: [37, 99, 235],
      },

      styles: {
        fontSize: 10,
      },
    });

    let y = pdf.lastAutoTable.finalY + 15;

    // Total Font Style
    pdf.setFont("helvetica", getPDFStyle());
    pdf.setFontSize(11);

    pdf.text(
      `Subtotal : ${currency}${subtotal.toFixed(2)}`,
      130,
      y
    );

    y += 8;

    pdf.text(
      `GST (18%) : ${currency}${gst.toFixed(2)}`,
      130,
      y
    );

    y += 9;

    pdf.setFontSize(14);

    pdf.text(
      `Grand Total : ${currency}${grandTotal.toFixed(2)}`,
      130,
      y
    );

    // Signature
    if (signature) {
      try {
        pdf.addImage(
          signature,
          "PNG",
          145,
          y + 12,
          45,
          20
        );

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(9);

        pdf.text("Authorized Signature", 145, y + 36);
      } catch (error) {
        console.error("Signature could not be added:", error);
      }
    } else {
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);

      pdf.text("Authorized Signature", 145, y + 30);
    }

    pdf.save(`Invoice-${invoiceNo}.pdf`);
  };
    // =======================
  // Reset Form
  // =======================

  const resetForm = () => {
    setCompany("");
    setCompanyAddress("");
    setMobileNumber("");

    setCustomer("");
    setInvoiceNo("INV-1001");
    setInvoiceDate("");

    setCompanyLogo(null);
    setGstNumber("");
    setAccountNumber("");
    setCurrency("₹");

    setShowMoreDetails(false);

    setEmail("");
    setWebsite("");
    setPanNumber("");

    setSignature(null);

    setTotalFontStyle("normal");

    setItems([
      {
        id: 1,
        name: "",
        quantity: 1,
        price: 0,
      },
    ]);
  };

  return (
    <div className="invoice-container">

      {/* =======================
          Back Button
      ======================= */}

      <div className="back-btn-container">
        <button
          className="back-btn"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>

      {/* =======================
          Page Title
      ======================= */}

      <h1>Invoice Generator</h1>

      <div className="invoice-wrapper">

        {/* =======================
            LEFT PANEL
        ======================= */}

        <div className="invoice-form">

          <h2>Invoice Details</h2>

          {/* =======================
              Company Logo
          ======================= */}

          <div className="input-group">
            <label>Company Logo</label>

            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
            />
          </div>

          {/* =======================
              Company Name
          ======================= */}

          <div className="input-group">
            <label>Company Name</label>

            <input
              type="text"
              placeholder="Enter Company Name"
              value={company}
              onChange={(e) =>
                setCompany(e.target.value)
              }
            />
          </div>

          {/* =======================
              Company Address
          ======================= */}

          <div className="input-group company-address-group">
  <label>Company Address</label>

  <textarea
    placeholder="Enter Company Address"
    value={companyAddress}
    onChange={(e) => setCompanyAddress(e.target.value)}
    rows={2}
  />
</div>

          {/* =======================
              Mobile Number
          ======================= */}

          <div className="input-group">
            <label>Mobile Number</label>

            <input
              type="tel"
              placeholder="Enter Mobile Number"
              value={mobileNumber}
              onChange={(e) =>
                setMobileNumber(e.target.value)
              }
            />
          </div>

          {/* =======================
              Customer Name
          ======================= */}

          <div className="input-group">
            <label>Customer Name</label>

            <input
              type="text"
              placeholder="Enter Customer Name"
              value={customer}
              onChange={(e) =>
                setCustomer(e.target.value)
              }
            />
          </div>

          {/* =======================
              GST Number
          ======================= */}

          <div className="input-group">
            <label>GST Number</label>

            <input
              type="text"
              placeholder="22AAAAA0000A1Z5"
              value={gstNumber}
              onChange={(e) =>
                setGstNumber(e.target.value)
              }
            />
          </div>

          {/* =======================
              Account Number
          ======================= */}

          <div className="input-group">
            <label>Account Number</label>

            <input
              type="text"
              placeholder="1234567890"
              value={accountNumber}
              onChange={(e) =>
                setAccountNumber(e.target.value)
              }
            />
          </div>

          {/* =======================
              Currency
          ======================= */}

          <div className="input-group">
            <label>Currency</label>

            <select
              value={currency}
              onChange={(e) =>
                setCurrency(e.target.value)
              }
            >
              <option value="₹">
                Indian Rupee (₹)
              </option>

              <option value="$">
                US Dollar ($)
              </option>

              <option value="€">
                Euro (€)
              </option>

              <option value="£">
                Pound (£)
              </option>
            </select>
          </div>

          {/* =======================
              Invoice Number
          ======================= */}

          <div className="input-group">
            <label>Invoice Number</label>

            <input
              type="text"
              value={invoiceNo}
              onChange={(e) =>
                setInvoiceNo(e.target.value)
              }
            />
          </div>

          {/* =======================
              Invoice Date
          ======================= */}

          <div className="input-group">
            <label>Invoice Date</label>

            <input
              type="date"
              value={invoiceDate}
              onChange={(e) =>
                setInvoiceDate(e.target.value)
              }
            />
          </div>

          {/* =======================
              More Company Details
          ======================= */}

          <button
            type="button"
            className="more-company-btn"
            onClick={() =>
              setShowMoreDetails(!showMoreDetails)
            }
          >
            {showMoreDetails
              ? "− Hide Company Details"
              : "+ More Company Details"}
          </button>

          {/* =======================
              Additional Details
          ======================= */}

          {showMoreDetails && (
            <div className="more-company-details">

              <h3>Additional Company Details</h3>

              {/* Email */}

              <div className="input-group">
                <label>Company Email</label>

                <input
                  type="email"
                  placeholder="company@example.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                />
              </div>

              {/* Website */}

              <div className="input-group">
                <label>Website</label>

                <input
                  type="text"
                  placeholder="www.example.com"
                  value={website}
                  onChange={(e) =>
                    setWebsite(e.target.value)
                  }
                />
              </div>

              {/* PAN */}

              <div className="input-group">
                <label>PAN Number</label>

                <input
                  type="text"
                  placeholder="ABCDE1234F"
                  value={panNumber}
                  onChange={(e) =>
                    setPanNumber(e.target.value)
                  }
                />
              </div>

            </div>
          )}

          {/* =======================
              Total Font Style
          ======================= */}

          <div className="input-group">
            <label>
              Subtotal / GST / Grand Total Font Style
            </label>

            <select
              value={totalFontStyle}
              onChange={(e) =>
                setTotalFontStyle(e.target.value)
              }
            >
              <option value="normal">
                Normal
              </option>

              <option value="bold">
                Bold
              </option>

              <option value="italic">
                Italic
              </option>

              <option value="bold italic">
                Bold Italic
              </option>
            </select>
          </div>

          {/* =======================
              Signature
          ======================= */}

          <div className="input-group">
            <label>
              Signature (Optional)
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleSignatureUpload}
            />

            <small className="input-help">
              Upload a signature image. This will
              appear on the right side of the totals.
            </small>
          </div>

          {/* =======================
              Invoice Items
          ======================= */}

          <h3>Invoice Items</h3>

          {items.map((item, index) => (
            <div
              className="item-row"
              key={item.id}
            >

              {/* Item Name */}

              <input
                type="text"
                placeholder="Item Name"
                value={item.name}
                onChange={(e) =>
                  handleChange(
                    index,
                    "name",
                    e.target.value
                  )
                }
              />

              {/* Quantity */}

              <input
                type="number"
                min="1"
                placeholder="Quantity"
                value={item.quantity}
                onChange={(e) =>
                  handleChange(
                    index,
                    "quantity",
                    e.target.value
                  )
                }
              />

              {/* Price */}

              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="Price"
                value={item.price}
                onChange={(e) =>
                  handleChange(
                    index,
                    "price",
                    e.target.value
                  )
                }
              />

              {/* Remove */}

              <button
                type="button"
                className="remove-btn"
                onClick={() =>
                  removeItem(index)
                }
              >
                ✕
              </button>

            </div>
          ))}

          {/* =======================
              Add Item + More Company
          ======================= */}

          <div className="item-action-group">

            <button
              type="button"
              className="add-btn"
              onClick={addItem}
            >
              + Add Item
            </button>

            <button
              type="button"
              className="more-company-btn item-more-btn"
              onClick={() =>
                setShowMoreDetails(!showMoreDetails)
              }
            >
              + More Company Details
            </button>

          </div>
                    {/* =======================
              Buttons
          ======================= */}

          <div className="button-group">

            <button
              type="button"
              className="generate-btn"
            >
              Generate Invoice
            </button>

            <button
              type="button"
              className="download-btn"
              onClick={downloadPDF}
            >
              Download PDF
            </button>

            <button
              type="button"
              className="reset-btn"
              onClick={resetForm}
            >
              Reset
            </button>

          </div>

        </div>

        {/* =======================
            RIGHT PANEL
        ======================= */}

        <div className="invoice-summary">

          {/* =======================
              Invoice Header
          ======================= */}

          <div className="invoice-header">

            {companyLogo ? (
              <img
                src={companyLogo}
                alt="Company Logo"
                className="company-logo"
              />
            ) : (
              <div className="logo-placeholder">
                LOGO
              </div>
            )}

            <div className="invoice-header-info">

              <h2>
                {company || "Your Company"}
              </h2>

              {/* Company Address */}

              {companyAddress && (
                <p>
                  <strong>Address:</strong>{" "}
                  {companyAddress}
                </p>
              )}

              {/* Mobile Number */}

              {mobileNumber && (
                <p>
                  <strong>Mobile:</strong>{" "}
                  {mobileNumber}
                </p>
              )}

              {/* GST */}

              <p>
                <strong>GST No:</strong>{" "}
                {gstNumber || "-"}
              </p>

              {/* Account */}

              <p>
                <strong>Account No:</strong>{" "}
                {accountNumber || "-"}
              </p>

              {/* =======================
                  More Company Details
              ======================= */}

              {showMoreDetails && (
                <div className="preview-more-details">

                  {email && (
                    <p>
                      <strong>Email:</strong>{" "}
                      {email}
                    </p>
                  )}

                  {website && (
                    <p>
                      <strong>Website:</strong>{" "}
                      {website}
                    </p>
                  )}

                  {panNumber && (
                    <p>
                      <strong>PAN No:</strong>{" "}
                      {panNumber}
                    </p>
                  )}

                </div>
              )}

            </div>

          </div>

          <hr />

          {/* =======================
              Customer Information
          ======================= */}

          <div className="summary-item">

            <span>Customer</span>

            <strong>
              {customer || "-"}
            </strong>

          </div>

          {/* =======================
              Invoice Number
          ======================= */}

          <div className="summary-item">

            <span>Invoice No.</span>

            <strong>
              {invoiceNo}
            </strong>

          </div>

          {/* =======================
              Invoice Date
          ======================= */}

          <div className="summary-item">

            <span>Date</span>

            <strong>
              {invoiceDate || "-"}
            </strong>

          </div>

          <hr />

          {/* =======================
              Invoice Items Heading
          ======================= */}

          <h3 className="items-title">
            Invoice Items
          </h3>

          {/* =======================
              Invoice Items
          ======================= */}

          {items.map((item) => (

            <div
              key={item.id}
              className="summary-item"
            >

              <span>
                {item.name || "Item"}
              </span>

              <strong>
                {item.quantity} × {currency}
                {item.price.toFixed(2)}
              </strong>

            </div>

          ))}

          <hr />

          {/* =======================
              Totals Section
          ======================= */}

          <div
            className={`invoice-total-section total-font-${totalFontStyle.replace(
              " ",
              "-"
            )}`}
          >

            {/* Subtotal */}

            <div className="summary-item subtotal-item">

              <span>
                Subtotal
              </span>

              <strong>
                {currency}
                {subtotal.toFixed(2)}
              </strong>

            </div>

            {/* GST */}

            <div className="summary-item gst-item">

              <span>
                GST (18%)
              </span>

              <strong>
                {currency}
                {gst.toFixed(2)}
              </strong>

            </div>

            {/* Grand Total */}

            <div className="summary-item total">

              <span>
                Grand Total
              </span>

              <strong>
                {currency}
                {grandTotal.toFixed(2)}
              </strong>

            </div>

          </div>

          {/* =======================
              Signature Area
          ======================= */}

          <div className="signature-area">

            <div className="signature-box">

              {signature ? (
                <img
                  src={signature}
                  alt="Signature"
                  className="signature-image"
                />
              ) : (
                <div className="signature-placeholder">
                  Signature
                </div>
              )}

              <div className="signature-line"></div>

              <p>
                Authorized Signature
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default InvoiceGenerator;