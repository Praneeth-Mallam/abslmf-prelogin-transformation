export const questionsData = [
  {
    id: 1,
    stepTitle: "Investor Profile",
    stepSubtitle: "Invest category",
    questionLabel: "Question 1",
    questionTitle: "Please select a category that best describes you",
    options: [
      { id: 1, label: "Individual Investor/HNI", icon: "User" },
      { id: 2, label: "Corporate/\nInstitutional Investor", icon: "Building" },
      { id: 3, label: "Corporate Treasurer", icon: "User" },
      { id: 4, label: "NRI", icon: "Globe" },
    ],
  },
  {
    id: 2,
    stepTitle: "Investment Horizon",
    stepSubtitle: "investment time",
    questionLabel: "Question 2",
    questionTitle: "What is your expected time horizon?",
    options: [
      { id: 1, label: "Less than 5 years", icon: "Calendar" },
      { id: 2, label: "More than 5 years", icon: "Calendar" },
    ],
  },
  {
    id: 3,
    stepTitle: "Investment Objective",
    stepSubtitle: "Primary objective",
    questionLabel: "Question 3",
    questionTitle: "What is your primary investment objective?",
    options: [
      { id: 1, label: "Regular Cash flows", icon: "Wallet" },
      { id: 2, label: "Long Term Wealth Creation\nIn Equity", icon: "ShieldCheck" },
      { id: 3, label: "Interest in GIFT City\nOffering", icon: "BarChart3" },
    ],
  },
];