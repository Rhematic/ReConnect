const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET likert type question
 */
router.get('/', (req, res) => {
    console.log('/survey GET route');
    let queryText = `SELECT * from "question" WHERE "hidden" = false AND "type" = 'single' ORDER BY "id" ASC`;
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    })
});

// likertsurvey.router.js

router.post('/', (req, res) => {
    console.log('/survey POST route');
    console.log(req.body);
    console.log('is authenticated?', req.isAuthenticated());

    if (req.isAuthenticated()) {
        console.log('user', req.user);

        const responses = req.body.response;

        // Iterate through each question in the response
        for (const questionId in responses) {
            const queryText = `
                INSERT INTO "response" ("response", "user_id", "date", "question_id")
                VALUES ($1, $2, $3, $4);
            `;
            
            const queryParams = [
                responses[questionId],
                req.user.id,
                req.body.date,
                questionId,
            ];

            pool.query(queryText, queryParams)
                .then(result => {
                    console.log(`Response for question ${questionId} inserted successfully`);
                })
                .catch(error => {
                    console.log(error);
                    res.sendStatus(500);
                });
        }

        res.sendStatus(201); // Respond after all responses are inserted
    } else {
        res.sendStatus(401);
    }
});



// router.get('/', (req, res) => {
//     console.log('/survey GET route');
//     console.log('is authenticated?', req.isAuthenticated());
//     console.log('user', req.user);
//     if(req.isAuthenticated()) {
//       let queryText = `SELECT * FROM "question" WHERE "user_id" = $1 ORDER BY id;`;
//       pool.query(queryText, [req.user.id]).then((result) => {
//           res.send(result.rows);
//       }).catch((error) => {
//           console.log(error);
//           res.sendStatus(500);
//       });
//     } else {
//       res.sendStatus(401);
//     }
//   });

/**
 * POST route template
 */
// router.post('/', (req, res) => {
//   // POST route code here
// });

module.exports = router;
