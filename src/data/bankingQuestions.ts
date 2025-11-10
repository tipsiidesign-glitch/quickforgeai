export interface BankingQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
}

export const bankingQuestions: BankingQuestion[] = [
  // Private and Public Banks
  {
    id: 1,
    question: "What percentage of stake is held by the Government of India in Public Sector Banks (PSBs)?",
    options: ["More than 30%", "More than 40%", "More than 50%", "More than 60%"],
    correctAnswer: 2,
    category: "Banking Types"
  },
  {
    id: 2,
    question: "Which of the following is an example of a Public Sector Bank?",
    options: ["HDFC Bank", "State Bank of India", "ICICI Bank", "Axis Bank"],
    correctAnswer: 1,
    category: "Banking Types"
  },
  {
    id: 3,
    question: "Private Sector Banks opened after 1991 include:",
    options: ["Karnataka Bank", "HDFC Bank", "South Indian Bank", "J&K Bank"],
    correctAnswer: 1,
    category: "Banking Types"
  },
  {
    id: 4,
    question: "Which bank is an example of Old Private Sector Banks (opened before 1991)?",
    options: ["ICICI Bank", "Axis Bank", "Karnataka Bank", "HDFC Bank"],
    correctAnswer: 2,
    category: "Banking Types"
  },
  {
    id: 5,
    question: "Foreign Banks in India include:",
    options: ["Punjab National Bank", "Standard Chartered Bank", "Bank of Baroda", "Canara Bank"],
    correctAnswer: 1,
    category: "Banking Types"
  },

  // Types of Cheques
  {
    id: 6,
    question: "A cheque where payment can be made to anyone who presents it is called:",
    options: ["Order Cheque", "Bearer Cheque", "Crossed Cheque", "Post-dated Cheque"],
    correctAnswer: 1,
    category: "Cheques"
  },
  {
    id: 7,
    question: "An Account Payee Cheque is another name for:",
    options: ["Bearer Cheque", "Order Cheque", "Crossed Cheque", "Post-dated Cheque"],
    correctAnswer: 2,
    category: "Cheques"
  },
  {
    id: 8,
    question: "A cheque that can only be issued to the person whose name is mentioned on it is called:",
    options: ["Bearer Cheque", "Order Cheque", "Crossed Cheque", "Post-dated Cheque"],
    correctAnswer: 1,
    category: "Cheques"
  },
  {
    id: 9,
    question: "A cheque with a future date to meet a financial obligation is called:",
    options: ["Bearer Cheque", "Order Cheque", "Crossed Cheque", "Post-dated Cheque"],
    correctAnswer: 3,
    category: "Cheques"
  },
  {
    id: 10,
    question: "What is the validity period of a post-dated cheque from the date of issuance?",
    options: ["1 month", "2 months", "3 months", "6 months"],
    correctAnswer: 2,
    category: "Cheques"
  },

  // Debit and Credit Cards
  {
    id: 11,
    question: "A debit card deducts money directly from your:",
    options: ["Credit limit", "Checking account", "Savings only", "Investment account"],
    correctAnswer: 1,
    category: "Cards"
  },
  {
    id: 12,
    question: "How many free ATM withdrawals are typically allowed per month?",
    options: ["3", "5", "7", "10"],
    correctAnswer: 1,
    category: "Cards"
  },
  {
    id: 13,
    question: "The maximum amount you can borrow on a credit card is called:",
    options: ["Credit score", "Credit limit", "Credit balance", "Credit history"],
    correctAnswer: 1,
    category: "Cards"
  },
  {
    id: 14,
    question: "Which card requires the full balance to be paid at the end of each billing cycle?",
    options: ["Debit Card", "Credit Card", "Charge Card", "Prepaid Card"],
    correctAnswer: 2,
    category: "Cards"
  },
  {
    id: 15,
    question: "What happens if you don't pay the full balance on a credit card?",
    options: ["No consequences", "Interest charges apply", "Card is canceled", "Free extension given"],
    correctAnswer: 1,
    category: "Cards"
  },

  // Demand Draft
  {
    id: 16,
    question: "A Demand Draft is valid for:",
    options: ["3 months", "6 months", "1 year", "2 years"],
    correctAnswer: 1,
    category: "Payment Instruments"
  },
  {
    id: 17,
    question: "Pay Order is valid for:",
    options: ["3 months", "6 months", "1 year", "No expiry"],
    correctAnswer: 0,
    category: "Payment Instruments"
  },
  {
    id: 18,
    question: "Pay Order can be used for payments in:",
    options: ["Same city only", "Different cities", "International transfers", "All of the above"],
    correctAnswer: 0,
    category: "Payment Instruments"
  },
  {
    id: 19,
    question: "Demand Draft can be used for:",
    options: ["Same city only", "Different cities and states", "International only", "None of the above"],
    correctAnswer: 1,
    category: "Payment Instruments"
  },
  {
    id: 20,
    question: "Which is more secure than a regular cheque?",
    options: ["Bearer cheque", "Order cheque", "Demand Draft", "Cash"],
    correctAnswer: 2,
    category: "Payment Instruments"
  },

  // Online Banking
  {
    id: 21,
    question: "Internet banking is also known as:",
    options: ["Mobile banking", "E-banking", "Phone banking", "Branch banking"],
    correctAnswer: 1,
    category: "Online Banking"
  },
  {
    id: 22,
    question: "Online banking services are available:",
    options: ["9 AM to 5 PM", "Business hours only", "24/7", "Weekdays only"],
    correctAnswer: 2,
    category: "Online Banking"
  },
  {
    id: 23,
    question: "Which service is NOT typically available in online banking?",
    options: ["Fund transfers", "Bill payments", "Account statements", "Cash withdrawal"],
    correctAnswer: 3,
    category: "Online Banking"
  },
  {
    id: 24,
    question: "E-statements are:",
    options: ["More expensive than paper", "Electronic account statements", "Only for business accounts", "Not legally valid"],
    correctAnswer: 1,
    category: "Online Banking"
  },
  {
    id: 25,
    question: "Remote cheque deposit allows you to:",
    options: ["Deposit cash remotely", "Deposit cheques by photo", "Withdraw cash remotely", "Transfer internationally"],
    correctAnswer: 1,
    category: "Online Banking"
  },

  // Full Forms
  {
    id: 26,
    question: "NEFT stands for:",
    options: ["National Electronic Funds Transfer", "New Electronic Finance Transfer", "National Easy Fund Transfer", "Net Electronic Fund Transfer"],
    correctAnswer: 0,
    category: "Full Forms"
  },
  {
    id: 27,
    question: "RTGS stands for:",
    options: ["Real Time Gross Settlement", "Real Time Government Settlement", "Rapid Transfer Gross System", "Real Transfer Government System"],
    correctAnswer: 0,
    category: "Full Forms"
  },
  {
    id: 28,
    question: "IMPS stands for:",
    options: ["Indian Money Payment Service", "Immediate Payment Service", "Instant Money Payment System", "Indian Mobile Payment Service"],
    correctAnswer: 1,
    category: "Full Forms"
  },
  {
    id: 29,
    question: "ATM stands for:",
    options: ["Automatic Teller Machine", "Automated Transfer Machine", "Automatic Transaction Machine", "Advanced Teller Machine"],
    correctAnswer: 0,
    category: "Full Forms"
  },
  {
    id: 30,
    question: "MMID stands for:",
    options: ["Mobile Money Identifier", "Mobile Money ID", "Mobile Money Identifier Digit", "Mobile Money Interface Data"],
    correctAnswer: 0,
    category: "Full Forms"
  },
  {
    id: 31,
    question: "IFSC stands for:",
    options: ["Indian Financial System Code", "Indian Finance Service Code", "Indian Fund System Code", "Inter Finance System Code"],
    correctAnswer: 0,
    category: "Full Forms"
  },

  // Additional Banking Concepts
  {
    id: 32,
    question: "NEFT transactions are processed in:",
    options: ["Real-time", "Hourly batches", "Daily batches", "Weekly batches"],
    correctAnswer: 1,
    category: "Payment Systems"
  },
  {
    id: 33,
    question: "RTGS is suitable for:",
    options: ["Small transactions", "High-value transactions", "International transfers only", "Cash transactions"],
    correctAnswer: 1,
    category: "Payment Systems"
  },
  {
    id: 34,
    question: "The minimum amount for RTGS transaction is:",
    options: ["₹50,000", "₹1,00,000", "₹2,00,000", "No minimum limit"],
    correctAnswer: 2,
    category: "Payment Systems"
  },
  {
    id: 35,
    question: "IMPS service is available:",
    options: ["Business hours only", "24x7 including holidays", "Weekdays only", "9 AM to 6 PM"],
    correctAnswer: 1,
    category: "Payment Systems"
  },
  {
    id: 36,
    question: "Which payment system provides instant fund transfer?",
    options: ["NEFT", "RTGS and IMPS", "Cheque", "Demand Draft"],
    correctAnswer: 1,
    category: "Payment Systems"
  },
  {
    id: 37,
    question: "Regional Rural Banks are jointly owned by:",
    options: ["Central Government only", "State Government only", "Central Govt (50%), PSB (35%), State Govt (15%)", "Private shareholders"],
    correctAnswer: 2,
    category: "Banking Types"
  },
  {
    id: 38,
    question: "The apex bank for agricultural and rural development is:",
    options: ["RBI", "NABARD", "SIDBI", "EXIM Bank"],
    correctAnswer: 1,
    category: "Banking Types"
  },
  {
    id: 39,
    question: "Co-operative banks are organized under:",
    options: ["Banking Regulation Act", "RBI Act", "Co-operative Credit Societies Act", "Companies Act"],
    correctAnswer: 2,
    category: "Banking Types"
  },
  {
    id: 40,
    question: "Which information is NOT required for NEFT transfer?",
    options: ["Beneficiary's account number", "IFSC code", "PAN number", "Beneficiary's name"],
    correctAnswer: 2,
    category: "Payment Systems"
  }
];