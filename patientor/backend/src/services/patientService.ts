import patients from '../../data/patients.ts' with { type: "json" };
import type { NewPatientEntry, NonSensitivePatientEntry, Patient, PatientEntry } from '../types.ts';
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

const findById = (id: string): Patient | undefined => {
  const entry = patients.find(d => d.id === id);
  if (!entry) return undefined;

  return {
    id: entry.id,
    name: entry.name,
    ssn: entry.ssn,
    occupation: entry.occupation,
    gender: entry.gender,
    dateOfBirth: entry.dateOfBirth,
    entries: []
  };
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
  findById,
  addPatient
};