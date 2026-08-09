// ===============================
// Loan Formula Utility
// ===============================

/**
 * Calculate EMI, Total Interest & Total Payment
 * @param {number} principal
 * @param {number} annualRate
 * @param {number} years
 * @returns {object}
 */

export const calculateLoan = (principal, annualRate, years) => {
  // Validation
  if (
    principal <= 0 ||
    annualRate <= 0 ||
    years <= 0
  ) {
    return {
      success: false,
      message: "Please enter valid values.",
    };
  }

  // Monthly Interest Rate
  const monthlyRate = annualRate / 12 / 100;

  // Total Months
  const totalMonths = years * 12;

  // EMI Formula
  const emi =
    (principal *
      monthlyRate *
      Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1);

  // Total Payment
  const totalPayment = emi * totalMonths;

  // Total Interest
  const totalInterest = totalPayment - principal;

  return {
    success: true,
    emi,
    totalInterest,
    totalPayment,
    totalMonths,
  };
};

// ===============================
// Format Currency
// ===============================

export const formatCurrency = (amount) => {
  return Number(amount).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  });
};