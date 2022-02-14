import { Entry, HealthCheckEntry, HospitalEntry, NewBaseEntry, NewHealthCheckEntry, NewHospitalEntry, NewOccupationalHealthCareEntry, NewPatient, OccupationalHealthCareEntry } from "../types";
import { isString, parseDate, parseDiagnosisCodes, parseDischarge, parseGender, parseHealthCheckRating, parseSickLeave, parseString } from "./validation";

type NewBaseEntryFields = {
  description: unknown, 
  date: unknown, 
  specialist: unknown, 
  diagnosisCodes: unknown
};

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

type NewHospitalEntryFields = {
  description: unknown, 
  date: unknown, 
  specialist: unknown, 
  diagnosisCodes: unknown, 
  discharge: unknown
};

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

type NewOccupationalHealthCareEntryFields = { 
  description: unknown, 
  date: unknown, 
  specialist: unknown, 
  diagnosisCodes: unknown, 
  employerName: unknown,
  sickLeave: unknown
};

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

type NewHealthCheckEntryFields = { 
  description: unknown, 
  date: unknown, 
  specialist: unknown, 
  diagnosisCodes: unknown, 
  healthCheckRating: unknown 
};

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
export const toNewEntry = (entry: any): NewHealthCheckEntry | NewHospitalEntry | NewOccupationalHealthCareEntry => {
  const type = parseString(entry.type);
  switch (type) {
  case 'Hospital': 
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return toNewHospitalEntry(entry);
  case 'HealthCheck':
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return toNewHealthCheckEntry(entry);
  case 'OccupationalHealthcare':
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return toNewOccupationalHealthCareEntry(entry);
  
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
    ? entries.map(entry => parseEntry(entry))
    : []
  };

  return newPatient;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseEntry = (entryToParse: any): Entry => {
  if (!entryToParse || !entryToParse.type || !isString(entryToParse.type)) {
    throw new Error('Incorrect entry!');
  }

  switch (entryToParse.type) {
  case 'HealthCheck':
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newHealthCheckEntry: HealthCheckEntry = {
      ...entryToParse
    };
    return newHealthCheckEntry;
  
  case 'OccupationalHealthcare':
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newOccupationalHealthcareEntry: OccupationalHealthCareEntry = {
      ...entryToParse
    };
    return newOccupationalHealthcareEntry;

  case 'Hospital':
     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newHospitalEntry: HospitalEntry = {
      ...entryToParse
    };
    return newHospitalEntry;

  default:
    return assertNever(entryToParse as never);

  }
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};