import { NewPatient, Gender, Entry, HealthCheckEntry, OccupationalHealthCareEntry, HospitalEntry } from "../types";

export const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error('Incorrect type');
  }

  return text;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }

  return gender;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect date: ' + date);
  }

  return date;
};

type Fields = { name: unknown, gender: unknown, occupation: unknown, ssn: unknown, dateOfBirth: unknown, entries: Entry[] };

const toNewPatient = ({ name, gender, occupation, ssn, dateOfBirth, entries } : Fields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseString(name),
    occupation: parseString(occupation),
    ssn: parseString(ssn),
    gender: parseGender(gender),
    dateOfBirth: parseDate(dateOfBirth),
    entries: entries.map(entry => parseEntry(entry))
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

export default toNewPatient;