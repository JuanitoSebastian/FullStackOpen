import express from 'express';
import patientsService from '../services/patients';
import toNewPatient from '../utils/validation';

const router = express.Router();

router.get('/', (_request, response) => {
  response.send(patientsService.getAllNonSensitive());
});

router.post('/', (request, response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = toNewPatient(request.body);
    const createdPatient = patientsService.addPatients(newPatient);

    response.json(createdPatient);
  } catch (error: unknown) {
    if (error instanceof Error) {
      response.status(400).send(error.message);
    }
  }
  
});

export default router;