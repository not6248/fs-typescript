import express, { type Response } from 'express';
import diagnosisService from '../services/diagnosisService.ts';
import type { DiagnosisEntry } from '../types.ts';

const router = express.Router();

router.get('/', (_req, res: Response<DiagnosisEntry[]>) => {
  console.log("diagnoses.ts");
  res.send(diagnosisService.getDiagnoses());
});

export default router;