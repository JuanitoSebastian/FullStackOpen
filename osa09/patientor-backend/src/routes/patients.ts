import express from 'express';
import patientsService from '../services/patients';
import { toNewPatient, toNewEntry } from '../utils/toNew';

const router = express.Router();

router.get('/', (_request, response) => {
  response.send(patientsService.getAllNonSensitive());
});

router.get('/:id', (request, response) => {
  const id = request.params.id;
  const patient = patientsService.getById(id);

  if (patient) {
    response.send(patient);
  } else {
    response.status(404);
  }
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

router.post('/:id/entries', (request, response) => {
  const id = request.params.id;

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newEntry = toNewEntry(request.body);
    const editedPatient = patientsService.addEntryToPatient(id, newEntry);
    response.send(editedPatient);
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      response.status(400).send(error.message);
    }
  }
});

export default router;