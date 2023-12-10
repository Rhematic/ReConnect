const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get("/", rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post("/register", async (req, res) => {
  console.log("req.body: ", req.body);

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const createFamilyQuery = `INSERT INTO "family" DEFAULT VALUES RETURNING id`;
    const familyResult = await client.query(createFamilyQuery);
    const familyId = familyResult.rows[0].id;

    for (let user of req.body) {
      const username = user.username;
      const password = encryptLib.encryptPassword(user.password);

      const createUserQuery = `INSERT INTO "user" (username, password, first_name, last_name, date_of_birth, city, state, access_level)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`;
      const userResult = await client.query(createUserQuery, [
        username,
        password,
        user.firstName,
        user.lastName,
        user.dateOfBirth,
        user.city,
        user.state,
        user.accessLevel,
      ]);
      const userId = userResult.rows[0].id;

      const createUserFamilyQuery = `INSERT INTO "user_family" (user_id, family_id) VALUES ($1, $2)`;
      await client.query(createUserFamilyQuery, [userId, familyId]);
    }

    await client.query("COMMIT");
    res.sendStatus(201);
  } catch (err) {
    await client.query("ROLLBACK");
    console.log("User registration failed: ", err);
    res.sendStatus(500);
  } finally {
    client.release();
  }
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post("/login", userStrategy.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post("/logout", (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
