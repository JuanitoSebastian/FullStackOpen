import express from 'express';
import patientsService from '../services/patients';

const router = express.Router();

router.get('/', (_request, response) => {
  response.send(patientsService.getAllNonSensitive());
});

export default router;