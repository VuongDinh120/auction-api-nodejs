const express = require('express');
const actorModel = require('../models/actor.model');
const validate = require('../middlewares/validate.mdw');
const schema = require('../schemas/actor.json');

const router = express.Router();

module.exports = router;

router.get('/', async function (req, res) {
      const rows = await actorModel.findAll();
      res.json(rows);
})

router.get('/details', async function (req, res) {
      const id = +req.query.id || 0;
      const actor = await actorModel.findById(id);
      if (actor === null) {
            return res.status(204).end();
      }
      res.json(actor);
})

router.post('/add', validate(schema.add), async function (req, res) {
      const actor = req.body;
      // console.log(req.body);
      const result = await actorModel.add(actor);

      actor.actor_id = result[0];
      res.status(201).json(actor);
})

router.delete('/del/:id', async function (req, res) {
      const id = +req.params.id || 0;
      if (id === 0) {
            return res.json({
                  message: 'NO ACTOR DELETED.'
            })
      }

      const affected_rows = await actorModel.del(id);
      if (affected_rows === 0) {
            return res.json({
                  message: 'NO ACTOR DELETED.'
            })
      }

      res.json({
            message: 'ACTOR DELETED.'
      })
})

router.patch('/update', validate(schema.update),async function (req, res) {
      const actor = req.body;
      const id = actor.actor_id;
      delete actor.actor_id;
      const result = await actorModel.patch(id, actor);
      res.json(result);
})