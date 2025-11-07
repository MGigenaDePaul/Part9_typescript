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

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {
}

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender, 
    occupation: string,
    entries: Entry[]
};

export type NonSensitivePatientEntry = Omit<Patient, 'ssn' | 'entries'>;

// infer the type from Schema 
export type NewPatientEntry = z.infer<typeof newEntrySchema>;

// export type NewPatientEntry = Omit<Patient, 'id'>;