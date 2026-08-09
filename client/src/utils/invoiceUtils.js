// ===============================
// Generate Invoice Number
// ===============================

export const generateInvoiceNumber = () => {
  const random = Math.floor(1000 + Math.random() * 9000);
  return `INV-${random}`;
};

// ===============================
// Calculate Item Total
// ===============================

export const calculateItemTotal = (quantity, price) => {
  return Number(quantity) * Number(price);
};

// ===============================
// Calculate Subtotal
// ===============================

export const calculateSubtotal = (items) => {
  return items.reduce((total, item) => {
    return total + Number(item.quantity) * Number(item.price);
  }, 0);
};

// ===============================
// Calculate GST
// ===============================

export const calculateGST = (
  subtotal,
  gstRate = 18
) => {
  return (subtotal * gstRate) / 100;
};

// ===============================
// Calculate Discount
// ===============================

export const calculateDiscount = (
  subtotal,
  discount = 0
) => {
  return (subtotal * discount) / 100;
};

// ===============================
// Grand Total
// ===============================

export const calculateGrandTotal = (
  subtotal,
  gst,
  discount
) => {
  return subtotal + gst - discount;
};

// ===============================
// Currency Formatter
// ===============================

export const formatCurrency = (amount) => {
  return Number(amount).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  });
};

// ===============================
// Date Formatter
// ===============================

export const formatDate = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-IN");
};

// ===============================
// Reset Invoice Object
// ===============================

export const defaultInvoice = () => ({
  company: "",
  customer: "",
  invoiceNo: generateInvoiceNumber(),
  invoiceDate: "",

  items: [
    {
      id: 1,
      name: "",
      quantity: 1,
      price: 0,
    },
  ],
});