import { Entry, NewBaseEntry, NewEntry, NewHealthCheckEntry, NewHospitalEntry, NewOccupationalHealthCareEntry, NewPatient } from "../types";
import { parseDate, parseDiagnosisCodes, parseDischarge, parseGender, parseHealthCheckRating, parseSickLeave, parseString } from "./validation";
import { v1 as uuid } from 'uuid';

interface NewBaseEntryFields {
  description: unknown; 
  date: unknown; 
  specialist: unknown;
  diagnosisCodes: unknown;
}

const toNewBaseEntry = (
  { description, date, specialist, diagnosisCodes } :  NewBaseEntryFields
): NewBaseEntry => {
  const newEntry: NewBaseEntry = {
    description: parseString(description),
    date: parseDate(date),
    specialist: parseString(specialist),
    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
  };
  return newEntry;
};

interface NewHospitalEntryFields extends NewBaseEntryFields {
  discharge: unknown;
}

const toNewHospitalEntry = (
  { description, date, specialist, diagnosisCodes, discharge } : NewHospitalEntryFields
): NewHospitalEntry => {
  const baseEntry = toNewBaseEntry({ description, date, specialist, diagnosisCodes });
  const newEntry: NewHospitalEntry = {
    ...baseEntry,
    type: 'Hospital',
    discharge: parseDischarge(discharge)
  };
  return newEntry;
};

interface NewOccupationalHealthCareEntryFields extends NewBaseEntryFields { 
  employerName: unknown;
  sickLeave: unknown;
}

const toNewOccupationalHealthCareEntry = (
  { description, date, specialist, diagnosisCodes, employerName, sickLeave }: NewOccupationalHealthCareEntryFields
): NewOccupationalHealthCareEntry => {
  const baseEntry = toNewBaseEntry({ description, date, specialist, diagnosisCodes });
  const newEntry: NewOccupationalHealthCareEntry = {
    ...baseEntry,
    type: 'OccupationalHealthcare',
    employerName: parseString(employerName),
    sickLeave: parseSickLeave(sickLeave)
  };

  return newEntry;
};

interface NewHealthCheckEntryFields extends NewBaseEntryFields { 
  healthCheckRating: unknown;
}

const toNewHealthCheckEntry = (
  { description, date, specialist, diagnosisCodes, healthCheckRating }: NewHealthCheckEntryFields
): NewHealthCheckEntry => {
  const baseEntry = toNewBaseEntry({ description, date, specialist, diagnosisCodes });
  const newEntry: NewHealthCheckEntry = {
    ...baseEntry,
    type: 'HealthCheck',
    healthCheckRating: parseHealthCheckRating(healthCheckRating)
  };
  return newEntry;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (entryToCreate: any): NewEntry => {
  const type = parseString(entryToCreate.type);
  switch (type) {
  case 'Hospital': 
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return toNewHospitalEntry(entryToCreate);
  case 'HealthCheck':
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return toNewHealthCheckEntry(entryToCreate);
  case 'OccupationalHealthcare':
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return toNewOccupationalHealthCareEntry(entryToCreate);
  
  default:
    throw new Error('Entry type incorrect: ' + type);
  }
};

type NewPatientFields = { name: unknown, gender: unknown, occupation: unknown, ssn: unknown, dateOfBirth: unknown, entries: Entry[] };

export const toNewPatient = ({ name, gender, occupation, ssn, dateOfBirth, entries } : NewPatientFields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseString(name),
    occupation: parseString(occupation),
    ssn: parseString(ssn),
    gender: parseGender(gender),
    dateOfBirth: parseDate(dateOfBirth),
    entries: entries
    ? entries.map(entry => { 
      const newEntry = toNewEntry(entry);
      const entryToReturn = {
        ...newEntry,
        id: uuid()
      };
      return entryToReturn;
    })
    : []
  };

  return newPatient;
};