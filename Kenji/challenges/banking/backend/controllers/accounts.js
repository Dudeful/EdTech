import { Router } from 'express';
import accounts from '../services/accounts.js';
const router = Router();

router.get('/', async (req, res) => {
  try {
    const response = await accounts(req.query);

    if (response.error) {
      throw new Error(response.error.message);
    }

    res.send(response);
  } catch (error) {
    console.error(error);
    //FIXME dev only! stop sending entire error messages to the client
    res.status(error.code || 400).send({ error: error.message });
  }
});

export default router;
