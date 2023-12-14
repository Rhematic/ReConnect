const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/:familyId", (req, res) => {
  // console.log("in event router GET");
  const familyId = req.params.familyId;
  console.log(familyId);
  const queryText = `
      SELECT user_event.*, event.* 
      FROM user_event 
      JOIN event ON user_event.event_id = event.id 
      WHERE "event"."family_id" = $1
      ORDER BY user_event.id ASC;
    `;

  pool
    .query(queryText, [familyId])
    .then((result) => {
      // console.log(result.rows);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("error in event router GET", error);
      res.sendStatus(500);
    });
});

router.post("/", (req, res) => {


  const date = new Date(req.body.date);
  const timeParts = req.body.time.split(":");
  date.setUTCHours(timeParts[0], timeParts[1]);

  // Convert the date to a UTC timestamp
  const utcTimestamp = date.toISOString();

  // Output the UTC timestamp
  const queryText = `
      WITH user_family AS (
        SELECT family_id 
        FROM user_family 
        WHERE user_id = $1
    ), new_event AS (
      INSERT INTO event (date, detail, time, family_id)
      SELECT $2, $3, $4, family_id
      FROM user_family
      RETURNING id
    )
    INSERT INTO user_event (user_id, event_id, attending)
    SELECT $1, id, true
    FROM new_event;
      `;

  pool
    .query(queryText, [req.user.id, req.body.date, req.body.detail, utcTimestamp])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log("error in event router POST", error);
      res.sendStatus(500);
    });
});

router.put("/:id", (req, res) => {
  const eventId = req.params.id;
  const { date, detail, time } = req.body;
  const queryText = `
      UPDATE event 
      SET date = $1, detail = $2, time = $3 
      WHERE id = $4;
  `;

  pool
    .query(queryText, [date, detail, time, eventId])
    .then(() => res.sendStatus(200))
    .catch((error) => {
      console.log("error in event router PUT", error);
      res.sendStatus(500);
    });
});

// DELETE route for removing an event
router.delete("/:id", (req, res) => {
  const eventId = req.params.id;
  const queryText = 'DELETE FROM event WHERE id = $1;';

  pool
    .query(queryText, [eventId])
    .then(() => res.sendStatus(204))
    .catch((error) => {
      console.log("error in event router DELETE", error);
      res.sendStatus(500);
    });
});

module.exports = router;
