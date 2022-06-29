import { Router } from 'express';
import newUser from '../services/new-user.js';
import validateInputs from '../validators/user-data.js';
const router = Router();

router.post('/', validateInputs, async (req, res) => {
  try {
    const response = await newUser(req.user);

    if (response.error || req.error) {
      throw new Error(response.error.message);
    }

    res.send(response);
  } catch (error) {
    console.error(error);
    //FIXME dev only! stop sending entire error messages to the client
    res.status(error.code || 503).send({ error: error.message });
  }
});

export default router;
