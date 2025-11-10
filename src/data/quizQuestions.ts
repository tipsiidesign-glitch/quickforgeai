export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What classification of programming language does Python belong to?",
    options: [
      "Low-level, compiled language",
      "High-level, interpreted language",
      "Assembly-level language",
      "Only object-oriented language"
    ],
    correctAnswer: 1,
    category: "Basics"
  },
  {
    id: 2,
    question: "Which symbol is used to write comments in Python?",
    options: ["//", "<!-- -->", "#", "/* */"],
    correctAnswer: 2,
    category: "Basics"
  },
  {
    id: 3,
    question: "Which of the following is a valid Python variable name?",
    options: ["2value", "my-var", "my_value", "my var"],
    correctAnswer: 2,
    category: "Variables"
  },
  {
    id: 4,
    question: "Which function is used to check the data type of a variable in Python?",
    options: ["datatype()", "checktype()", "typeof()", "type()"],
    correctAnswer: 3,
    category: "Data Types"
  },
  {
    id: 5,
    question: "What happens if you try to combine a string and an integer using the + operator in Python?",
    options: [
      "They get concatenated automatically",
      "Python throws an error",
      "The integer is converted to string automatically",
      "The integer is ignored"
    ],
    correctAnswer: 1,
    category: "Data Types"
  },
  {
    id: 6,
    question: "What are variables called in Python that are declared outside of a function?",
    options: ["Local variables", "Global variables", "Static variables", "Temporary variables"],
    correctAnswer: 1,
    category: "Variables"
  },
  {
    id: 7,
    question: "Explain the main purpose of control statements in Python.",
    options: ["Formatting text", "Directing program flow", "Defining variables", "Importing libraries"],
    correctAnswer: 1,
    category: "Control Flow"
  },
  {
    id: 8,
    question: "Which of the following is NOT a Python control statement?",
    options: ["if", "for", "switch", "while"],
    correctAnswer: 2,
    category: "Control Flow"
  },
  {
    id: 9,
    question: "Apply the correct Python keyword used to check multiple conditions in a program.",
    options: ["else-if", "elseif", "elif", "ifelse"],
    correctAnswer: 2,
    category: "Control Flow"
  },
  {
    id: 10,
    question: "Interpret the Python statement that skips the current iteration in a loop and proceeds to the next iteration.",
    options: ["break", "exit", "continue", "pass"],
    correctAnswer: 2,
    category: "Loops"
  },
  {
    id: 11,
    question: "Identify the Python statement that is used to exit a loop before it has finished all iterations.",
    options: ["stop", "end", "break", "return"],
    correctAnswer: 2,
    category: "Loops"
  },
  {
    id: 12,
    question: "Interpret the output of the function range(6) in Python.",
    options: ["0 to 6", "1 to 6", "0 to 5", "1 to 5"],
    correctAnswer: 2,
    category: "Functions"
  },
  {
    id: 13,
    question: "Explain what is meant by nested loops in Python programming.",
    options: [
      "Running a loop only once",
      "A loop inside another loop",
      "Using break and continue together",
      "Infinite looping"
    ],
    correctAnswer: 1,
    category: "Loops"
  },
  {
    id: 14,
    question: "Apply relational operators in Python and determine the output of the following expression: print(10 > 9)",
    options: ["9", "10", "True", "False"],
    correctAnswer: 2,
    category: "Operators"
  },
  {
    id: 15,
    question: "Identify the Python function used to evaluate a given value as either True or False.",
    options: ["eval()", "check()", "bool()", "type()"],
    correctAnswer: 2,
    category: "Boolean"
  },
  {
    id: 16,
    question: "Which statement about Python Booleans is correct?",
    options: [
      "Only integers can be True or False",
      "All non-empty values are considered True",
      "Empty values are considered True",
      "Strings always evaluate to False"
    ],
    correctAnswer: 1,
    category: "Boolean"
  },
  {
    id: 17,
    question: "Identify the default data type of the value returned by the input() function in Python.",
    options: ["int", "float", "string", "boolean"],
    correctAnswer: 2,
    category: "Input/Output"
  },
  {
    id: 18,
    question: "Which of the following is the correct way to ask the user for their name?",
    options: [
      "name = input(\"Enter your name:\")",
      "name = get(\"Enter your name:\")",
      "name = scan(\"Enter your name:\")",
      "name = str(\"Enter your name:\")"
    ],
    correctAnswer: 0,
    category: "Input/Output"
  },
  {
    id: 19,
    question: "Identify the operator used for exponentiation in Python.",
    options: ["Multiplication", "Modulus", "Exponentiation", "Floor division"],
    correctAnswer: 2,
    category: "Operators"
  },
  {
    id: 20,
    question: "Identify the operator used to find the remainder after division in Python.",
    options: ["//", "%", "/", "**"],
    correctAnswer: 1,
    category: "Operators"
  },
  {
    id: 21,
    question: "Which of the following evaluates to True?",
    options: ["2 > 3", "2 < 1", "2 >= 2", "3 != 3"],
    correctAnswer: 2,
    category: "Operators"
  },
  {
    id: 22,
    question: "Apply string comparison in Python and identify the expression that evaluates to True.",
    options: [
      "\"b\" < \"a\" is True",
      "\"a\" < \"b\" is True",
      "\"a\" > \"b\" is True",
      "\"a\" == \"b\" is True"
    ],
    correctAnswer: 1,
    category: "Strings"
  },
  {
    id: 23,
    question: "Identify the operator used to negate a Boolean value in Python.",
    options: ["~", "!", "not", "^"],
    correctAnswer: 2,
    category: "Boolean"
  },
  {
    id: 24,
    question: "What will the following code output? print(not (10 < 5))",
    options: ["True", "False", "Error", "None"],
    correctAnswer: 0,
    category: "Boolean"
  },
  {
    id: 25,
    question: "Explain how the mean is calculated in statistics.",
    options: [
      "The middle value of the dataset",
      "The sum of observations divided by total number of observations",
      "The most frequent value in the dataset",
      "The difference between maximum and minimum values"
    ],
    correctAnswer: 1,
    category: "Statistics"
  },
  {
    id: 26,
    question: "Apply a NumPy function in Python to calculate the mean of a dataset. Which function should be used?",
    options: ["np.average()", "np.mean()", "np.median()", "np.mode()"],
    correctAnswer: 1,
    category: "NumPy"
  },
  {
    id: 27,
    question: "Explain what the mode of a dataset represents.",
    options: [
      "The largest value",
      "The smallest value",
      "The most frequently occurring value",
      "The difference between highest and lowest values"
    ],
    correctAnswer: 2,
    category: "Statistics"
  },
  {
    id: 28,
    question: "Recall which Python library function(s) can be used to find the mode of a dataset.",
    options: [
      "numpy.mean()",
      "statistics.mode() or scipy.stats.mode()",
      "np.median()",
      "math.mode()"
    ],
    correctAnswer: 1,
    category: "Statistics"
  },
  {
    id: 29,
    question: "Recall which Python module provides the variance() function to calculate sample variance.",
    options: ["math", "statistics", "numpy", "scipy"],
    correctAnswer: 1,
    category: "Statistics"
  },
  {
    id: 30,
    question: "Which Python module is used to calculate variance in the example?",
    options: ["numpy", "scipy.stats", "statistics", "math"],
    correctAnswer: 2,
    category: "Statistics"
  },
  {
    id: 31,
    question: "What is a function in Python?",
    options: [
      "A sequence of loops",
      "A block of code that runs only when called",
      "A data type",
      "A built-in Python error"
    ],
    correctAnswer: 1,
    category: "Functions"
  },
  {
    id: 32,
    question: "Which of the following is a built-in function in Python?",
    options: ["my_function()", "range()", "calculator()", "course_func()"],
    correctAnswer: 1,
    category: "Functions"
  },
  {
    id: 33,
    question: "What keyword is used to define a function in Python?",
    options: ["func", "def", "define", "return"],
    correctAnswer: 1,
    category: "Functions"
  },
  {
    id: 34,
    question: "Explain the purpose of the return statement in Python functions.",
    options: [
      "To define the function name",
      "To execute the function body",
      "To send back a result from the function",
      "To loop through parameters"
    ],
    correctAnswer: 2,
    category: "Functions"
  },
  {
    id: 35,
    question: "Identify the function definition that includes parameters.",
    options: [
      "def message():",
      "def course_func(name, course_name):",
      "def calculator():",
      "def return():"
    ],
    correctAnswer: 1,
    category: "Functions"
  },
  {
    id: 36,
    question: "Identify the correct syntax for defining a default argument in Python functions.",
    options: ["def func(x = 5):", "def func(x 5):", "def func(x - 5):", "def func(x * 5):"],
    correctAnswer: 0,
    category: "Functions"
  },
  {
    id: 37,
    question: "What is a tuple in Python?",
    options: [
      "A mutable collection of items",
      "An unchangeable ordered collection of heterogeneous data",
      "A data structure that only holds integers",
      "A function that returns lists"
    ],
    correctAnswer: 1,
    category: "Tuples"
  },
  {
    id: 38,
    question: "Which of the following is a characteristic of tuples?",
    options: [
      "Tuples are unordered",
      "Tuples can only store data of the same type",
      "Tuples are mutable",
      "Tuples can contain duplicates"
    ],
    correctAnswer: 3,
    category: "Tuples"
  },
  {
    id: 39,
    question: "Recall the syntax used to create a tuple in Python.",
    options: [
      "By using square brackets []",
      "By using curly braces {}",
      "By enclosing comma-separated items inside parentheses ()",
      "By writing items without separators"
    ],
    correctAnswer: 2,
    category: "Tuples"
  },
  {
    id: 40,
    question: "Identify the correct syntax for creating a single-item tuple in Python.",
    options: ["('Hello')", "('Hello',)", "('Hello';)", "('Hello'!)"],
    correctAnswer: 1,
    category: "Tuples"
  },
  {
    id: 41,
    question: "Explain the concept of tuple unpacking in Python.",
    options: [
      "Assigning tuple items to separate variables",
      "Adding multiple items into a tuple",
      "Sorting a tuple",
      "Checking if an item exists in a tuple"
    ],
    correctAnswer: 0,
    category: "Tuples"
  },
  {
    id: 42,
    question: "What will len(('P', 'Y', 'T', 'H', 'O', 'N')) return?",
    options: ["5", "6", "7", "0"],
    correctAnswer: 1,
    category: "Tuples"
  },
  {
    id: 43,
    question: "Recall how to create sets in Python.",
    options: [
      "Using square brackets []",
      "Using parentheses ()",
      "Using curly brackets {} or the set() constructor",
      "Using angle brackets <>"
    ],
    correctAnswer: 2,
    category: "Sets"
  },
  {
    id: 44,
    question: "Explain how to check membership in a Python set.",
    options: [
      "Using the find() method",
      "Using the in operator",
      "Using indexing with []",
      "By converting the set into a list first"
    ],
    correctAnswer: 1,
    category: "Sets"
  },
  {
    id: 45,
    question: "Explain why items cannot be added or removed from tuples.",
    options: [
      "Because tuples are sorted",
      "Because tuples are immutable",
      "Because tuples don't support indexing",
      "Because tuples can't store different types"
    ],
    correctAnswer: 1,
    category: "Tuples"
  },
  {
    id: 46,
    question: "Which method is used to add a single item to a set?",
    options: ["append()", "add()", "insert()", "push()"],
    correctAnswer: 1,
    category: "Sets"
  },
  {
    id: 47,
    question: "Which method is used to add multiple items to a set at once?",
    options: ["add()", "extend()", "update()", "insert()"],
    correctAnswer: 2,
    category: "Sets"
  },
  {
    id: 48,
    question: "Which method removes an item from a set without raising an error if the item does not exist?",
    options: ["remove()", "pop()", "discard()", "delete()"],
    correctAnswer: 2,
    category: "Sets"
  },
  {
    id: 49,
    question: "Identify the correct property of dictionary keys in Python.",
    options: [
      "Keys must be mutable types like lists",
      "Keys must be unique and immutable types",
      "Keys can be repeated",
      "Keys cannot be strings"
    ],
    correctAnswer: 1,
    category: "Dictionaries"
  },
  {
    id: 50,
    question: "Which of the following is the safest way to access the value of a key in a Python dictionary, especially when the key might not exist?",
    options: [
      "person['name']",
      "person.get('name')",
      "person.lookup('name')",
      "retrieve(person, 'name')"
    ],
    correctAnswer: 1,
    category: "Dictionaries"
  },
  {
    id: 51,
    question: "Which method returns all keys in a dictionary?",
    options: ["keys()", "values()", "items()", "all()"],
    correctAnswer: 0,
    category: "Dictionaries"
  },
  {
    id: 52,
    question: "Which method returns all key-value pairs in a dictionary?",
    options: ["keys()", "values()", "items()", "get()"],
    correctAnswer: 2,
    category: "Dictionaries"
  },
  {
    id: 53,
    question: "Which of the following methods correctly describes how to change the value associated with a key in a Python dictionary?",
    options: ["Using update()", "Using append()", "Using remove()", "Using copy()"],
    correctAnswer: 0,
    category: "Dictionaries"
  },
  {
    id: 54,
    question: "Which method removes the last inserted item from a dictionary?",
    options: ["pop()", "popitem()", "remove()", "clear()"],
    correctAnswer: 1,
    category: "Dictionaries"
  },
  {
    id: 55,
    question: "What technique uses an underscore to separate words in variable names?",
    options: ["Camel Case", "Pascal Case", "Snake Case", "Upper Case"],
    correctAnswer: 2,
    category: "Best Practices"
  },
  {
    id: 56,
    question: "Which keyword is used when we want an empty loop body without errors?",
    options: ["break", "continue", "null", "pass"],
    correctAnswer: 3,
    category: "Control Flow"
  },
  {
    id: 57,
    question: "What is the benefit of using functions?",
    options: [
      "Functions make the code shorter and reusable",
      "Functions slow down the program",
      "Functions reduce memory usage only",
      "Functions are only used for debugging"
    ],
    correctAnswer: 0,
    category: "Functions"
  },
  {
    id: 58,
    question: "Which of the following statements is true about tuple indexing?",
    options: [
      "Indexing starts from 1",
      "Indexing starts from 0",
      "Indexing is optional",
      "Indexing can be done using strings"
    ],
    correctAnswer: 1,
    category: "Tuples"
  },
  {
    id: 59,
    question: "Which method should you use to create an empty set in Python?",
    options: ["empty_set = {}", "empty_set = set()", "empty_set = []", "empty_set = \"\""],
    correctAnswer: 1,
    category: "Sets"
  },
  {
    id: 60,
    question: "Which method should you use to remove all items from a dictionary while preserving the dictionary object?",
    options: ["person.clear()", "del person", "person.remove()", "person.pop()"],
    correctAnswer: 0,
    category: "Dictionaries"
  }
];