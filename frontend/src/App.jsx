import React, { useEffect, useState } from "react";
import Register from "./Register";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";

/* =========================================================
   QUIZ GENERATOR
   Creates a real knowledge-based 10-question test from
   the actual lesson content of each technology.
========================================================= */

const shuffle = (items) => {
  const copy = [...items];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
};


const buildOptions = (correct, pool) => {
  const uniquePool = [
    ...new Set(
      pool.filter(
        (item) =>
          item &&
          item !== correct
      )
    )
  ];

  const selected = shuffle(uniquePool).slice(0, 3);

  while (selected.length < 3) {
    selected.push(
      "None of the above"
    );
  }

  return shuffle([
    correct,
    ...selected
  ]);
};


const makeQuestion = (
  question,
  correct,
  distractors
) => {
  const options = buildOptions(
    correct,
    distractors
  );

  return {
    question,
    options,
    answer: options.indexOf(correct)
  };
};


const makeQuiz = (
  technologyName,
  topics
) => {
  if (!topics || topics.length === 0) {
    return [];
  }

  const definitions = topics.map(
    (item) => item.definition
  );

  const syntaxes = topics.map(
    (item) => item.syntax
  );

  const points = topics.flatMap(
    (item) => item.points || []
  );

  const examples = topics.map(
    (item) => item.example
  );

  const questions = [];

  topics.forEach((item) => {
    questions.push(
      makeQuestion(
        `What is the main purpose of "${item.title}" in ${technologyName}?`,
        item.definition,
        definitions
      )
    );

    questions.push(
      makeQuestion(
        `Which syntax/example is associated with "${item.title}"?`,
        item.syntax,
        syntaxes
      )
    );

    if (item.points?.length) {
      questions.push(
        makeQuestion(
          `Which statement is correct about "${item.title}"?`,
          item.points[0],
          points
        )
      );
    }

    questions.push(
      makeQuestion(
        `Which example best matches "${item.title}"?`,
        item.example,
        examples
      )
    );
  });

  /*
     Shuffle the real knowledge questions and keep exactly
     10 questions for every technology.
  */
  return shuffle(questions).slice(
    0,
    Math.min(10, questions.length)
  );
};


/* =========================================================
   CAREER DATA
========================================================= */

