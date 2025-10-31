import { Gender, NewPatientEntry } from "./types";
import { z } from 'zod';

export const newEntrySchema = z.object({
    name: z.string(),
    dateOfBirth: z.string(),
    ssn: z.string(),
    gender: z.nativeEnum(Gender),
    occupation: z.string()
});

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  return newEntrySchema.parse(object);
};

export default toNewPatientEntry;