const express = require('express');

module.exports = ({ secrets }) => {
  const router = express.Router();

  router.post('/persist/:id', (req, res) => {
    const { id } = req.params;
    const { encryption_key: pass, value } = req.body;
    secrets.saveSecret({ id, value }, pass).then(() => {
      res.send({ success: true });
    }).catch(error => {
      res.send({ success: false });
    });
  });

  router.post('/retrieve/:id', (req, res) => {
    const { id } = req.params;
    const { encryption_key } = req.body;
    secrets.findSecrets(id, encryption_key).then(secret => {
      res.send(secret);
    }).catch(error => {
      res.send([]);
    });
  });

  return router;
};
