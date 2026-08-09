import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/LoanCalculator.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const LoanCalculator = () => {
  const navigate = useNavigate();

  // =======================
  // Loan Input States
  // =======================

  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");

  // Loan tenure can be entered in Years or Months
  const [loanTenure, setLoanTenure] = useState("");
  const [tenureType, setTenureType] = useState("years");

  // =======================
  // Result States
  // =======================

  const [emi, setEmi] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);

  const [error, setError] = useState("");

  // =======================
  // Currency Formatter
  // =======================

  const formatCurrency = (value) => {
    return Number(value).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // =======================
  // Calculate EMI
  // =======================

  const calculateEMI = () => {
    setError("");

    const P = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate);
    const tenure = parseFloat(loanTenure);

    // Check empty fields
    if (!P || !annualRate || !tenure) {
      setError("Please fill all the fields.");
      return;
    }

    // Check positive values
    if (P <= 0 || annualRate <= 0 || tenure <= 0) {
      setError("Values must be greater than zero.");
      return;
    }

    // =======================
    // Convert Tenure to Months
    // =======================

    let N;

    if (tenureType === "years") {
      N = tenure * 12;
    } else {
      N = tenure;
    }

    // =======================
    // Monthly Interest Rate
    // =======================

    const R = annualRate / 12 / 100;

    // =======================
    // EMI Formula
    // =======================

    const EMI =
      (P * R * Math.pow(1 + R, N)) /
      (Math.pow(1 + R, N) - 1);

    // =======================
    // Total Payment
    // =======================

    const totalPay = EMI * N;

    // =======================
    // Total Interest
    // =======================

    const totalInt = totalPay - P;

    // =======================
    // Set Results
    // =======================

    setEmi(EMI);
    setTotalInterest(totalInt);
    setTotalPayment(totalPay);
  };

  // =======================
  // Reset Calculator
  // =======================

  const resetCalculator = () => {
    setLoanAmount("");
    setInterestRate("");
    setLoanTenure("");
    setTenureType("years");

    setEmi(null);
    setTotalInterest(null);
    setTotalPayment(null);

    setError("");
  };

  // =======================
  // Chart Data
  // =======================

  const chartData = {
    labels: [
      "Loan Amount",
      "Interest",
      "Total Payment",
    ],

    datasets: [
      {
        label: "Amount (₹)",

        data: [
          Number(loanAmount || 0),
          totalInterest || 0,
          totalPayment || 0,
        ],

        backgroundColor: [
          "#2563eb",
          "#ef4444",
          "#10b981",
        ],

        borderRadius: 8,
      },
    ],
  };

  // =======================
  // Chart Options
  // =======================

  const chartOptions = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },

      title: {
        display: true,

        text: "Loan Breakdown",

        font: {
          size: 18,
        },
      },
    },

    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // =======================
  // JSX
  // =======================

  return (
    <div className="loan-container">

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

      <h1 className="loan-title">
        EMI Calculator
      </h1>

      {/* =======================
          Main Wrapper
      ======================= */}

      <div className="loan-wrapper">

        {/* =======================
            Left Card
        ======================= */}

        <div className="loan-card">

          <h2>Loan Details</h2>

          {/* Loan Amount */}

          <div className="input-group">

            <label>
              Loan Amount (₹)
            </label>

            <input
              type="number"
              placeholder="Enter Loan Amount"
              value={loanAmount}
              min="1"
              onChange={(e) =>
                setLoanAmount(e.target.value)
              }
            />

          </div>

          {/* Interest Rate */}

          <div className="input-group">

            <label>
              Interest Rate (%)
            </label>

            <input
              type="number"
              placeholder="Annual Interest Rate"
              value={interestRate}
              min="0"
              step="0.01"
              onChange={(e) =>
                setInterestRate(e.target.value)
              }
            />

          </div>

          {/* =======================
              Loan Tenure
          ======================= */}

          <div className="input-group">

            <label>
              Loan Tenure
            </label>

            <div className="tenure-row">

              {/* Tenure Input */}

              <input
                type="number"
                placeholder={
                  tenureType === "years"
                    ? "Enter Years"
                    : "Enter Months"
                }
                value={loanTenure}
                min="1"
                onChange={(e) =>
                  setLoanTenure(e.target.value)
                }
              />

              {/* Tenure Type */}

              <select
                value={tenureType}
                onChange={(e) =>
                  setTenureType(e.target.value)
                }
              >

                <option value="years">
                  Years
                </option>

                <option value="months">
                  Months
                </option>

              </select>

            </div>

          </div>

          {/* =======================
              Error Message
          ======================= */}

          {error && (
            <p className="error-text">
              {error}
            </p>
          )}

          {/* =======================
              Buttons
          ======================= */}

          <div className="button-group">

            <button
              className="calculate-btn"
              onClick={calculateEMI}
            >
              Calculate EMI
            </button>

            <button
              className="reset-btn"
              onClick={resetCalculator}
            >
              Reset
            </button>

          </div>

        </div>

        {/* =======================
            Right Card
        ======================= */}

        <div className="result-card">

          <h2>
            EMI Summary
          </h2>

          {emi ? (

            <>

              {/* =======================
                  Monthly EMI
              ======================= */}

              <div className="result-item">

                <span>
                  Monthly EMI
                </span>

                <strong>
                  ₹ {formatCurrency(emi)}
                </strong>

              </div>

              {/* =======================
                  Total Interest
              ======================= */}

              <div className="result-item">

                <span>
                  Total Interest
                </span>

                <strong>
                  ₹ {formatCurrency(totalInterest)}
                </strong>

              </div>

              {/* =======================
                  Total Payment
              ======================= */}

              <div className="result-item">

                <span>
                  Total Payment
                </span>

                <strong>
                  ₹ {formatCurrency(totalPayment)}
                </strong>

              </div>

              {/* =======================
                  Selected Tenure
              ======================= */}

              <div className="result-item">

                <span>
                  Loan Tenure
                </span>

                <strong>
                  {loanTenure}{" "}
                  {tenureType === "years"
                    ? loanTenure === "1"
                      ? "Year"
                      : "Years"
                    : loanTenure === "1"
                    ? "Month"
                    : "Months"}
                </strong>

              </div>

              {/* =======================
                  Loan Breakdown Chart
              ======================= */}

              <div className="chart-container">

                <Bar
                  data={chartData}
                  options={chartOptions}
                />

              </div>

            </>

          ) : (

            /* =======================
                Empty State
            ======================= */

            <div className="summary-placeholder">

              <p>

                Enter loan details and click

                <br />

                <strong>
                  Calculate EMI
                </strong>

                <br />

                to view your loan summary.

              </p>

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default LoanCalculator;