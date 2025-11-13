import { Gender, HealthCheckRating, NewPatientEntry } from "./types";
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

// const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
//   if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
//     return [] as Array<Diagnosis['code']>;
//   }
//   return object.diagnosisCodes as Array<Diagnosis['code']>;
// };

// schemas for entries
const baseEntrySchema = z.object({
  date: z.string(),
  description: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional()
});

const healthCheckEntrySchema = baseEntrySchema.extend({
  type: z.literal('HealthCheck'),
  healthCheckRating: z.nativeEnum(HealthCheckRating)
});

const occupationalHealthcareEntrySchema = baseEntrySchema.extend({
  type: z.literal('OccupationalHealthcare'),
  employerName: z.string(),
  sickLeave: z.object({
    startDate: z.string(),
    endDate: z.string()
  }).optional(),
});

const hospitalEntrySchema = baseEntrySchema.extend({
  type: z.literal('Hospital'),
  discharge: z.object({
    date: z.string(),
    criteria: z.string()
  }),
});

export const newEntrySchemaUnion = z.discriminatedUnion('type', [
  healthCheckEntrySchema,
  occupationalHealthcareEntrySchema,
  hospitalEntrySchema
]);

// infer type from Schema
export type NewEntry = z.infer<typeof newEntrySchemaUnion>;

export const toNewEntry = (object: unknown): NewEntry => {
  return newEntrySchemaUnion.parse(object);
};

export default toNewPatientEntry;