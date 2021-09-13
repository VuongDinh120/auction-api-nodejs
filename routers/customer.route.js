const express = require('express');
const customerModel = require('../models/customer.model');
const rentalModel = require('../models/rental.model');
const validate = require('../middlewares/validate.mdw');
const schema = require('../schemas/customer.json');

const router = express.Router();

module.exports = router;

router.get('/',async function (req, res) {
      const rows = await customerModel.findAll();
      res.json(rows);
})

router.get('/details', async function (req, res) {
      const id = +req.query.id || 0;
      const customer = await customerModel.findById(id);
      if (customer === null) {
            return res.status(204).end();
      }
      res.json(customer);
})

router.post('/add', validate(schema.add),async function (req, res) {
      const customer = req.body;
      console.log(req.body);
      customer.create_date = '05/05/2021';
      const result = await customerModel.add(customer);

      customer.customer_id = result[0];
      res.status(201).json(customer);
})

router.delete('/del/:id', async function (req, res) {
      const id = +req.params.id || 0;
      if (id === 0) {
            return res.json({
                  message: 'NO CUSTOMER DELETED.'
            })
      }

      const rows = await rentalModel.delByCustomerId(id);
      const affected_rows = await customerModel.del(id);
      if (affected_rows === 0) {
            return res.json({
                  message: 'NO CUSTOMER DELETED.'
            })
      }

      res.json({
            message: 'CUSTOMER DELETED.'
      })
})

router.patch('/update', validate(schema.update),async function (req, res) {
      const customer = req.body;
      const id = customer.customer_id;
      delete customer.customer_id;
      console.log(customer);
      const result = await customerModel.patch(id, customer);
      res.json(result);
})