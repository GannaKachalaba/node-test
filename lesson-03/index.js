const express = require("express");
const cors = require("cors");
const uuid = require("uuid").v4;
const fs = require("fs/promises");

const app = express();

app.use(express.json());

app.use("./users/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const users = JSON.parse(await fs.readFile("./models.json"));

    const user = users.find((item) => item.id === id);

    if (!user) {
      return res.status(404).json({
        message: "User does not exist..",
      });
    }

    req.user = user;

    next();
  } catch (err) {
    console.log(err);

    res.sendStatus(500);
  }
});

// CRUD = creat read update delete
// reqvest listner - GET, PUT, PATCH, DELETE/ OPTIONS

/**
 * REST API
 * POST     /users            - create user
 * GET      /users            - gell all users
 * GET      /users/<userID>   - get one user
 * PUT/PATCH    /users/<userID> - update one user
 * DELETE       /users/<userID> - delete one user
 */

// CONTROLLERS
/**
 * Create user
 */
app.post("/users", async (rec, res) => {
  // req => body, params, query
  try {
    const { name, year } = req.body;

    const usersDB = await fs.readFile("./models.json");
    const users = JSON.parse(usersDB);

    const newUser = {
      name,
      year,
      id: uuid(),
    };

    users.push(newUser);

    await fs.writeFile("./models.json", JSON.stringify(users));

    // write to db

    res.status(201).json({
      user: newUser,
    });
  } catch (err) {
    console.log(err);

    res.sendStatus(500);
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    console.log(req.query);

    const users = JSON.parse(await fs.readFile("./models.json"));

    res.status(200).json({
      users,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Something went wrong...",
    });
  }
});

// Get user by ID
app.get("/users/:id", (req, res) => {
  try {
    //     const {id} = req.params;

    //    const users = JSON.parse(await fs.readFile('./models.json'));
    //    const user = users.fine(item => item.id === id);

    const { user } = req;

    res.status(200).json({
      user,
    });
  } catch (err) {
    console.log(err);

    res.status(404).json({
      message: "User not found ...",
    });
  }
});

// Update user by id
app.patch("/users/:id", (req, res) => {});

// Delete user by id
app.delete("/users/:id", (req, res) => {});

// Express request handler:
app.get("/test", (req, res) => {
  // console.log(req);

  // res.sendStatus(200);
  res.status(200).json({
    user: "User",
    date: new Date().toLocaleString(),
  });
  // res.status(200).send('<h1>Hello from Back</h1>');
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is up and runing on port: ${port}`);
});
