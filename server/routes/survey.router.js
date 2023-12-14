const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();


router.get('/', (req, res) => {
    let queryText = `SELECT * from "question" WHERE "hidden" = false AND "type" = 'multi' ORDER BY "id" ASC`;
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.post("/", (req, res) => {
  console.log(req.body);
  console.log("is authenticated?", req.isAuthenticated());

  if (req.isAuthenticated()) {
    console.log("user", req.user);

    let queryText = `
    INSERT INTO "response" ("response", "user_id", "date", "question_id", "response")
    VALUES ($1, $2, $3, $4, $5);
`;
        const queryParams = [
            req.body.response,
            req.user.id,
            req.body.date,
            req.body.question_id, 
            req.body.score,      
        ];
    pool
      .query(queryText, queryParams)
      .then((result) => {
        res.sendStatus(201);
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;
