export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export type Entry = HealthCheckEntry | OccupationalHealthCareEntry | HospitalEntry;
export type NewEntry = NewHealthCheckEntry | NewOccupationalHealthCareEntry | NewHospitalEntry;

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export type NewBaseEntry = Omit<BaseEntry, 'id'>;

export enum HealthCheckRating {
  LowRisk = 1,
  HighRisk = 2,
  CriticalRisk = 3,
  Healthy = 0
}

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

export type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id'>;

export interface OccupationalHealthCareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: SickLeave;
}

export type NewOccupationalHealthCareEntry = Omit<OccupationalHealthCareEntry, 'id'>;

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: Discharge;
}

export type NewHospitalEntry = Omit<HospitalEntry, 'id'>;

export interface Discharge {
  date: string;
  criteria: string;
}

export interface SickLeave {
  startDate: string,
  endDate: string
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;

export enum Gender {
  Female = 'female',
  Other = 'other',
  Male = 'male'
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>;
export type NewPatient = Omit<Patient, 'id'>;