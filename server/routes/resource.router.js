const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/", (req, res) => {
  let queryText = `SELECT * FROM "resource" WHERE access_level = '${req.user.access_level}' ORDER BY "id" ASC;`;
  if (req.user.access_level === 'admin') {
    queryText = `SELECT * FROM "resource" ORDER BY "id" ASC;`
  }

  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("error in resource router GET", error);
      res.sendStatus(500);
    });
});

router.post("/", (req, res) => {
  const newResource = req.body;
  const queryText = `INSERT INTO "resource" ("description", "url", "access_level")
    VALUES ($1, $2, $3);`;

  pool
    .query(queryText, [
      newResource.description,
      newResource.url,
      newResource.access_level,
    ])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log("error in resource router POST", error);
      res.sendStatus(500);
    });
});

router.put("/:id", (req, res) => {
  const resource = req.body;
  const queryText = `UPDATE "resource" SET "description" = $1, "url" = $2, "access_level" = $3 WHERE "id" = $4;`;

  pool
    .query(queryText, [
      resource.description,
      resource.url,
      resource.access_level,
      req.params.id,
    ])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("error in resource router PUT", error);
      res.sendStatus(500);
    });
});

router.delete("/:id", (req, res) => {
  const queryText = `DELETE FROM "resource" WHERE "id" = $1;`;

  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("error in resource router DELETE", error);
      res.sendStatus(500);
    });
});

module.exports = router;
