import { v1 as uuid } from 'uuid';
import { Patient, NonSensitivePatient, NewPatient } from "../types";
import patientsData from '../../data/patients';
import toNewPatient from '../utils/validation';

const patients: Patient[] = patientsData.map(obj => {
  const object = toNewPatient(obj) as Patient;
  object.id = obj.id;
  return object;
});

const getAllNonSensitive = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, occupation, gender, dateOfBirth, entries }) => ({
    id,
    name,
    occupation,
    gender,
    dateOfBirth,
    entries
  }));
};

const getById = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id === id);
};

const addPatients = (patientToAdd: NewPatient): Patient => {
  const newPatient = {
    ...patientToAdd,
    id: uuid()
  };

  patients.push(newPatient);

  return newPatient;
};

export default {
  getAllNonSensitive,
  addPatients,
  getById
};