const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
 router.get('/', (req, res) => {
    // GET route code here
    const queryText = `SELECT * FROM "products" ORDER BY id ASC`;

    pool.query(queryText)
        .then((results) => res.send(results.rows))
        .catch((error) => {
            console.log('Error getting products name and prices', error);
            res.sendStatus(500);
        });
  });
  
  /**
   * EDIT route template
   */
  router.put('/:id', (req, res) => {
    // EDIT route code here
    console.log(req.body)
    
    const queryText = `UPDATE "products" SET ${req.body.dbColumn}=$1 WHERE "id"=$2`;
    pool.query(queryText, [req.body.newValue, req.params.id])
      .then(() => { res.sendStatus(200); })
      .catch((error) => {
        console.log('Error completeing UPDATE Companies query', error)
      })
  });

  router.post('/', (req, res) => {
    const queryText = `INSERT INTO "licensees" (licensee_contractor_name)
    VALUES ($1)`;
    console.log(req.body.value)
    pool.query(queryText, [req.body.value])
    .then(() => res.sendStatus(201))
    .catch((error) => {
      console.log('Company ServerSide Post failed:', error);
      res.sendStatus(500);
    });
  })
   
  module.exports = router;