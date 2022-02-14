import { Discharge, Gender, HealthCheckRating, SickLeave } from "../types";

export const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const parseString = (text: unknown): string => {
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

export const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }

  return gender;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect date: ' + date);
  }

  return date;
};

const isArray = (array: unknown): array is [] => {
  return Array.isArray(array);
};

export const parseDiagnosisCodes = (diagnosisCodes: unknown): string[] | undefined => {
  if (!diagnosisCodes) { return undefined; }
  if (!isArray(diagnosisCodes)) {
    throw new Error('Incorred diagnosis codes' + diagnosisCodes);
  }
  if (diagnosisCodes.length === 0) {
    return undefined;
  }

  return diagnosisCodes.map(code => parseString(code));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

export const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (healthCheckRating === undefined || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Invalid Health Check Rating: ' + healthCheckRating);
  }

  return healthCheckRating;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSickLeave = (sickLeave: any): sickLeave is SickLeave => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (!sickLeave.startDate || !sickLeave.endDate || !isDate(sickLeave.startDate) || !isDate(sickLeave.endDate)) {
    return false;
  }

  return true;
};

export const parseSickLeave = (sickLeave: unknown): SickLeave | undefined => {
  if (!sickLeave) { return undefined; }

  if (!isSickLeave(sickLeave)) {
    throw new Error('Incorrect SickLeave: ' + sickLeave);
  }

  return sickLeave;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (discharge: any): discharge is Discharge => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (!discharge.date || !discharge.date || !isDate(discharge.date) || !isString(discharge.criteria)) {
    return false;
  }

  return true;
};

export const parseDischarge = (discharge: unknown): Discharge => {
  if (!isDischarge(discharge)) {
    throw new Error('Invalid Discharge: ' + discharge);
  }

  return discharge;
};