const express = require('express');
const jwt = require("jsonwebtoken")

const app = express();
const JWT_SECRET = "secret"

app.use(express.json());

let users = [];

const generateToken = () => {
  let options = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];

  let token = "";
  for (let i = 0; i < 32; i++) {
    // use a simple function here
    token += options[Math.floor(Math.random() * options.length)];
  }
  return token;
};

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = users.find((user) => user.username);

  if (user) {
    res.status(403).send({
      message: "User already exists",
    });
    return;
  }

  users.push({
    username: username,
    password: password,
  });

  res.json({
    message: "Sign Up successful",
  });

//   window.localStorage.setItem("users", Array.toString(users));
});

app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    const token = jwt.sign({
        username: username
    }, JWT_SECRET);

    // user.token = token;

    res.json({
      token,
    });

    // window.localStorage.setItem("users", Array.toString(users));
  } else {
    res.status(403).send({
      message: "Invalid username or password",
    });
  }
});

app.get("/me", (req, res) => {
    const token = req.headers.token;
    const userDetails = jwt.verify(token, JWT_SECRET);
    const username =  userDetails.username;
    if (username) {
        res.send({
            id: username
        })
    } else {
        res.status(401).send({
            message: "Unauthorized"
        })
    }
})

app.listen(3001);
