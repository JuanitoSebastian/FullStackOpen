import diagnosesData from '../../data/diagnoses.json';
import { Diagnosis } from '../types';

const diagnoses: Diagnosis[] = diagnosesData;

const getAll = (): Diagnosis[] => {
  return diagnoses;
};

export default {
  getEntries: getAll
};