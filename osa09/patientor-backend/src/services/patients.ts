import { Patient, NonSensitivePatient } from "../types";
import patientsData from '../../data/patients.json';

const patients: Patient[] = patientsData;

const getAllNonSensitive = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, occupation, gender, dateOfBirth }) => ({
    id,
    name,
    occupation,
    gender,
    dateOfBirth
  }));
};

export default {
  getAllNonSensitive
};