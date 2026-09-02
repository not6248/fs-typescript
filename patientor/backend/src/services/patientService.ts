import patients from '../../data/patients.ts' with { type: "json" };
import type { NewPatientEntry, NonSensitivePatientEntry, PatientEntry } from '../types.ts';
import { v4 as uuid } from 'uuid';

const getNonSensitivePatients = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getNonSensitivePatients,
  addPatient
};