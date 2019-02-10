import express from 'express';

const getEcnryptionKey = ({ headers }) => headers['encryption-key'];

export default ({ logger, secrets: secretsService }) => {
  const router = express.Router();

  router.post('/persist/:id', async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;
    const pass = getEcnryptionKey(req);
    try {
      await secretsService.saveSecret({ id, value }, pass);
      res.send({ success: true });
    } catch (error) {
      logger.error('PERSIST_ERROR', { error });
      res.send({ success: false });
    }
  });

  router.get('/retrieve/:id', async (req, res) => {
    const { id } = req.params;
    const pass = getEcnryptionKey(req);
    try {
      const secrets = await secretsService.findSecrets(id, pass);
      res.send(secrets);
    } catch (error) {
      logger.error('RETRIEVE_ERROR', { error });
      res.send([]);
    }
  });

  return router;
};
