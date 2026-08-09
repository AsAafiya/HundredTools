import { useState } from "react";
import { calculateLoan } from "../utils/loanFormula";

const useLoan = () => {
  // Input States
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanYears, setLoanYears] = useState("");

  // Result States
  const [emi, setEmi] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);

  // Error State
  const [error, setError] = useState("");

  // Loading State (Optional)
  const [loading, setLoading] = useState(false);

  // Calculate Loan
  const calculateEMI = () => {
    setError("");

    const principal = Number(loanAmount);
    const rate = Number(interestRate);
    const years = Number(loanYears);

    if (!principal || !rate || !years) {
      setError("Please fill all fields.");
      return;
    }

    setLoading(true);

    const result = calculateLoan(principal, rate, years);

    if (!result.success) {
      setError(result.message);
      setLoading(false);
      return;
    }

    setEmi(result.emi);
    setTotalInterest(result.totalInterest);
    setTotalPayment(result.totalPayment);

    setLoading(false);
  };

  // Reset Calculator
  const resetCalculator = () => {
    setLoanAmount("");
    setInterestRate("");
    setLoanYears("");

    setEmi(null);
    setTotalInterest(null);
    setTotalPayment(null);

    setError("");
  };

  return {
    // Inputs
    loanAmount,
    setLoanAmount,

    interestRate,
    setInterestRate,

    loanYears,
    setLoanYears,

    // Results
    emi,
    totalInterest,
    totalPayment,

    // Error
    error,

    // Loading
    loading,

    // Functions
    calculateEMI,
    resetCalculator,
  };
};

export default useLoan;