const careers = [

  /* =======================================================
     WEB DEVELOPER
  ======================================================= */

  {
    name: "Web Developer",
    icon: "🌐",
    description:
      "Build websites and modern web applications.",

    roadmap: [

      {
        name: "HTML",
        icon: "🌐",

        topics: [
          {
            title: "Introduction to HTML",
            definition:
              "HTML stands for HyperText Markup Language. It is used to create the structure of web pages.",
            syntax:
              "<tag>Content</tag>",
            points: [
              "HTML is a markup language.",
              "HTML creates the structure of a webpage.",
              "HTML uses elements and tags.",
              "HTML works together with CSS and JavaScript."
            ],
            example:
`<!DOCTYPE html>
<html>
<head>
  <title>My Page</title>
</head>
<body>
  <h1>Hello World</h1>
</body>
</html>`
          },

          {
            title: "Document Structure",
            definition:
              "HTML document structure defines the basic layout of an HTML webpage.",
            syntax:
              "<!DOCTYPE html>\n<html>\n<head></head>\n<body></body>\n</html>",
            points: [
              "DOCTYPE defines the HTML version.",
              "html is the root element.",
              "head contains page information.",
              "body contains visible content."
            ],
            example:
`<!DOCTYPE html>
<html>
<head>
  <title>Website</title>
</head>

<body>
  <h1>Welcome</h1>
</body>
</html>`
          },

          {
            title: "Headings and Paragraphs",
            definition:
              "Headings and paragraphs are used to organize and display text content.",
            syntax:
              "<h1>Heading</h1>\n<p>Paragraph</p>",
            points: [
              "HTML provides h1 to h6 headings.",
              "h1 is the largest heading.",
              "p is used for paragraphs.",
              "Good headings improve page structure."
            ],
            example:
`<h1>My Website</h1>
<h2>About Me</h2>
<p>I am learning web development.</p>`
          },

          {
            title: "Links",
            definition:
              "Links allow users to navigate from one webpage to another webpage or resource.",
            syntax:
              '<a href="URL">Link Text</a>',
            points: [
              "The a tag creates a link.",
              "href contains the destination.",
              "Links can open other pages.",
              "Links can also point to sections."
            ],
            example:
`<a href="https://example.com">
  Visit Website
</a>`
          },

          {
            title: "Images",
            definition:
              "The image element is used to display images on a webpage.",
            syntax:
              '<img src="image.jpg" alt="Description">',
            points: [
              "img displays an image.",
              "src specifies image location.",
              "alt provides alternative text.",
              "Images can improve visual presentation."
            ],
            example:
`<img
  src="photo.jpg"
  alt="My Photo"
  width="300"
/>`
          },

          {
            title: "Lists",
            definition:
              "Lists are used to display related items in an organized way.",
            syntax:
              "<ul><li>Item</li></ul>",
            points: [
              "ul creates an unordered list.",
              "ol creates an ordered list.",
              "li represents a list item.",
              "Lists are useful for menus and information."
            ],
            example:
`<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>`
          },

          {
            title: "Tables",
            definition:
              "HTML tables are used to display data in rows and columns.",
            syntax:
              "<table><tr><td>Data</td></tr></table>",
            points: [
              "table creates a table.",
              "tr creates a row.",
              "th creates a heading cell.",
              "td creates a data cell."
            ],
            example:
`<table>
  <tr>
    <th>Name</th>
    <th>Age</th>
  </tr>

  <tr>
    <td>Rahul</td>
    <td>20</td>
  </tr>
</table>`
          },

          {
            title: "Forms",
            definition:
              "HTML forms collect information from users.",
            syntax:
              '<form><input type="text"></form>',
            points: [
              "form creates a form.",
              "input collects user data.",
              "button submits an action.",
              "Forms are commonly used for login and registration."
            ],
            example:
`<form>
  <input type="text" placeholder="Name">

  <input
    type="email"
    placeholder="Email"
  >

  <button>Submit</button>
</form>`
          },

          {
            title: "Semantic HTML",
            definition:
              "Semantic HTML uses meaningful elements that describe the purpose of content.",
            syntax:
              "<header>...</header>\n<main>...</main>\n<footer>...</footer>",
            points: [
              "Semantic elements have meaningful names.",
              "They improve readability.",
              "They help accessibility.",
              "Examples include header, nav, main and footer."
            ],
            example:
`<header>
  <h1>My Website</h1>
</header>

<main>
  <p>Welcome to my website.</p>
</main>

<footer>
  Copyright 2026
</footer>`
          }
        ]
      },


      /* CSS */

      {
        name: "CSS",
        icon: "🎨",

        topics: [
          {
            title: "Introduction to CSS",
            definition:
              "CSS stands for Cascading Style Sheets. It is used to style HTML elements.",
            syntax:
              "selector {\n  property: value;\n}",
            points: [
              "CSS controls webpage appearance.",
              "CSS can change colors and sizes.",
              "CSS controls spacing and layout.",
              "CSS works with HTML."
            ],
            example:
`p {
  color: blue;
  font-size: 20px;
}`
          },

          {
            title: "CSS Selectors",
            definition:
              "CSS selectors are used to select HTML elements for styling.",
            syntax:
              "selector {\n  property: value;\n}",
            points: [
              "Element selector selects tags.",
              "Class selector uses a dot.",
              "ID selector uses a hash.",
              "Selectors target specific elements."
            ],
            example:
`.title {
  color: red;
}

#main {
  background: white;
}

p {
  font-size: 18px;
}`
          },

          {
            title: "Box Model",
            definition:
              "The CSS box model describes how elements are represented as boxes.",
            syntax:
              "margin + border + padding + content",
            points: [
              "Content is the actual element content.",
              "Padding is inside spacing.",
              "Border surrounds the element.",
              "Margin creates outside spacing."
            ],
            example:
`.box {
  width: 300px;
  padding: 20px;
  border: 2px solid black;
  margin: 20px;
}`
          },

          {
            title: "Flexbox",
            definition:
              "Flexbox is a CSS layout system used to arrange elements in one dimension.",
            syntax:
              "display: flex;",
            points: [
              "Flexbox is useful for layouts.",
              "It works with rows and columns.",
              "justify-content controls main axis.",
              "align-items controls cross axis."
            ],
            example:
`.container {
  display: flex;
  justify-content: center;
  align-items: center;
}`
          },

          {
            title: "CSS Grid",
            definition:
              "CSS Grid is a two-dimensional layout system for rows and columns.",
            syntax:
              "display: grid;",
            points: [
              "Grid handles rows and columns.",
              "Grid is useful for page layouts.",
              "grid-template-columns defines columns.",
              "gap creates spacing."
            ],
            example:
`.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}`
          },

          {
            title: "Responsive Design",
            definition:
              "Responsive design makes websites work properly on different screen sizes.",
            syntax:
              "@media (max-width: 768px) { ... }",
            points: [
              "Responsive design supports mobile devices.",
              "Media queries are commonly used.",
              "Layouts can change based on screen size.",
              "Responsive websites improve user experience."
            ],
            example:
`@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
  }
}`
          }
        ]
      },


      /* JAVASCRIPT */

      {
        name: "JavaScript",
        icon: "⚡",

        topics: [
          {
            title: "Introduction to JavaScript",
            definition:
              "JavaScript is a programming language used to make websites interactive and dynamic.",
            syntax:
              "console.log('Hello');",
            points: [
              "JavaScript adds interactivity.",
              "It runs in browsers.",
              "It can manipulate HTML and CSS.",
              "It can also be used on servers with Node.js."
            ],
            example:
`console.log("Hello World");

alert("Welcome!");`
          },

          {
            title: "Variables",
            definition:
              "Variables are used to store data values in a program.",
            syntax:
              "let variableName = value;",
            points: [
              "let creates a variable.",
              "const creates a constant.",
              "Variables can store different data types.",
              "Variable names should be meaningful."
            ],
            example:
`let name = "Chhotu";
const age = 20;

console.log(name);
console.log(age);`
          },

          {
            title: "Conditions",
            definition:
              "Conditions allow a program to make decisions based on whether something is true or false.",
            syntax:
              "if (condition) {\n  // code\n}",
            points: [
              "if checks a condition.",
              "else handles another case.",
              "else if checks multiple conditions.",
              "Conditions are important for decision making."
            ],
            example:
`let age = 20;

if (age >= 18) {
  console.log("Adult");
} else {
  console.log("Minor");
}`
          },

          {
            title: "Functions",
            definition:
              "A function is a reusable block of code designed to perform a specific task.",
            syntax:
              "function name() {\n  // code\n}",
            points: [
              "Functions reduce repeated code.",
              "Functions can accept parameters.",
              "Functions can return values.",
              "Functions improve code organization."
            ],
            example:
`function greet(name) {
  return "Hello " + name;
}

console.log(greet("Chhotu"));`
          },

          {
            title: "Arrays",
            definition:
              "An array stores multiple values in a single variable.",
            syntax:
              "let fruits = ['Apple', 'Mango'];",
            points: [
              "Arrays store multiple values.",
              "Array indexes start from zero.",
              "Arrays have useful methods.",
              "Arrays can contain different values."
            ],
            example:
`let fruits = [
  "Apple",
  "Mango",
  "Banana"
];

console.log(fruits[0]);`
          },

          {
            title: "DOM",
            definition:
              "The DOM represents an HTML document as objects that JavaScript can manipulate.",
            syntax:
              "document.getElementById('id')",
            points: [
              "DOM allows JavaScript to access HTML.",
              "Elements can be changed dynamically.",
              "Events can be handled.",
              "DOM is important for interactive websites."
            ],
            example:
`const title =
  document.getElementById("title");

title.textContent =
  "Hello JavaScript";`
          }
        ]
      },


      /* GIT */

      {
        name: "Git & GitHub",
        icon: "🐙",

        topics: [
          {
            title: "Git Introduction",
            definition:
              "Git is a distributed version control system used to track changes in code.",
            syntax:
              "git init",
            points: [
              "Git tracks project changes.",
              "Git helps developers work safely.",
              "Git supports branches.",
              "Git can restore previous versions."
            ],
            example:
`git init
git add .
git commit -m "Initial commit"`
          },

          {
            title: "GitHub",
            definition:
              "GitHub is a platform for hosting and collaborating on Git repositories.",
            syntax:
              "git remote add origin URL",
            points: [
              "GitHub hosts repositories.",
              "Developers can share code.",
              "GitHub supports collaboration.",
              "Projects can be managed online."
            ],
            example:
`git remote add origin YOUR_REPOSITORY_URL
git push -u origin main`
          },

          {
            title: "Git Branches",
            definition:
              "Branches allow developers to work on different versions of a project independently.",
            syntax:
              "git branch feature",
            points: [
              "Branches isolate development.",
              "main is commonly the primary branch.",
              "Features can be developed separately.",
              "Branches can later be merged."
            ],
            example:
`git branch feature-login
git checkout feature-login`
          },

          {
            title: "Git Merge",
            definition:
              "Git merge combines changes from one branch into another branch.",
            syntax:
              "git merge branch-name",
            points: [
              "Merge combines branches.",
              "It integrates completed work.",
              "Merge conflicts can occur.",
              "Conflicts must be resolved carefully."
            ],
            example:
`git checkout main
git merge feature-login`
          }
        ]
      },


      /* REACT */

      {
        name: "React",
        icon: "⚛️",

        topics: [
          {
            title: "React Introduction",
            definition:
              "React is a JavaScript library for building user interfaces.",
            syntax:
              "function App() {\n  return <h1>Hello</h1>;\n}",
            points: [
              "React is component based.",
              "React uses JSX.",
              "React is commonly used for web applications.",
              "React applications can be highly interactive."
            ],
            example:
`function App() {
  return <h1>Hello React</h1>;
}

export default App;`
          },

          {
            title: "React Components",
            definition:
              "Components are reusable building blocks of a React application.",
            syntax:
              "function Component() { return (...) }",
            points: [
              "Components make code reusable.",
              "Components can receive data.",
              "Components return UI.",
              "Components can contain logic."
            ],
            example:
`function Welcome() {
  return <h1>Welcome</h1>;
}`
          },

          {
            title: "React Props",
            definition:
              "Props are used to pass data from one component to another.",
            syntax:
              "<Component name='Chhotu' />",
            points: [
              "Props are read-only.",
              "Props pass data to components.",
              "Props can contain strings and objects.",
              "Props improve component reusability."
            ],
            example:
`function User(props) {
  return <h2>Hello {props.name}</h2>;
}

<User name="Chhotu" />`
          },

          {
            title: "React State",
            definition:
              "State stores data that can change during the lifetime of a React component.",
            syntax:
              "const [value, setValue] = useState();",
            points: [
              "State stores changing data.",
              "useState is commonly used.",
              "Changing state causes re-rendering.",
              "State belongs to a component."
            ],
            example:
`const [count, setCount] =
  useState(0);

<button onClick={() =>
  setCount(count + 1)
}>
  {count}
</button>`
          }
        ]
      },


      /* NODE */

      {
        name: "Node.js",
        icon: "🟢",

        topics: [
          {
            title: "Node.js Introduction",
            definition:
              "Node.js is a JavaScript runtime used to execute JavaScript outside the browser.",
            syntax:
              "node app.js",
            points: [
              "Node.js runs JavaScript on the server.",
              "It is built on the V8 engine.",
              "Node.js is useful for backend development.",
              "It supports asynchronous programming."
            ],
            example:
`console.log("Node.js Server");`
          },

          {
            title: "NPM",
            definition:
              "NPM is a package manager used to install and manage JavaScript packages.",
            syntax:
              "npm install package-name",
            points: [
              "NPM manages packages.",
              "package.json stores project information.",
              "Dependencies can be installed using NPM.",
              "NPM is commonly used with Node.js."
            ],
            example:
`npm init -y
npm install express`
          },

          {
            title: "Express.js",
            definition:
              "Express.js is a web framework for Node.js used to build servers and APIs.",
            syntax:
              "app.get('/', (req, res) => {})",
            points: [
              "Express simplifies server development.",
              "It supports routes.",
              "It can create REST APIs.",
              "Middleware is an important Express concept."
            ],
            example:
`const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello Server");
});

app.listen(5000);`
          },

          {
            title: "REST API",
            definition:
              "A REST API allows applications to communicate using HTTP requests.",
            syntax:
              "GET /api/users",
            points: [
              "GET retrieves data.",
              "POST creates data.",
              "PUT updates data.",
              "DELETE removes data."
            ],
            example:
`app.get("/api/users", (req, res) => {
  res.json([
    { name: "Chhotu" }
  ]);
});`
          }
        ]
      },


      /* MONGODB */

      {
        name: "MongoDB",
        icon: "🍃",

        topics: [
          {
            title: "MongoDB Introduction",
            definition:
              "MongoDB is a NoSQL database that stores data in flexible document structures.",
            syntax:
              "db.collection.find()",
            points: [
              "MongoDB is a NoSQL database.",
              "It stores documents.",
              "Documents are similar to JSON objects.",
              "MongoDB is commonly used with Node.js."
            ],
            example:
`db.users.find()`
          },

          {
            title: "Documents and Collections",
            definition:
              "Documents store individual records while collections group related documents.",
            syntax:
              "db.users.insertOne({...})",
            points: [
              "Document is a data record.",
              "Collection contains documents.",
              "MongoDB does not require fixed table schemas.",
              "Documents can contain nested data."
            ],
            example:
`db.users.insertOne({
  name: "Chhotu",
  age: 20
})`
          },

          {
            title: "CRUD Operations",
            definition:
              "CRUD represents Create, Read, Update and Delete operations.",
            syntax:
              "insertOne(), find(), updateOne(), deleteOne()",
            points: [
              "Create adds data.",
              "Read retrieves data.",
              "Update changes data.",
              "Delete removes data."
            ],
            example:
`db.users.find()

db.users.updateOne(
  { name: "Chhotu" },
  { $set: { age: 21 } }
)`
          },

          {
            title: "MongoDB Queries",
            definition:
              "MongoDB queries are used to search and filter documents.",
            syntax:
              "db.users.find({ age: 20 })",
            points: [
              "Queries find matching documents.",
              "Filters can use conditions.",
              "MongoDB supports many query operators.",
              "Queries are useful for retrieving specific data."
            ],
            example:
`db.users.find({
  age: { $gte: 18 }
})`
          }
        ]
      }
    ]
  },


  /* =======================================================
     PYTHON DEVELOPER
  ======================================================= */

  {
    name: "Python Developer",
    icon: "🐍",
    description:
      "Learn Python programming and backend development.",

    roadmap: [

      {
        name: "Python Basics",
        icon: "🐍",

        topics: [
          {
            title: "Python Introduction",
            definition:
              "Python is a high-level programming language known for its simple and readable syntax.",
            syntax:
              'print("Hello World")',
            points: [
              "Python is easy to learn.",
              "Python is dynamically typed.",
              "Python supports multiple programming styles.",
              "Python is widely used in software development."
            ],
            example:
`print("Hello Chhotu")`
          },

          {
            title: "Variables and Data Types",
            definition:
              "Variables store data and Python supports several built-in data types.",
            syntax:
              "name = value",
            points: [
              "Variables store values.",
              "Python does not require explicit type declaration.",
              "Common types include int, float and string.",
              "Boolean values are True and False."
            ],
            example:
`name = "Chhotu"
age = 20
height = 5.8
student = True`
          },

          {
            title: "Conditions",
            definition:
              "Conditions allow Python programs to make decisions.",
            syntax:
              "if condition:\n    statement",
            points: [
              "if checks a condition.",
              "elif checks another condition.",
              "else handles the remaining case.",
              "Indentation is important in Python."
            ],
            example:
`age = 20

if age >= 18:
    print("Adult")
else:
    print("Minor")`
          },

          {
            title: "Loops",
            definition:
              "Loops repeat a block of code multiple times.",
            syntax:
              "for item in items:",
            points: [
              "for loops iterate over sequences.",
              "while loops run while a condition is true.",
              "break stops a loop.",
              "continue skips an iteration."
            ],
            example:
`for i in range(5):
    print(i)`
          },

          {
            title: "Functions",
            definition:
              "Functions are reusable blocks of Python code.",
            syntax:
              "def function_name():",
            points: [
              "Functions reduce repeated code.",
              "Functions can receive parameters.",
              "Functions can return values.",
              "Functions improve code organization."
            ],
            example:
`def greet(name):
    return "Hello " + name

print(greet("Chhotu"))`
          }
        ]
      },

      {
        name: "Python OOP",
        icon: "🧩",

        topics: [
          {
            title: "Class",
            definition:
              "A class is a blueprint for creating objects.",
            syntax:
              "class ClassName:",
            points: [
              "Classes define objects.",
              "Classes contain attributes and methods.",
              "Objects are created from classes.",
              "Classes support OOP."
            ],
            example:
`class Student:
    name = "Chhotu"

student = Student()
print(student.name)`
          },

          {
            title: "Object",
            definition:
              "An object is an instance of a class.",
            syntax:
              "object = ClassName()",
            points: [
              "Objects represent entities.",
              "Objects contain data.",
              "Objects can call methods.",
              "Objects are created from classes."
            ],
            example:
`class Car:
    pass

car = Car()`
          },

          {
            title: "Inheritance",
            definition:
              "Inheritance allows one class to reuse features of another class.",
            syntax:
              "class Child(Parent):",
            points: [
              "Inheritance promotes code reuse.",
              "Child classes inherit parent features.",
              "Python supports multiple inheritance.",
              "Inheritance is an OOP concept."
            ],
            example:
`class Animal:
    def speak(self):
        print("Animal")

class Dog(Animal):
    pass`
          },

          {
            title: "Encapsulation",
            definition:
              "Encapsulation combines data and methods and controls access to internal data.",
            syntax:
              "self.__variable",
            points: [
              "Encapsulation protects data.",
              "Double underscore can indicate private attributes.",
              "Methods can control access.",
              "It improves code organization."
            ],
            example:
`class Account:
    def __init__(self):
        self.__balance = 0`
          }
        ]
      },

      {
        name: "Django",
        icon: "🚀",

        topics: [
          {
            title: "Django Introduction",
            definition:
              "Django is a Python web framework used to build web applications.",
            syntax:
              "django-admin startproject project",
            points: [
              "Django is built with Python.",
              "It follows an organized architecture.",
              "Django includes many built-in features.",
              "It is useful for backend development."
            ],
            example:
`django-admin startproject myproject`
          },

          {
            title: "Django Models",
            definition:
              "Models define the structure of application data in Django.",
            syntax:
              "class ModelName(models.Model):",
            points: [
              "Models represent database data.",
              "Models use Python classes.",
              "Django can create database tables from models.",
              "Models simplify database interaction."
            ],
            example:
`class Student(models.Model):
    name = models.CharField(max_length=100)`
          },

          {
            title: "Django Views",
            definition:
              "Views contain the logic that handles requests and returns responses.",
            syntax:
              "def view(request):",
            points: [
              "Views handle requests.",
              "Views can return HTML.",
              "Views can return JSON.",
              "Views contain application logic."
            ],
            example:
`def home(request):
    return HttpResponse("Hello Django")`
          },

          {
            title: "Django URLs",
            definition:
              "URL configuration connects web addresses to Django views.",
            syntax:
              "path('home/', views.home)",
            points: [
              "URLs map paths to views.",
              "URL patterns define routes.",
              "Applications can have their own URLs.",
              "URLs help organize navigation."
            ],
            example:
`urlpatterns = [
    path("home/", views.home)
]`
          }
        ]
      }
    ]
  },


  /* =======================================================
     JAVA DEVELOPER
  ======================================================= */

  {
    name: "Java Developer",
    icon: "☕",
    description:
      "Learn Java programming and application development.",

    roadmap: [

      {
        name: "Java Fundamentals",
        icon: "☕",

        topics: [
          {
            title: "Java Introduction",
            definition:
              "Java is a high-level, object-oriented programming language.",
            syntax:
              "System.out.println(\"Hello\");",
            points: [
              "Java is object oriented.",
              "Java is platform independent through the JVM.",
              "Java is strongly typed.",
              "Java is widely used in enterprise applications."
            ],
            example:
`public class Main {
    public static void main(String[] args) {
        System.out.println("Hello");
    }
}`
          },

          {
            title: "Variables",
            definition:
              "Variables store values of specific data types.",
            syntax:
              "dataType variable = value;",
            points: [
              "Java requires data types.",
              "Variables store values.",
              "Common types include int and String.",
              "Variables can change unless final is used."
            ],
            example:
`int age = 20;
String name = "Chhotu";`
          },

          {
            title: "Conditions",
            definition:
              "Conditional statements allow Java programs to make decisions.",
            syntax:
              "if (condition) { }",
            points: [
              "if checks conditions.",
              "else handles alternatives.",
              "else if supports multiple conditions.",
              "Conditions are used in decision making."
            ],
            example:
`if (age >= 18) {
    System.out.println("Adult");
} else {
    System.out.println("Minor");
}`
          },

          {
            title: "Loops",
            definition:
              "Loops execute code repeatedly.",
            syntax:
              "for (int i = 0; i < 5; i++) { }",
            points: [
              "for is commonly used for counting.",
              "while runs while a condition is true.",
              "do-while executes at least once.",
              "break can stop loops."
            ],
            example:
`for (int i = 0; i < 5; i++) {
    System.out.println(i);
}`
          }
        ]
      },

      {
        name: "Java OOP",
        icon: "🧩",

        topics: [
          {
            title: "Classes and Objects",
            definition:
              "Classes define objects and objects are instances of classes.",
            syntax:
              "class Student { }\nStudent s = new Student();",
            points: [
              "Classes are blueprints.",
              "Objects are instances.",
              "Objects contain state and behavior.",
              "Java is object oriented."
            ],
            example:
`class Student {
    String name;
}

Student s = new Student();`
          },

          {
            title: "Inheritance",
            definition:
              "Inheritance allows a class to inherit features from another class.",
            syntax:
              "class Child extends Parent",
            points: [
              "Inheritance promotes reuse.",
              "extends is used for class inheritance.",
              "Child classes can add new features.",
              "Inheritance is an OOP concept."
            ],
            example:
`class Animal {
    void sound() {
        System.out.println("Sound");
    }
}

class Dog extends Animal {
}`
          },

          {
            title: "Polymorphism",
            definition:
              "Polymorphism allows one interface or method name to represent different behaviors.",
            syntax:
              "method overriding",
            points: [
              "Polymorphism means many forms.",
              "Java supports method overloading.",
              "Java supports method overriding.",
              "It improves flexibility."
            ],
            example:
`class Animal {
    void sound() {
        System.out.println("Animal");
    }
}

class Dog extends Animal {
    void sound() {
        System.out.println("Dog");
    }
}`
          },

          {
            title: "Encapsulation",
            definition:
              "Encapsulation protects data by controlling access through class methods.",
            syntax:
              "private variable + getter/setter",
            points: [
              "Data can be private.",
              "Getters can read data.",
              "Setters can modify data.",
              "Encapsulation improves security."
            ],
            example:
`class Student {
    private String name;

    public String getName() {
        return name;
    }
}`
          }
        ]
      },

      {
        name: "Advanced Java",
        icon: "⚙️",

        topics: [
          {
            title: "Exception Handling",
            definition:
              "Exception handling manages runtime errors in Java programs.",
            syntax:
              "try { } catch (Exception e) { }",
            points: [
              "try contains risky code.",
              "catch handles exceptions.",
              "finally can execute cleanup code.",
              "Exception handling prevents application crashes."
            ],
            example:
`try {
    int x = 10 / 0;
} catch (Exception e) {
    System.out.println("Error");
}`
          },

          {
            title: "Collections",
            definition:
              "Java Collections provide classes and interfaces for storing groups of objects.",
            syntax:
              "ArrayList<String> list = new ArrayList<>();",
            points: [
              "Collections manage groups of data.",
              "ArrayList is commonly used.",
              "HashMap stores key-value data.",
              "Collections provide useful methods."
            ],
            example:
`ArrayList<String> names =
    new ArrayList<>();

names.add("Chhotu");
names.add("Rahul");`
          },

          {
            title: "Multithreading",
            definition:
              "Multithreading allows multiple tasks to execute concurrently.",
            syntax:
              "class Task extends Thread",
            points: [
              "Threads perform tasks concurrently.",
              "Multithreading can improve responsiveness.",
              "Thread is a Java class.",
              "Synchronization may be required."
            ],
            example:
`class Task extends Thread {
    public void run() {
        System.out.println("Running");
    }
}`
          },

          {
            title: "JDBC",
            definition:
              "JDBC allows Java applications to communicate with databases.",
            syntax:
              "Connection connection = DriverManager.getConnection(...)",
            points: [
              "JDBC connects Java to databases.",
              "SQL queries can be executed.",
              "Connection manages database connection.",
              "ResultSet stores query results."
            ],
            example:
`Connection con =
    DriverManager.getConnection(
      url,
      user,
      password
    );`
          }
        ]
      }
    ]
  },


  /* =======================================================
     AI / ML ENGINEER
  ======================================================= */

  {
    name: "AI / ML Engineer",
    icon: "🤖",
    description:
      "Learn artificial intelligence and machine learning.",

    roadmap: [

      {
        name: "Python for AI",
        icon: "🐍",

        topics: [
          {
            title: "NumPy",
            definition:
              "NumPy is a Python library used for numerical and array-based computing.",
            syntax:
              "import numpy as np",
            points: [
              "NumPy provides arrays.",
              "It supports numerical operations.",
              "It is commonly used in data science.",
              "Many ML libraries use NumPy."
            ],
            example:
`import numpy as np

arr = np.array([1, 2, 3])

print(arr)`
          },

          {
            title: "Pandas",
            definition:
              "Pandas is a Python library used for data manipulation and analysis.",
            syntax:
              "import pandas as pd",
            points: [
              "Pandas provides DataFrame.",
              "It handles tabular data.",
              "It can read CSV files.",
              "It is widely used in data analysis."
            ],
            example:
`import pandas as pd

data = pd.read_csv("data.csv")

print(data.head())`
          },

          {
            title: "Data Cleaning",
            definition:
              "Data cleaning prepares raw data by fixing missing, duplicate or incorrect values.",
            syntax:
              "df.dropna()",
            points: [
              "Missing values can be handled.",
              "Duplicate data can be removed.",
              "Incorrect data can be corrected.",
              "Clean data improves analysis."
            ],
            example:
`df = df.dropna()
df = df.drop_duplicates()`
          },

          {
            title: "Data Visualization",
            definition:
              "Data visualization represents data using charts and graphs.",
            syntax:
              "plt.plot(data)",
            points: [
              "Charts make data easier to understand.",
              "Matplotlib is widely used.",
              "Graphs can show trends.",
              "Visualization supports analysis."
            ],
            example:
`import matplotlib.pyplot as plt

plt.plot([1, 2, 3, 4])
plt.show()`
          }
        ]
      },

      {
        name: "Machine Learning",
        icon: "🧠",

        topics: [
          {
            title: "Machine Learning Introduction",
            definition:
              "Machine learning enables computers to learn patterns from data.",
            syntax:
              "model.fit(X, y)",
            points: [
              "ML learns from data.",
              "Models identify patterns.",
              "Training uses data.",
              "Predictions are generated from learned patterns."
            ],
            example:
`model.fit(X_train, y_train)

prediction =
    model.predict(X_test)`
          },

          {
            title: "Supervised Learning",
            definition:
              "Supervised learning trains models using labeled data.",
            syntax:
              "model.fit(X, y)",
            points: [
              "Training data contains labels.",
              "Classification is supervised learning.",
              "Regression is supervised learning.",
              "The model learns input-output relationships."
            ],
            example:
`model.fit(X_train, y_train)`
          },

          {
            title: "Unsupervised Learning",
            definition:
              "Unsupervised learning finds patterns in data without labeled outputs.",
            syntax:
              "model.fit(X)",
            points: [
              "Data does not contain target labels.",
              "Clustering is common.",
              "The model finds hidden patterns.",
              "It is useful for segmentation."
            ],
            example:
`model.fit(X)`
          },

          {
            title: "Model Evaluation",
            definition:
              "Model evaluation measures how well a machine learning model performs.",
            syntax:
              "accuracy_score(y_true, y_pred)",
            points: [
              "Evaluation measures performance.",
              "Different tasks use different metrics.",
              "Accuracy is common for classification.",
              "Evaluation helps compare models."
            ],
            example:
`accuracy =
    accuracy_score(
      y_test,
      predictions
    )`
          }
        ]
      },

      {
        name: "Deep Learning",
        icon: "🧠",

        topics: [
          {
            title: "Neural Networks",
            definition:
              "Neural networks are machine learning models inspired by interconnected neurons.",
            syntax:
              "model = NeuralNetwork()",
            points: [
              "Neural networks contain layers.",
              "Layers contain neurons.",
              "Weights are learned during training.",
              "They are widely used in AI."
            ],
            example:
`Input
  ↓
Hidden Layer
  ↓
Output`
          },

          {
            title: "Deep Learning",
            definition:
              "Deep learning uses neural networks with multiple layers to learn complex patterns.",
            syntax:
              "model.fit(X, y)",
            points: [
              "Deep learning uses multiple layers.",
              "It can learn complex representations.",
              "Large datasets are often useful.",
              "It is used in vision and language."
            ],
            example:
`model.fit(
  X_train,
  y_train,
  epochs=10
)`
          },

          {
            title: "CNN",
            definition:
              "CNN is a neural network architecture commonly used for image-related tasks.",
            syntax:
              "Conv2D(filters, kernel_size)",
            points: [
              "CNN stands for Convolutional Neural Network.",
              "It is useful for image processing.",
              "Convolution extracts features.",
              "Pooling can reduce dimensions."
            ],
            example:
`model.add(
  Conv2D(
    32,
    (3, 3)
  )
)`
          },

          {
            title: "NLP",
            definition:
              "Natural Language Processing enables computers to work with human language.",
            syntax:
              "text → tokens → model",
            points: [
              "NLP works with text.",
              "Tokenization splits text.",
              "Language models process language.",
              "NLP is used in chatbots."
            ],
            example:
`text = "Hello Chhotu"

tokens = text.split()

print(tokens)`
          }
        ]
      }
    ]
  },


  /* =======================================================
     DATA ANALYST
  ======================================================= */

  {
    name: "Data Analyst",
    icon: "📊",
    description:
      "Learn data analysis, SQL, Excel and visualization.",

    roadmap: [

      {
        name: "Excel",
        icon: "📗",

        topics: [
          {
            title: "Excel Basics",
            definition:
              "Excel is a spreadsheet application used to organize and analyze data.",
            syntax:
              "=SUM(A1:A10)",
            points: [
              "Excel stores data in cells.",
              "Rows and columns organize data.",
              "Functions perform calculations.",
              "Excel is widely used in business."
            ],
            example:
`=SUM(A1:A10)
=AVERAGE(B1:B10)`
          },

          {
            title: "Excel Formulas",
            definition:
              "Excel formulas perform calculations using cell values.",
            syntax:
              "=A1+B1",
            points: [
              "Formulas start with =.",
              "Formulas can reference cells.",
              "Functions simplify calculations.",
              "Formulas update when data changes."
            ],
            example:
`=A1+B1
=SUM(A1:A10)
=MAX(B1:B10)`
          },

          {
            title: "Excel Pivot Table",
            definition:
              "Pivot tables summarize and analyze large amounts of data.",
            syntax:
              "Insert → Pivot Table",
            points: [
              "Pivot tables summarize data.",
              "They can group information.",
              "They support filtering.",
              "They are useful for reports."
            ],
            example:
`Sales Data
   ↓
Pivot Table
   ↓
Total Sales by Month`
          },

          {
            title: "Excel Charts",
            definition:
              "Charts visually represent data in Excel.",
            syntax:
              "Insert → Chart",
            points: [
              "Charts make data easier to understand.",
              "Bar charts compare values.",
              "Line charts show trends.",
              "Pie charts show proportions."
            ],
            example:
`Data
 ↓
Insert Chart
 ↓
Bar / Line / Pie`
          }
        ]
      },

      {
        name: "SQL",
        icon: "🗄️",

        topics: [
          {
            title: "SQL Introduction",
            definition:
              "SQL is a language used to communicate with relational databases.",
            syntax:
              "SELECT * FROM users;",
            points: [
              "SQL works with databases.",
              "SELECT retrieves data.",
              "SQL can filter data.",
              "SQL can modify data."
            ],
            example:
`SELECT *
FROM users;`
          },

          {
            title: "SELECT Query",
            definition:
              "SELECT is used to retrieve data from a database.",
            syntax:
              "SELECT column FROM table;",
            points: [
              "SELECT retrieves columns.",
              "Multiple columns can be selected.",
              "WHERE can filter results.",
              "ORDER BY can sort results."
            ],
            example:
`SELECT name, age
FROM users;`
          },

          {
            title: "WHERE Clause",
            definition:
              "WHERE filters records based on a condition.",
            syntax:
              "SELECT * FROM table WHERE condition;",
            points: [
              "WHERE filters records.",
              "Comparison operators can be used.",
              "Multiple conditions can be combined.",
              "WHERE is useful for targeted queries."
            ],
            example:
`SELECT *
FROM users
WHERE age >= 18;`
          },

          {
            title: "SQL JOIN",
            definition:
              "JOIN combines related data from multiple tables.",
            syntax:
              "SELECT * FROM A JOIN B ON A.id = B.id;",
            points: [
              "JOIN combines tables.",
              "INNER JOIN returns matching records.",
              "LEFT JOIN keeps records from the left table.",
              "JOIN is important for relational databases."
            ],
            example:
`SELECT users.name,
       orders.amount
FROM users
JOIN orders
ON users.id = orders.user_id;`
          }
        ]
      },

      {
        name: "Python Data Analysis",
        icon: "🐍",

        topics: [
          {
            title: "Pandas",
            definition:
              "Pandas is used to manipulate and analyze structured data in Python.",
            syntax:
              "import pandas as pd",
            points: [
              "Pandas provides DataFrame.",
              "It can read CSV files.",
              "It supports filtering.",
              "It supports data transformation."
            ],
            example:
`import pandas as pd

df = pd.read_csv("data.csv")
print(df.head())`
          },

          {
            title: "DataFrame",
            definition:
              "A DataFrame is a two-dimensional table-like data structure in Pandas.",
            syntax:
              "pd.DataFrame(data)",
            points: [
              "DataFrame contains rows and columns.",
              "Columns can have different data types.",
              "DataFrame supports filtering.",
              "It is central to Pandas."
            ],
            example:
`data = {
  "name": ["A", "B"],
  "age": [20, 21]
}

df = pd.DataFrame(data)`
          },

          {
            title: "Data Cleaning",
            definition:
              "Data cleaning removes or fixes incorrect and missing data.",
            syntax:
              "df.dropna()",
            points: [
              "Missing values can be removed.",
              "Missing values can also be filled.",
              "Duplicate records can be removed.",
              "Cleaning improves data quality."
            ],
            example:
`df = df.dropna()
df = df.drop_duplicates()`
          },

          {
            title: "Data Filtering",
            definition:
              "Data filtering selects rows that satisfy a condition.",
            syntax:
              "df[df['age'] > 18]",
            points: [
              "Filtering selects required records.",
              "Conditions can be combined.",
              "Filtering helps analysis.",
              "Pandas supports powerful filtering."
            ],
            example:
`adults =
  df[df["age"] >= 18]`
          }
        ]
      },

      {
        name: "Data Visualization",
        icon: "📈",

        topics: [
          {
            title: "Matplotlib",
            definition:
              "Matplotlib is a Python library for creating charts and visualizations.",
            syntax:
              "import matplotlib.pyplot as plt",
            points: [
              "Matplotlib creates graphs.",
              "Line charts can show trends.",
              "Bar charts compare values.",
              "Plots help understand data."
            ],
            example:
`import matplotlib.pyplot as plt

plt.plot([1, 2, 3])
plt.show()`
          },

          {
            title: "Line Chart",
            definition:
              "A line chart displays values connected by lines to show trends.",
            syntax:
              "plt.plot(x, y)",
            points: [
              "Line charts show trends.",
              "They are useful for time series.",
              "Values are connected.",
              "Axes provide context."
            ],
            example:
`plt.plot(
  [1, 2, 3, 4],
  [10, 20, 15, 30]
)

plt.show()`
          },

          {
            title: "Bar Chart",
            definition:
              "A bar chart compares values across categories.",
            syntax:
              "plt.bar(x, y)",
            points: [
              "Bars represent values.",
              "Categories can be compared.",
              "Bar charts are easy to read.",
              "They are useful for comparisons."
            ],
            example:
`plt.bar(
  ["A", "B", "C"],
  [10, 20, 15]
)

plt.show()`
          },

          {
            title: "Dashboard",
            definition:
              "A dashboard combines important data visualizations and metrics in one place.",
            syntax:
              "Data → Charts → Dashboard",
            points: [
              "Dashboards summarize information.",
              "They display important metrics.",
              "Charts help decision making.",
              "Dashboards are common in business analytics."
            ],
            example:
`Sales
Users
Revenue
Orders

       ↓

Analytics Dashboard`
          }
        ]
      }
    ]
  },


  /* =======================================================
     APP DEVELOPER
  ======================================================= */

  {
    name: "App Developer",
    icon: "📱",
    description:
      "Learn mobile application development.",

    roadmap: [

      {
        name: "Dart",
        icon: "🎯",

        topics: [
          {
            title: "Dart Introduction",
            definition:
              "Dart is a programming language commonly used for Flutter application development.",
            syntax:
              "void main() { }",
            points: [
              "Dart is used with Flutter.",
              "It is object oriented.",
              "Dart has strong typing.",
              "Dart supports asynchronous programming."
            ],
            example:
`void main() {
  print("Hello Dart");
}`
          },

          {
            title: "Dart Variables",
            definition:
              "Variables in Dart store values used by programs.",
            syntax:
              "var name = value;",
            points: [
              "var can infer type.",
              "final creates a runtime constant.",
              "const creates a compile-time constant.",
              "Dart supports explicit types."
            ],
            example:
`String name = "Chhotu";
int age = 20;`
          },

          {
            title: "Dart Functions",
            definition:
              "Functions are reusable blocks of Dart code.",
            syntax:
              "returnType functionName() {}",
            points: [
              "Functions reduce repeated code.",
              "Functions can have parameters.",
              "Functions can return values.",
              "Functions improve organization."
            ],
            example:
`String greet(String name) {
  return "Hello $name";
}`
          },

          {
            title: "Dart Classes",
            definition:
              "Classes define objects and their behavior in Dart.",
            syntax:
              "class ClassName {}",
            points: [
              "Classes are blueprints.",
              "Objects are instances.",
              "Classes contain properties.",
              "Classes contain methods."
            ],
            example:
`class Student {
  String name = "Chhotu";
}`
          }
        ]
      },

      {
        name: "Flutter",
        icon: "🦋",

        topics: [
          {
            title: "Flutter Introduction",
            definition:
              "Flutter is a UI toolkit used to build cross-platform applications.",
            syntax:
              "void main() => runApp(MyApp());",
            points: [
              "Flutter uses Dart.",
              "Flutter supports multiple platforms.",
              "Flutter uses widgets.",
              "Flutter can build Android and iOS apps."
            ],
            example:
`void main() {
  runApp(
    const MyApp()
  );
}`
          },

          {
            title: "Flutter Widgets",
            definition:
              "Widgets are the basic building blocks of Flutter user interfaces.",
            syntax:
              "Widget build(BuildContext context)",
            points: [
              "Everything in Flutter is a widget.",
              "Widgets describe UI.",
              "Widgets can be reusable.",
              "Flutter has many built-in widgets."
            ],
            example:
`Text(
  "Hello Flutter"
)`
          },

          {
            title: "Flutter Layout",
            definition:
              "Flutter layout widgets arrange elements on the screen.",
            syntax:
              "Row(children: [])",
            points: [
              "Row arranges horizontally.",
              "Column arranges vertically.",
              "Container provides styling and layout.",
              "Expanded can control available space."
            ],
            example:
`Column(
  children: [
    Text("Name"),
    Text("Age")
  ]
)`
          },

          {
            title: "Flutter Navigation",
            definition:
              "Navigation allows users to move between different screens in an application.",
            syntax:
              "Navigator.push(...)",
            points: [
              "Navigator manages screens.",
              "Routes represent pages.",
              "push opens a new screen.",
              "pop returns to the previous screen."
            ],
            example:
`Navigator.push(
  context,
  MaterialPageRoute(
    builder: (_) => HomePage()
  )
);`
          }
        ]
      },

      {
        name: "Mobile App Features",
        icon: "📲",

        topics: [
          {
            title: "Login and Registration",
            definition:
              "Login and registration allow users to create accounts and securely access applications.",
            syntax:
              "email + password → authentication",
            points: [
              "Registration creates an account.",
              "Login verifies user credentials.",
              "Authentication protects user accounts.",
              "Backend APIs commonly handle authentication."
            ],
            example:
`Email
Password
   ↓
Login API
   ↓
User Dashboard`
          },

          {
            title: "API Integration",
            definition:
              "API integration allows mobile applications to communicate with backend services.",
            syntax:
              "GET /api/users",
            points: [
              "Apps can request data from APIs.",
              "HTTP is commonly used.",
              "JSON is commonly exchanged.",
              "APIs connect frontend and backend."
            ],
            example:
`App
 ↓
HTTP Request
 ↓
Backend API
 ↓
JSON Response`
          },

          {
            title: "Local Storage",
            definition:
              "Local storage allows applications to save data on the device.",
            syntax:
              "save(key, value)",
            points: [
              "Local storage saves data locally.",
              "It can store preferences.",
              "It can remember login state.",
              "Different platforms provide different storage solutions."
            ],
            example:
`theme = "dark"

save(
  "theme",
  theme
)`
          },

          {
            title: "Push Notifications",
            definition:
              "Push notifications send messages or alerts to users' devices.",
            syntax:
              "sendNotification(message)",
            points: [
              "Notifications inform users.",
              "They can be sent remotely.",
              "Apps can respond to notifications.",
              "Notifications are useful for reminders and updates."
            ],
            example:
`New Message
      ↓
Push Notification
      ↓
User Phone`
          }
        ]
      }
    ]
  }
];


