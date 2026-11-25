import { z } from 'zod';

export interface DiagnosisEntry {
  code: string;
  name: string;
  latin?: string;
}

export const Gender = {
  Male:'male',
  Female:'female',
  Other:'other'
} as const;

export type Gender = typeof Gender [keyof typeof Gender];

export const NewEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string()
});


export type NewPatientEntry = z.infer<typeof NewEntrySchema>;

export interface PatientEntry extends NewPatientEntry {
  id: string;
}

export type NonSensitivePatientEntry = Omit<PatientEntry,'ssn'>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {
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

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;