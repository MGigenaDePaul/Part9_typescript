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

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface OccupationalHealthcare extends BaseEntry{
    type: 'OccupationalHealthcare';
    employerName: string;
    sickLeave?: {
        startDate: string;
        endDate: string;
    };
}

export interface HospitalEntry extends BaseEntry {
    type: 'Hospital';
    discharge: {
        date: string;
        criteria: string;
    };
}

export interface HealthCheckEntry extends BaseEntry {
    type: 'HealthCheck';
    healthCheckRating: HealthCheckRating;
}

export type Entry = OccupationalHealthcare | HospitalEntry | HealthCheckEntry;

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