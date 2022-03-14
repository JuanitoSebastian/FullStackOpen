import { v1 as uuid } from 'uuid';
import { Patient, NonSensitivePatient, NewPatient, NewEntry } from "../types";
import patientsData from '../../data/patients';
import { toNewPatient } from '../utils/toNew';

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

const addEntryToPatient = (patientId: string, newEntry: NewEntry): Patient | undefined => {
  const patientToEdit = patients.find(patient => patient.id === patientId);
  if (!patientToEdit) { return undefined; }

  const entryToAdd = {
    ...newEntry,
    id: uuid()
  };

  patientToEdit.entries = [...patientToEdit.entries, entryToAdd];
  patients.map(patient => patient.id === patientToEdit.id ? patientToEdit : patient);
  return patientToEdit;
};

export default {
  getAllNonSensitive,
  addPatients,
  getById,
  addEntryToPatient
};