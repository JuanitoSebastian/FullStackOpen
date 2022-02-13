import { NewPatient, Gender } from "../types";

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

type Fields = { name: unknown, gender: unknown, occupation: unknown, ssn: unknown, dateOfBirth: unknown };

const toNewPatient = ({ name, gender, occupation, ssn, dateOfBirth } : Fields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseString(name),
    occupation: parseString(occupation),
    ssn: parseString(ssn),
    gender: parseGender(gender),
    dateOfBirth: parseDate(dateOfBirth),
    entries: []
  };

  return newPatient;
};

export default toNewPatient;