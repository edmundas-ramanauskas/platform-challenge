const express = require('express');

function routerResolver({ cipher }) {
  const router = express.Router();

  router.post('/persist/:id', function(req, res) {
    // const { id } = req.params;
    const { encryption_key: pass, value } = req.body;
    const encrypted = cipher.encrypt(pass, value);
    res.send(encrypted);
  });

  router.post('/retrieve/:id', function(req, res) {
    // const { id } = req.params;
    const { encryption_key: pass, value } = req.body;
    const decrypted = cipher.decrypt(pass, value);
    res.send(decrypted);
  });

  return router;
}

module.exports = routerResolver;
