import patients from '../../data/patients.ts' with { type: "json" };
import type { NonSensitivePatientEntry } from '../types.ts';

const getNonSensitivePatients = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

export default {
  getNonSensitivePatients
};