/* =========================================================
   ADD A REAL KNOWLEDGE-BASED QUIZ TO EVERY TECHNOLOGY
========================================================= */

careers.forEach((career) => {
  career.roadmap.forEach((technology) => {
    technology.quiz = makeQuiz(
      technology.name,
      technology.topics
    );
  });
});


/* =========================================================
   MAIN APP
========================================================= */

function App() {
  if (window.location.pathname === "/register") {
  return <Register />;
}

if (window.location.pathname === "/login") {
  return <Login />;
}

if (window.location.pathname === "/forgot-password") {
  return <ForgotPassword />;
}

if (window.location.pathname === "/reset-password") {
  return <ResetPassword />;
}
  const [career, setCareer] = useState(null);
  const [technology, setTechnology] = useState(null);
  const [topic, setTopic] = useState(null);

  /* Progress */

  const [completedTopics, setCompletedTopics] =
    useState(() => {

      const saved =
        localStorage.getItem("completedTopics");

      return saved
        ? JSON.parse(saved)
        : {};
    });


  /* Test */

  const [testMode, setTestMode] =
    useState(false);

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answers, setAnswers] =
    useState({});

  const [testResult, setTestResult] =
    useState(null);


  /* Save Progress */

  useEffect(() => {

    localStorage.setItem(
      "completedTopics",
      JSON.stringify(completedTopics)
    );

  }, [completedTopics]);
  const saveProgress = async (
  careerName,
  technologyName,
  topics,
  score = 0,
  percentage = 0
) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      console.log("User not logged in");
      return;
    }

    const response = await fetch(
      "https://ai-career-roadmap-75cr.vercel.app/api/progress/save",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          career: careerName,
          technology: technologyName,
          completedTopics: topics,
          testScore: score,
          testPercentage: percentage,
        }),
      }
    );

    const data = await response.json();

    if (data.success) {
      console.log("Progress saved to MongoDB ✅");
    } else {
      console.log("Progress save failed:", data.message);
    }
  } catch (error) {
    console.error("Progress API error:", error);
  }
};
  // LOGIN / REGISTER PAGES

