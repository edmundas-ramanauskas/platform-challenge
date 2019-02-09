const express = require('express');

module.exports = ({ logger, secrets: secretsService }) => {
  const router = express.Router();

  router.post('/persist/:id', async (req, res) => {
    const { id } = req.params;
    const { encryption_key: pass, value } = req.body;
    try {
      await secretsService.saveSecret({ id, value }, pass);
      res.send({ success: true });
    } catch (error) {
      logger.error('PERSIST_ERROR', { error });
      res.send({ success: false });
    }
  });

  router.post('/retrieve/:id', async (req, res) => {
    const { id } = req.params;
    const { encryption_key } = req.body;
    try {
      const secrets = await secretsService.findSecrets(id, encryption_key);
      res.send(secrets);
    } catch (error) {
      logger.error('RETRIEVE_ERROR', { error });
      res.send([]);
    }
  });

  return router;
};
