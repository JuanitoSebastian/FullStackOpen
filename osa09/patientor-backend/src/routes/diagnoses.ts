import express from 'express';
import diagnosesService from '../services/diagnoses';

const router = express.Router();

router.get('/', (_request, response) => {
  response.send(diagnosesService.getEntries());
});

router.post('/', (_request, response) => {
  response.send('saving entry!');
});

export default router;