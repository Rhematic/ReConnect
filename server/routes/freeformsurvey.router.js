const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET free form type question
 */
router.get('/', (req, res) => {
    console.log('/survey GET route');
    let queryText = `SELECT * from "question" WHERE "hidden" = false AND "type" = 'short' ORDER BY "id" ASC`;
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    })
});

router.post('/', (req, res) => {
    console.log('/survey POST route');
    console.log(req.body);
    console.log('is authenticated?', req.isAuthenticated());

    if (req.isAuthenticated()) {
        console.log('user', req.user);

        let queryText = `
            INSERT INTO "response" ("response", "user_id", "date", "question_id")
            VALUES ($1, $2, $3, $4);
        `;

        const queryParams = [
            req.body.response,
            req.user.id,
            req.body.date,
            req.body.question_id,       
        ];

        pool.query(queryText, queryParams)
            .then(result => {
                res.sendStatus(201);
            })
            .catch(error => {
                console.log(error);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(401);
    }
});

module.exports = router;

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


