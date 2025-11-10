export interface MathQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
}

export const mathQuestions: MathQuestion[] = [
  {
    id: 1,
    question: "The range of a sample gives an indication of the",
    options: [
      "way in which the values cluster about a particular point",
      "number of observations bearing the same value",
      "maximum variation in the sample",
      "degree to which the mean value differs from its expected value"
    ],
    correctAnswer: 2,
    category: "Statistics"
  },
  {
    id: 2,
    question: "The observation which occurs most frequently in a sample is the",
    options: ["median", "mean deviation", "standard deviation", "mode"],
    correctAnswer: 3,
    category: "Statistics"
  },
  {
    id: 3,
    question: "What is the median of the sample 5, 5, 11, 9, 8, 5, 8?",
    options: ["5", "6", "8", "9"],
    correctAnswer: 2,
    category: "Statistics"
  },
  {
    id: 4,
    question: "The following scores were obtained by eleven footballers in a goal-shoot competition: 5 3 6 8 7 8 3 11 6 3 2 4.5. The modal score was",
    options: ["3", "6", "8", "11"],
    correctAnswer: 0,
    category: "Statistics"
  },
  {
    id: 5,
    question: "A data set may have no mode, one mode, or multiple modes.",
    options: ["True", "False"],
    correctAnswer: 0,
    category: "Statistics"
  },
  {
    id: 6,
    question: "Which partition value divides the series into two equal parts?",
    options: ["P10", "P5", "P50", "P90"],
    correctAnswer: 2,
    category: "Statistics"
  },
  {
    id: 7,
    question: "What is the modal value for the numbers 4, 3, 8, 15, 4, 3, 6, 3, 15, 3, 4?",
    options: ["3", "4", "6", "15"],
    correctAnswer: 0,
    category: "Statistics"
  },
  {
    id: 8,
    question: "The sum of the squares of the deviations of the variable is when taken about arithmetic mean",
    options: ["Maximum", "Zero", "Minimum", "None"],
    correctAnswer: 2,
    category: "Statistics"
  },
  {
    id: 9,
    question: "What is the value of the first quartile for observations 15, 18, 10, 20, 23, 28, 12, 16?",
    options: ["17", "16", "12.75", "12"],
    correctAnswer: 2,
    category: "Statistics"
  },
  {
    id: 10,
    question: "The measurements of spread or scatter of the individual values around the central point is called:",
    options: ["Measures of dispersion", "Measures of skewness", "Measures of central tendency", "Measures of kurtosis"],
    correctAnswer: 0,
    category: "Statistics"
  },
  {
    id: 11,
    question: "The measures of dispersion can never be:",
    options: ["Positive", "Negative", "Zero", "equal to 2"],
    correctAnswer: 1,
    category: "Statistics"
  },
  {
    id: 12,
    question: "If the values of mean, median and mode coincide in a unimodal distribution, then the distribution will be:",
    options: ["Positively Skewed", "Symmetrical", "Negatively Skewed", "None of these"],
    correctAnswer: 1,
    category: "Statistics"
  },
  {
    id: 13,
    question: "The degree of peaked ness or flatness of a unimodal distribution is called:",
    options: ["Skewness", "Kurtosis", "Dispersion", "Normal distribution"],
    correctAnswer: 1,
    category: "Statistics"
  },
  {
    id: 14,
    question: "Following are the Relative measures of dispersion except",
    options: ["Co-efficient of Mean deviation", "Standard deviation", "Co-efficient of Range", "Co-efficient of Quartile deviation"],
    correctAnswer: 1,
    category: "Statistics"
  },
  {
    id: 15,
    question: "For a distribution of data, if the arithmetic mean > median > mode, then which of the following is true?",
    options: ["The distribution is symmetrical", "The distribution is positively skewed", "The distribution is negatively skewed", "None of these"],
    correctAnswer: 1,
    category: "Statistics"
  },
  {
    id: 16,
    question: "The scatter in a series of values about the average is called:",
    options: ["Central tendency", "Dispersion", "Skewness", "Symmetry"],
    correctAnswer: 1,
    category: "Statistics"
  },
  {
    id: 17,
    question: "The measurements of spread or scatter of the individual values around the central point is called:",
    options: ["Measures of dispersion", "Measures of central tendency", "Measures of skewness", "Measures of kurtosis"],
    correctAnswer: 0,
    category: "Statistics"
  },
  {
    id: 18,
    question: "The degree to which numerical data tend to spread about an average value called:",
    options: ["Constant", "Flatness", "Variation", "Skewness"],
    correctAnswer: 2,
    category: "Statistics"
  },
  {
    id: 19,
    question: "If all the scores on examination cluster around the mean, the dispersion is said to be:",
    options: ["Small", "Large", "Normal", "Symmetrical"],
    correctAnswer: 0,
    category: "Statistics"
  },
  {
    id: 20,
    question: "If there are many extreme scores on all examination, the dispersion is:",
    options: ["Large", "Small", "Normal", "Symmetric"],
    correctAnswer: 0,
    category: "Statistics"
  },
  {
    id: 21,
    question: "Which of the following is an absolute measure of dispersion?",
    options: ["Coefficient of variation", "Coefficient of dispersion", "Standard deviation", "Coefficient of skewness"],
    correctAnswer: 2,
    category: "Statistics"
  },
  {
    id: 22,
    question: "The measure of dispersion which uses only two observations is called:",
    options: ["Mean", "Median", "Range", "Coefficient of variation"],
    correctAnswer: 2,
    category: "Statistics"
  },
  {
    id: 23,
    question: "The range of the scores 29, 3, 143, 27, 99 is:",
    options: ["140", "143", "146", "70"],
    correctAnswer: 0,
    category: "Statistics"
  },
  {
    id: 24,
    question: "If the observations of a variable X are, -4, -20, -30, -44 and -36, then the value of the range will be:",
    options: ["-48", "40", "-40", "48"],
    correctAnswer: 1,
    category: "Statistics"
  },
  {
    id: 25,
    question: "The range of the values -5, -8, -10, 0, 6, 10 is:",
    options: ["0", "10", "-10", "20"],
    correctAnswer: 3,
    category: "Statistics"
  },
  {
    id: 26,
    question: "Half of the difference between upper and lower quartiles is called:",
    options: ["Interquartile range", "Quartile deviation", "Mean deviation", "Standard deviation"],
    correctAnswer: 1,
    category: "Statistics"
  },
  {
    id: 27,
    question: "If Q3=20 and Q1=10, the coefficient of quartile deviation is:",
    options: ["3", "1/3", "2/3", "1"],
    correctAnswer: 1,
    category: "Statistics"
  },
  {
    id: 28,
    question: "The variance is zero only if all observations are the:",
    options: ["Different", "Square", "Square Root", "Same"],
    correctAnswer: 3,
    category: "Statistics"
  },
  {
    id: 29,
    question: "If there are ten values each equal to 10, then standard deviation of these values is:",
    options: ["100", "2", "10", "0"],
    correctAnswer: 3,
    category: "Statistics"
  },
  {
    id: 30,
    question: "The ratio of the standard deviation to the arithmetic mean expressed as a percentage is called:",
    options: ["Coefficient of standard deviation", "Coefficient of skewness", "Coefficient of kurtosis", "Coefficient of variation"],
    correctAnswer: 3,
    category: "Statistics"
  },
  {
    id: 31,
    question: "The standard deviation of -5, -5, -5, -5, 5 is:",
    options: ["-5", "+5", "0", "-25"],
    correctAnswer: 1,
    category: "Statistics"
  },
  {
    id: 32,
    question: "If x = Rs.20, σ = Rs.10, then coefficient of variation is:",
    options: ["45%", "50%", "60%", "65%"],
    correctAnswer: 1,
    category: "Statistics"
  },
  {
    id: 33,
    question: "Departure from symmetry is called:",
    options: ["Second moment", "Kurtosis", "Skewness", "Variation"],
    correctAnswer: 2,
    category: "Statistics"
  },
  {
    id: 34,
    question: "The class mark of the class 120 - 150 is:",
    options: ["120", "130", "135", "150"],
    correctAnswer: 2,
    category: "Statistics"
  },
  {
    id: 35,
    question: "The middle value of the observed series is:",
    options: ["Median", "5th Decile", "50th Percentile", "All of the above"],
    correctAnswer: 3,
    category: "Statistics"
  },
  {
    id: 36,
    question: "The class mark of a class interval is:",
    options: ["upper limit + lower limit", "upper limit – lower limit", "1/2(upper limit + lower limit)", "1/2(upper limit – lower limit)"],
    correctAnswer: 2,
    category: "Statistics"
  },
  {
    id: 37,
    question: "If the arithmetic mean and harmonic mean of two positive numbers are 4 and 16, then their geometric mean will be:",
    options: ["4", "8", "16", "64"],
    correctAnswer: 1,
    category: "Statistics"
  },
  {
    id: 38,
    question: "The geometric mean and harmonic mean of two values are 8 and 16 respectively, then arithmetic mean of values is:",
    options: ["4", "16", "24", "128"],
    correctAnswer: 0,
    category: "Statistics"
  },
  {
    id: 39,
    question: "The information collected for statistical investigation is called _______",
    options: ["Number", "Data", "Sample", "None of these"],
    correctAnswer: 1,
    category: "Data Types"
  },
  {
    id: 40,
    question: "A variable which takes value within given range is called a _______ variable",
    options: ["Continuous", "Discrete", "Standard", "Constant"],
    correctAnswer: 0,
    category: "Data Types"
  },
  {
    id: 41,
    question: "The difference between upper limit and lower limit of a class is called _______",
    options: ["Frequency", "Class interval", "Midpoint", "Class width"],
    correctAnswer: 3,
    category: "Data Types"
  },
  {
    id: 42,
    question: "If the classes are 0-9, 10-19, 20-29, 30-39 etc.; then they are called as _______ type of classes.",
    options: ["Continuous", "Exclusive", "Open end", "Inclusive"],
    correctAnswer: 1,
    category: "Data Types"
  },
  {
    id: 43,
    question: "There are _______ type of cumulative frequencies.",
    options: ["2", "-2", "0", "4"],
    correctAnswer: 0,
    category: "Data Types"
  },
  {
    id: 44,
    question: "In histogram, _______ taken along x-axis",
    options: ["Frequency", "Class intervals", "Angles", "Variable"],
    correctAnswer: 1,
    category: "Data Types"
  },
  {
    id: 45,
    question: "The median, deciles, percentiles are all considered as _______",
    options: ["Mathematical average", "Population average", "Sample average", "Positional average"],
    correctAnswer: 3,
    category: "Statistics"
  },
  {
    id: 46,
    question: "The number of observations is 30 and the value of arithmetic mean is 15. Then the sum of all values is _______",
    options: ["15", "450", "200", "45"],
    correctAnswer: 1,
    category: "Statistics"
  },
  {
    id: 47,
    question: "The type of central tendency measures which divides datasets into hundred parts is classified as _______",
    options: ["Percentile", "Multiple of data", "Quartiles", "Deciles"],
    correctAnswer: 0,
    category: "Statistics"
  },
  {
    id: 48,
    question: "If X1 = 20, X2 = (-20), then A.M. = _______",
    options: ["0", "Infinity", "Unity", "Impossible"],
    correctAnswer: 0,
    category: "Statistics"
  },
  {
    id: 49,
    question: "The A.M. is 78 and C.V. is 12.3%. Then the standard deviation is _______",
    options: ["10.594", "9.594", "8.594", "11"],
    correctAnswer: 1,
    category: "Statistics"
  },
  {
    id: 50,
    question: "_________ Scale are used for labelling variables into distinct classifications",
    options: ["Nominal", "Ordinal", "Ratio", "Interval"],
    correctAnswer: 0,
    category: "Data Types"
  },
  {
    id: 51,
    question: "________ are used to arrange variables in a specific order?",
    options: ["Nominal scale", "Ordinal scale", "Ratio scale", "Interval scale"],
    correctAnswer: 1,
    category: "Data Types"
  },
  {
    id: 52,
    question: "Find the median of the set of numbers following cases 6, 3, 9, 12, 20, 7, 15, 18, 5",
    options: ["12", "7", "8.5", "9"],
    correctAnswer: 3,
    category: "Statistics"
  },
  {
    id: 53,
    question: "Find out an example for discrete variable?",
    options: ["The age of students in a school", "Weight", "Mark in an exam", "Distance"],
    correctAnswer: 2,
    category: "Data Types"
  },
  {
    id: 54,
    question: "Find out mode in the following distribution; 7, 3, 8, 4, 9, 13, 12, 4, 7, 16, 4.",
    options: ["7", "4", "8", "9"],
    correctAnswer: 1,
    category: "Statistics"
  },
  {
    id: 55,
    question: "One column in the data table is the daily temperature in degrees Celsius. What level of measurement is used here?",
    options: ["Interval", "Nominal", "Ordinal", "Ratio"],
    correctAnswer: 0,
    category: "Data Types"
  },
  {
    id: 56,
    question: "A headmaster measures many variables in their school. An example of a variable measured on a ratio scale is the",
    options: ["classroom temperature.", "Height of boys and girls in the school.", "Professional qualification of teachers.", "Teaching ability of teachers."],
    correctAnswer: 1,
    category: "Data Types"
  },
  {
    id: 57,
    question: "Which of the following concepts can be measured on the ratio scale of measurement?",
    options: ["Dancing ability", "Gender of student", "Temperature in degrees Celsius", "Weight of students"],
    correctAnswer: 3,
    category: "Data Types"
  },
  {
    id: 58,
    question: "Which of the variables can be classified as discrete?",
    options: ["Learner's height", "Mathematics achievement", "Number of textbooks", "Weight of learners"],
    correctAnswer: 2,
    category: "Data Types"
  },
  {
    id: 59,
    question: "Nationality is an example of what scale of measurement?",
    options: ["Interval", "Nominal", "Ordinal", "Ratio"],
    correctAnswer: 1,
    category: "Data Types"
  },
  {
    id: 60,
    question: "If the grading of diabetes is classified as mild, moderate and severe, the scale of measurement used is",
    options: ["interval scale", "nominal Scale", "ordinal Scale", "ratio Scale"],
    correctAnswer: 2,
    category: "Data Types"
  },
  {
    id: 61,
    question: "What is it called when the data is sourced from the place of origin?",
    options: ["Secondary", "Primary", "Secondary and primary", "All of the above"],
    correctAnswer: 1,
    category: "Data Types"
  },
  {
    id: 62,
    question: "Which one is the true example of primary data from the following options?",
    options: ["Journal", "Book", "Census Report", "Newspaper"],
    correctAnswer: 2,
    category: "Data Types"
  },
  {
    id: 63,
    question: "What is it called when the data source is gathered and compiled with others?",
    options: ["Primary Data", "Quantitative data", "Secondary data", "None of the above"],
    correctAnswer: 2,
    category: "Data Types"
  },
  {
    id: 64,
    question: "Which statistic can not be determined from a box plot representing the scores on a math test in Mrs. DeRidder's algebra class?",
    options: ["the lowest score", "the highest score", "the median score", "Mode"],
    correctAnswer: 3,
    category: "Statistics"
  },
  {
    id: 65,
    question: "In the box-and-whisker plot below, what is the 2nd quartile?",
    options: ["25", "45", "30", "50"],
    correctAnswer: 2,
    category: "Statistics"
  },
  {
    id: 66,
    question: "The box plot below summarizes the data for the amount of snowfall, in inches, during the winter of 2021 for 12 locations in western New York. What is the range?",
    options: ["30", "80", "110", "50"],
    correctAnswer: 2,
    category: "Statistics"
  },
  {
    id: 67,
    question: "The box-and-whisker plot below represents the results of tests scores in a math class. What do the scores 65, 85, and 100 represent?",
    options: ["Q1, median, Q3", "median, Q1, maximum", "Q1, Q3, maximum", "minimum, median, maximum"],
    correctAnswer: 2,
    category: "Statistics"
  },
  {
    id: 68,
    question: "Based on the box and whisker plot below, what is the range of the data?",
    options: ["42", "30", "20", "10"],
    correctAnswer: 0,
    category: "Statistics"
  },
  {
    id: 69,
    question: "An ___________ is a datapoint which lies far away from mainstream data.",
    options: ["Observation", "Outlier", "Variable", "All of the above"],
    correctAnswer: 1,
    category: "Statistics"
  },
  {
    id: 70,
    question: "If both variables X and Y increase or decrease simultaneously, then the coefficient of correlation will be:",
    options: ["Positive", "Negative", "No Correlation", "None of the above"],
    correctAnswer: 0,
    category: "Statistics"
  },
  {
    id: 71,
    question: "The value of correlation coefficient lies between:",
    options: ["0 to 1", "0 to -1", "-1 to 1", "1 to -10"],
    correctAnswer: 2,
    category: "Statistics"
  },
  {
    id: 72,
    question: "The correlation coefficient describes",
    options: ["Only magnitude", "Both magnitude and direction", "Only direction", "None of the preceding options."],
    correctAnswer: 1,
    category: "Statistics"
  },
  {
    id: 73,
    question: "When the values of two variables move in the same direction, correlation is said to be ........................",
    options: ["Linear", "Non-linear", "Positive", "Negative"],
    correctAnswer: 2,
    category: "Statistics"
  },
  {
    id: 74,
    question: "Pearson correlation coefficient if denoted by the symbol ...............",
    options: ["K", "r", "R", "None of these"],
    correctAnswer: 1,
    category: "Statistics"
  },
  {
    id: 75,
    question: "If r = +1, the correlation is said to be ...................",
    options: ["High degree of +ve correlation", "High degree of –ve correlation", "Perfect +ve correlation", "Perfect –ve correlation"],
    correctAnswer: 2,
    category: "Statistics"
  },
  {
    id: 76,
    question: "Spearman's Rank Correlation Coefficient is usually denoted by....................",
    options: ["k", "r", "S", "R"],
    correctAnswer: 3,
    category: "Statistics"
  },
  {
    id: 77,
    question: "Probability lies between:",
    options: ["-1 and +1", "0 and 1", "0 and n", "0 and ∞"],
    correctAnswer: 1,
    category: "Probability"
  },
  {
    id: 78,
    question: "The probability of an event cannot be:",
    options: ["Equal to zero", "Greater than zero", "Equal to one", "Less than zero"],
    correctAnswer: 3,
    category: "Probability"
  },
  {
    id: 79,
    question: "A set of all possible outcomes of an experiment is called:",
    options: ["Combination", "Sample point", "Sample space", "Compound event"],
    correctAnswer: 2,
    category: "Probability"
  },
  {
    id: 80,
    question: "An selection of objects without regard to order is called:",
    options: ["Permutation", "Combination", "Random experiment", "Sample point"],
    correctAnswer: 1,
    category: "Probability"
  },
  {
    id: 81,
    question: "If A is any event in S and Aᶜ its complement, then P(Aᶜ) is equal to:",
    options: ["1", "0", "1 - A", "1 - P(A)"],
    correctAnswer: 3,
    category: "Probability"
  },
  {
    id: 82,
    question: "When certainty is involved in a situation, its probability is equal to:",
    options: ["Zero", "Between -1 and +1", "Between 0 and 1", "One"],
    correctAnswer: 3,
    category: "Probability"
  },
  {
    id: 83,
    question: "The term 'event' is used for:",
    options: ["Time", "A sub-set of the sample space", "Probability", "Total number of outcomes."],
    correctAnswer: 1,
    category: "Probability"
  },
  {
    id: 84,
    question: "A letter is chosen at random from the word \"Statistics\". The probability of getting a vowel is:",
    options: ["1/10", "2/10", "3/10", "4/10"],
    correctAnswer: 2,
    category: "Probability"
  },
  {
    id: 85,
    question: "Two books are to be selected at random without replacement out of four books. Then number of possible selections are:",
    options: ["4", "2", "6", "3"],
    correctAnswer: 2,
    category: "Probability"
  },
  {
    id: 86,
    question: "When two coins are tossed, the possible outcomes are:",
    options: ["2", "4", "1", "None of them"],
    correctAnswer: 1,
    category: "Probability"
  },
  {
    id: 87,
    question: "Three books of different colours are to be arranged in a book-shelf. The possible arrangements are:",
    options: ["3", "1", "6", "2"],
    correctAnswer: 2,
    category: "Probability"
  },
  {
    id: 88,
    question: "Two events A and B are called mutually exclusive if:",
    options: ["A ∪ B = Φ", "A ∩ B = Φ", "A ∩ B = S", "A ∩ B = 1"],
    correctAnswer: 1,
    category: "Probability"
  },
  {
    id: 89,
    question: "Which of the following cannot be taken as probability of an event?",
    options: ["0", "0.5", "1", "-1"],
    correctAnswer: 3,
    category: "Probability"
  },
  {
    id: 90,
    question: "The derivative of a function primarily tells us about:",
    options: ["The average rate of change", "The slope of the tangent at a point", "The area under the curve", "The maximum and minimum values directly"],
    correctAnswer: 1,
    category: "Calculus"
  },
  {
    id: 91,
    question: "If f′(x) = 0 for all x in an interval, then f(x) is:",
    options: ["Increasing", "Decreasing", "Constant", "Oscillating"],
    correctAnswer: 2,
    category: "Calculus"
  },
  {
    id: 92,
    question: "A curve is concave up when:",
    options: ["f′′(x) < 0", "f′(x) > 0", "f′′(x) > 0", "f(x) > 0"],
    correctAnswer: 2,
    category: "Calculus"
  },
  {
    id: 93,
    question: "An asymptote is:",
    options: ["A line the graph touches at one point only", "A line that a curve approaches but does not usually touch", "A tangent line at maximum points", "A secant line through the curve"],
    correctAnswer: 1,
    category: "Calculus"
  },
  {
    id: 94,
    question: "Which of the following functions is most likely to have asymptotes?",
    options: ["Polynomial functions", "Rational functions", "Linear functions", "Constant functions"],
    correctAnswer: 1,
    category: "Calculus"
  },
  {
    id: 95,
    question: "A function f(x) is decreasing on an interval if:",
    options: ["f′(x) > 0", "f′(x) < 0", "f′′(x) > 0", "f(x) < 0"],
    correctAnswer: 1,
    category: "Calculus"
  },
  {
    id: 96,
    question: "If the first derivative of a function is positive on an interval, then the function is:",
    options: ["Constant", "Decreasing", "Increasing", "Concave up"],
    correctAnswer: 2,
    category: "Calculus"
  },
  {
    id: 97,
    question: "The second derivative test helps in:",
    options: ["Determining intervals of increase/decrease", "Determining concavity and local extrema", "Finding asymptotes", "Computing limits"],
    correctAnswer: 1,
    category: "Calculus"
  }
];