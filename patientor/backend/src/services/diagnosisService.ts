import diagnoses from '../../data/diagnoses.ts' with { type: "json" };
import type { DiagnosisEntry } from '../types.ts';

const getDiagnoses = (): DiagnosisEntry[] => {
  return diagnoses;
};

export default {
  getDiagnoses
};