if (window.location.pathname === "/register") {
  return <Register />;
}

if (window.location.pathname === "/login") {
  return <Login />;
}

const token = localStorage.getItem("token");

if (!token) {
  return <Login />;
}

  /* =======================================================
     HELPERS
  ======================================================= */

  const getTopicKey = (
    careerName,
    technologyName,
    topicTitle
  ) => {

    return `${careerName}__${technologyName}__${topicTitle}`;

  };


  const isTopicCompleted = (topicItem) => {

    if (!career || !technology) {
      return false;
    }

    const key = getTopicKey(
      career.name,
      technology.name,
      topicItem.title
    );

    return !!completedTopics[key];

  };


  const completeTopic = () => {

  const key = getTopicKey(
    career.name,
    technology.name,
    topic.title
  );

  const newCompletedTopics = {
    ...completedTopics,
    [key]: true,
  };

  setCompletedTopics(newCompletedTopics);

  // Completed topic names MongoDB me save karna
  const completedTopicNames = technology.topics
    .filter((item) => {
      const itemKey = getTopicKey(
        career.name,
        technology.name,
        item.title
      );

      return newCompletedTopics[itemKey];
    })
    .map((item) => item.title);

  saveProgress(
    career.name,
    technology.name,
    completedTopicNames
  );

  setTopic(null);
};


  const getProgress = () => {

    if (!technology) {
      return 0;
    }

    const total =
      technology.topics.length;

    const completed =
      technology.topics.filter(
        (item) => isTopicCompleted(item)
      ).length;

    return Math.round(
      (completed / total) * 100
    );
  };


  const getCompletedCount = () => {

    if (!technology) {
      return 0;
    }

    return technology.topics.filter(
      (item) => isTopicCompleted(item)
    ).length;

  };


  const allTopicsCompleted = () => {

    if (!technology) {
      return false;
    }

    return technology.topics.every(
      (item) => isTopicCompleted(item)
    );

  };


  /* =======================================================
     TEST
  ======================================================= */

  const startTest = () => {

    setTestMode(true);
    setCurrentQuestion(0);
    setAnswers({});
    setTestResult(null);

  };


  const selectAnswer = (index) => {

    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: index
    }));

  };


  const nextQuestion = () => {

    if (
      currentQuestion <
      technology.quiz.length - 1
    ) {

      setCurrentQuestion(
        (prev) => prev + 1
      );

    }

  };


  const submitTest = () => {

  let score = 0;

  technology.quiz.forEach(
    (question, index) => {

      if (
        answers[index] ===
        question.answer
      ) {
        score++;
      }

    }
  );

  const total =
    technology.quiz.length;

  const percentage =
    Math.round(
      (score / total) * 100
    );

  const completedTopicNames =
    technology.topics
      .filter((item) => {

        const itemKey = getTopicKey(
          career.name,
          technology.name,
          item.title
        );

        return completedTopics[itemKey];

      })
      .map((item) => item.title);

  saveProgress(
    career.name,
    technology.name,
    completedTopicNames,
    score,
    percentage
  );

  setTestResult({
    score,
    total,
    percentage
  });

};


  const continueToNextTechnology = () => {

    if (!career || !technology) {
      return;
    }

    const currentIndex =
      career.roadmap.findIndex(
        (item) =>
          item.name === technology.name
      );

    const nextIndex =
      currentIndex + 1;

    if (
      nextIndex <
      career.roadmap.length
    ) {

      setTechnology(
        career.roadmap[nextIndex]
      );

      setTopic(null);
      setTestMode(false);
      setTestResult(null);
      setAnswers({});
      setCurrentQuestion(0);

    } else {

      setTechnology(null);
      setTopic(null);
      setTestMode(false);
      setTestResult(null);

      alert(
        "🎉 You completed this career roadmap!"
      );

    }

  };


  /* =======================================================
     HEADER
  ======================================================= */

  const Header = () => {

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  return (
    <header style={styles.header}>

      <div style={styles.logo}>
        🤖 AI Career Roadmap
      </div>

      <div style={styles.headerText}>
        Learn • Practice • Test • Grow
      </div>

      <button
        onClick={handleLogout}
        style={{
          background: "#ef4444",
          color: "white",
          border: "none",
          padding: "10px 18px",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "600",
        }}
      >
        Logout
      </button>

    </header>
  );
};


  /* =======================================================
     CAREER SCREEN
  ======================================================= */

  if (!career) {

    return (

      <div style={styles.container}>

        <Header />

        <main style={styles.hero}>

          <div style={styles.heroIcon}>
            🚀
          </div>

          <h1 style={styles.heroTitle}>
            AI Career Roadmap
          </h1>

          <p style={styles.heroText}>
            Choose your career and learn
            step by step from beginner to
            professional level.
          </p>

          <h2>
            Choose Your Career
          </h2>


          <div style={styles.grid}>

            {careers.map((item) => (

              <div
                key={item.name}
                style={styles.card}
                onClick={() => {
                  setCareer(item);
                  setTechnology(null);
                  setTopic(null);
                }}
              >

                <div style={styles.cardIcon}>
                  {item.icon}
                </div>

                <h2>
                  {item.name}
                </h2>

                <p>
                  {item.description}
                </p>

                <button
                  style={styles.button}
                >
                  Start Learning →
                </button>

              </div>

            ))}

          </div>

        </main>

      </div>

    );

  }


  /* =======================================================
     ROADMAP SCREEN
  ======================================================= */

  if (!technology) {

    return (

      <div style={styles.container}>

        <Header />

        <main style={styles.page}>

          <button
            style={styles.backButton}
            onClick={() => {
              setCareer(null);
              setTechnology(null);
              setTopic(null);
            }}
          >
            ← Back to Careers
          </button>


          <h1>
            {career.icon} {career.name}
          </h1>

          <p>
            Select a technology from your roadmap.
          </p>


          <div style={styles.grid}>

            {career.roadmap.map((item) => {

              const total =
                item.topics.length;

              const completed =
                item.topics.filter(
                  (topicItem) => {

                    const key =
                      getTopicKey(
                        career.name,
                        item.name,
                        topicItem.title
                      );

                    return completedTopics[key];

                  }
                ).length;

              const progress =
                Math.round(
                  (completed / total) * 100
                );


              return (

                <div
                  key={item.name}
                  style={styles.card}
                  onClick={() => {

                    setTechnology(item);
                    setTopic(null);
                    setTestMode(false);
                    setTestResult(null);

                  }}
                >

                  <div style={styles.cardIcon}>
                    {item.icon}
                  </div>

                  <h2>
                    {item.name}
                  </h2>

                  <p>
                    {completed} / {total}
                    {" "}Topics Completed
                  </p>


                  <div
                    style={
                      styles.progressBackground
                    }
                  >

                    <div
                      style={{
                        ...styles.progress,
                        width:
                          `${progress}%`
                      }}
                    />

                  </div>

                  <strong>
                    {progress}%
                  </strong>


                  <button
                    style={styles.button}
                  >
                    Learn →
                  </button>

                </div>

              );

            })}

          </div>

        </main>

      </div>

    );

  }


  /* =======================================================
     TEST RESULT SCREEN
  ======================================================= */

  if (
    testMode &&
    testResult
  ) {

    return (

      <div style={styles.container}>

        <Header />

        <main
          style={styles.testContainer}
        >

          <div style={styles.resultIcon}>
            🎉
          </div>

          <h1>
            Test Completed!
          </h1>

          <div
            style={styles.resultCard}
          >

            <h2>
              {technology.icon}{" "}
              {technology.name}
            </h2>

            <div style={styles.score}>
              {testResult.percentage}%
            </div>

            <h3>
              Score:{" "}
              {testResult.score} /{" "}
              {testResult.total}
            </h3>

            <p>
              Correct Answers:{" "}
              {testResult.score}
            </p>

            <p>
              Wrong Answers:{" "}
              {
                testResult.total -
                testResult.score
              }
            </p>


            <div
              style={
                styles.progressBackground
              }
            >

              <div
                style={{
                  ...styles.progress,
                  width:
                    `${testResult.percentage}%`
                }}
              />

            </div>

          </div>


          <button
            style={styles.button}
            onClick={
              continueToNextTechnology
            }
          >
            Continue to Next Technology →
          </button>


          <br />


          <button
            style={styles.secondaryButton}
            onClick={() => {

              setTestMode(false);
              setTestResult(null);

            }}
          >
            Back to {technology.name}
          </button>

        </main>

      </div>

    );

  }


  /* =======================================================
     TEST SCREEN
  ======================================================= */

  if (testMode) {

    const question =
      technology.quiz[currentQuestion];


    return (

      <div style={styles.container}>

        <Header />

        <main
          style={styles.testContainer}
        >

          <button
            style={styles.backButton}
            onClick={() => {

              setTestMode(false);
              setAnswers({});
              setCurrentQuestion(0);

            }}
          >
            ← Exit Test
          </button>


          <h1>
            📝 {technology.name} Test
          </h1>


          <div
            style={styles.questionNumber}
          >
            Question{" "}
            {currentQuestion + 1}
            {" / "}
            {technology.quiz.length}
          </div>


          <div
            style={styles.questionCard}
          >

            <h2 style={{ color: "#111827" }}>
              {question.question}
            </h2>


            <div>

              {question.options.map(
                (option, index) => {

                  const selected =
                    answers[
                      currentQuestion
                    ] === index;


                  return (

                    <button
                      key={`${option}-${index}`}
                      onClick={() =>
                        selectAnswer(index)
                      }
                      style={{
                        ...styles.optionButton,
                        background:
                          selected
                            ? "#dbeafe"
                            : "white",
                        border:
                          selected
                            ? "2px solid #2563eb"
                            : "1px solid #d1d5db"
                      }}
                    >

                      <strong>
                        {String.fromCharCode(
                          65 + index
                        )}
                        .
                      </strong>

                      {" "}

                      {option}

                    </button>

                  );

                }
              )}

            </div>

          </div>


          {currentQuestion <
          technology.quiz.length - 1 ? (

            <button
              style={styles.button}
              disabled={
                answers[
                  currentQuestion
                ] === undefined
              }
              onClick={nextQuestion}
            >
              Next Question →
            </button>

          ) : (

            <button
              style={styles.submitButton}
              disabled={
                answers[
                  currentQuestion
                ] === undefined
              }
              onClick={submitTest}
            >
              Submit Test ✓
            </button>

          )}

        </main>

      </div>

    );

  }


  /* =======================================================
     TOPICS SCREEN
  ======================================================= */

  if (!topic) {

    const progress =
      getProgress();

    const completedCount =
      getCompletedCount();


    return (

      <div style={styles.container}>

        <Header />

        <main style={styles.page}>

          <button
            style={styles.backButton}
            onClick={() =>
              setTechnology(null)
            }
          >
            ← Back to Roadmap
          </button>


          <h1>
            {technology.icon}{" "}
            {technology.name}
          </h1>

          <p>
            Learn each topic and complete
            the technology.
          </p>


          {/* Progress */}

          <div
            style={styles.progressCard}
          >

            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between"
              }}
            >

              <strong>
                Learning Progress
              </strong>

              <strong>
                {progress}%
              </strong>

            </div>


            <div
              style={
                styles.progressBackground
              }
            >

              <div
                style={{
                  ...styles.progress,
                  width:
                    `${progress}%`
                }}
              />

            </div>


            <p>
              {completedCount} /{" "}
              {technology.topics.length}
              {" "}Topics Completed
            </p>

          </div>


          {/* Topic List */}

          <div
            style={styles.topicList}
          >

            {technology.topics.map(
              (item, index) => {

                const completed =
                  isTopicCompleted(item);


                return (

                  <div
                    key={item.title}
                    style={
                      styles.topicRow
                    }
                    onClick={() =>
                      setTopic(item)
                    }
                  >

                    <div>

                      <span
                        style={
                          styles.number
                        }
                      >
                        {index + 1}
                      </span>

                      <strong>
                        {item.title}
                      </strong>

                    </div>


                    <span>

                      {completed
                        ? "✅ Completed"
                        : "Start →"}

                    </span>

                  </div>

                );

              }
            )}

          </div>


          {/* Test */}

          {allTopicsCompleted() && (

            <div
              style={
                styles.testReady
              }
            >

              <div
                style={{
                  fontSize: "50px"
                }}
              >
                🎉
              </div>

              <h2>
                {technology.name} Completed!
              </h2>

              <p>
                You have completed all{" "}
                {technology.topics.length}
                {" "}topics.
              </p>

              <button
                style={
                  styles.testButton
                }
                onClick={startTest}
              >
                📝 Start{" "}
                {technology.name} Test
              </button>

            </div>

          )}

        </main>

      </div>

    );

  }


  /* =======================================================
     LESSON SCREEN
  ======================================================= */

  const completed =
    isTopicCompleted(topic);


  return (

    <div style={styles.container}>

      <Header />

      <main style={styles.lesson}>

        <button
          style={styles.backButton}
          onClick={() =>
            setTopic(null)
          }
        >
          ← Back to Topics
        </button>


        <div
          style={styles.lessonHeader}
        >

          <div>

            <p style={styles.smallText}>
              {technology.icon}{" "}
              {technology.name}
            </p>

            <h1>
              {topic.title}
            </h1>

          </div>

        </div>


        {/* Definition */}

        <section
          style={styles.section}
        >

          <h2>
            📖 Definition
          </h2>

          <p>
            {topic.definition}
          </p>

        </section>


        {/* Syntax */}

        <section
          style={styles.section}
        >

          <h2>
            💻 Syntax
          </h2>

          <pre
            style={styles.code}
          >
            {topic.syntax}
          </pre>

        </section>


        {/* Key Points */}

        <section
          style={styles.section}
        >

          <h2>
            🔑 Key Points
          </h2>

          <ul
            style={styles.points}
          >

            {topic.points.map(
              (point, index) => (

                <li key={index}>
                  {point}
                </li>

              )
            )}

          </ul>

        </section>


        {/* Example */}

        <section
          style={styles.section}
        >

          <h2>
            🧪 Example
          </h2>

          <pre
            style={styles.code}
          >
            {topic.example}
          </pre>

        </section>


        {/* Complete Topic */}

        <div
          style={styles.completeBox}
        >

          {completed ? (

            <button
              style={
                styles.completedButton
              }
              disabled
            >
              ✅ Topic Completed
            </button>

          ) : (

            <button
              style={styles.button}
              onClick={
                completeTopic
              }
            >
              ✓ Complete Topic
            </button>

          )}

        </div>

      </main>

    </div>

  );

}


