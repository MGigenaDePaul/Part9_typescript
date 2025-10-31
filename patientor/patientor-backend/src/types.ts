import z from "zod";
import { newEntrySchema } from "./utils";

export type Diagnosis = {
    code: string,
    name: string,
    latin?: string
};

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export type Patient = {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender, 
    occupation: string
};

export type NonSensitivePatientEntry = Omit<Patient, 'ssn'>;

// infer the type from Schema 
export type NewPatientEntry = z.infer<typeof newEntrySchema>;

// export type NewPatientEntry = Omit<Patient, 'id'>;