/* =========================================================
   STYLES
========================================================= */

const styles = {

  container: {
    minHeight: "100vh",
    background: "#f5f7fb",
    color: "#111827",
    fontFamily:
      "Arial, Helvetica, sans-serif"
  },


  header: {
    background: "#111827",
    color: "white",
    padding: "18px 40px",
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    position: "sticky",
    top: 0,
    zIndex: 10
  },


  logo: {
    fontSize: "22px",
    fontWeight: "bold"
  },


  headerText: {
    fontSize: "14px",
    color: "#d1d5db"
  },


  hero: {
    maxWidth: "1200px",
    margin: "auto",
    padding: "60px 20px",
    textAlign: "center"
  },


  heroIcon: {
    fontSize: "60px"
  },


  heroTitle: {
    fontSize: "42px",
    margin:
      "10px 0"
  },


  heroText: {
    fontSize: "18px",
    color: "#6b7280",
    maxWidth: "700px",
    margin:
      "0 auto 40px"
  },


  page: {
    maxWidth: "1200px",
    margin: "auto",
    padding: "35px 20px"
  },


  lesson: {
    maxWidth: "900px",
    margin: "auto",
    padding: "35px 20px"
  },


  testContainer: {
    maxWidth: "800px",
    margin: "auto",
    padding: "40px 20px",
    textAlign: "center"
  },


  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "22px",
    marginTop: "30px"
  },


  card: {
    background: "white",
    padding: "28px",
    borderRadius: "16px",
    boxShadow:
      "0 5px 20px rgba(0,0,0,0.08)",
    cursor: "pointer",
    transition:
      "transform 0.2s"
  },


  cardIcon: {
    fontSize: "48px",
    marginBottom: "10px"
  },


  button: {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "13px 22px",
    borderRadius: "9px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    marginTop: "15px"
  },


  submitButton: {
    background: "#16a34a",
    color: "white",
    border: "none",
    padding: "13px 25px",
    borderRadius: "9px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    marginTop: "15px"
  },


  secondaryButton: {
    background: "#6b7280",
    color: "white",
    border: "none",
    padding: "12px 22px",
    borderRadius: "9px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "12px"
  },


  backButton: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    color: "#2563eb",
    fontWeight: "600",
    marginBottom: "20px"
  },


  progressCard: {
    background: "white",
    padding: "22px",
    borderRadius: "14px",
    marginTop: "25px",
    boxShadow:
      "0 3px 15px rgba(0,0,0,0.06)"
  },


  progressBackground: {
    height: "12px",
    background: "#e5e7eb",
    borderRadius: "20px",
    overflow: "hidden",
    margin: "12px 0"
  },


  progress: {
    height: "100%",
    background: "#2563eb",
    borderRadius: "20px",
    transition:
      "width 0.4s ease"
  },


  topicList: {
    marginTop: "25px"
  },


  topicRow: {
    background: "white",
    padding: "20px",
    marginBottom: "12px",
    borderRadius: "12px",
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    cursor: "pointer",
    boxShadow:
      "0 2px 10px rgba(0,0,0,0.05)"
  },


  number: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    background: "#2563eb",
    color: "white",
    marginRight: "12px",
    fontWeight: "bold"
  },


  testReady: {
    background: "#ecfdf5",
    border:
      "2px solid #16a34a",
    padding: "30px",
    borderRadius: "15px",
    textAlign: "center",
    marginTop: "30px"
  },


  testButton: {
    background: "#16a34a",
    color: "white",
    border: "none",
    padding: "14px 25px",
    borderRadius: "9px",
    cursor: "pointer",
    fontSize: "17px",
    fontWeight: "bold"
  },


  lessonHeader: {
    background: "white",
    padding: "25px",
    borderRadius: "14px",
    boxShadow:
      "0 3px 15px rgba(0,0,0,0.06)"
  },


  smallText: {
    color: "#2563eb",
    fontWeight: "600"
  },


  section: {
    background: "white",
    padding: "25px",
    borderRadius: "14px",
    marginTop: "20px",
    boxShadow:
      "0 3px 15px rgba(0,0,0,0.06)"
  },


  sectionTitle: {
    marginBottom: "15px"
  },


  code: {
    background: "#111827",
    color: "#f9fafb",
    padding: "20px",
    borderRadius: "10px",
    overflowX: "auto",
    fontSize: "14px",
    lineHeight: "1.6",
    textAlign: "left"
  },


  points: {
    lineHeight: "2"
  },


  completeBox: {
    textAlign: "center",
    marginTop: "30px",
    marginBottom: "50px"
  },


  completedButton: {
    background: "#16a34a",
    color: "white",
    border: "none",
    padding: "13px 25px",
    borderRadius: "9px",
    fontSize: "16px",
    fontWeight: "600"
  },


  questionNumber: {
    background: "#e0e7ff",
    color: "#3730a3",
    display: "inline-block",
    padding: "8px 15px",
    borderRadius: "20px",
    marginTop: "10px",
    fontWeight: "600"
  },


  questionCard: {
    background: "white",
    color: "#111827",
    padding: "30px",
    borderRadius: "16px",
    marginTop: "25px",
    boxShadow:
      "0 5px 20px rgba(0,0,0,0.08)"
  },


  optionButton: {
    display: "block",
    color: "#111827",
    width: "100%",
    padding: "15px",
    marginTop: "12px",
    borderRadius: "9px",
    textAlign: "left",
    cursor: "pointer",
    fontSize: "16px"
  },


  resultIcon: {
    fontSize: "65px"
  },


  resultCard: {
    background: "white",
    padding: "35px",
    borderRadius: "16px",
    margin:
      "30px 0",
    boxShadow:
      "0 5px 20px rgba(0,0,0,0.08)"
  },


  score: {
    fontSize: "70px",
    fontWeight: "bold",
    color: "#2563eb",
    margin: "20px"
  }

};


export default App;