import { Patient, NonSensitivePatientEntry, NewPatientEntry, EntryWithoutId } from '../types';
import patientData from '../../data/patients';
import { v1 as uuid } from 'uuid';

const patients: Patient[] = patientData;

const getEntries = (): Patient[] => {
    return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    }));
};

const findById = (id: string): Patient | undefined => {
  const entry = patients.find(p => p.id === id);
  return entry;
};

const addPatient = (entry: NewPatientEntry): Patient => {
   const newPatientEntry = {
    id: uuid(),
    ...entry,
    entries: [],
  };

  patients.concat(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (patientId: string, entry: EntryWithoutId): EntryWithoutId => {
  const patient = patients.find(p => p.id === patientId);

  if (!patient) {
    throw new Error('Patient not found');
  }

  const newEntry = {
    id: uuid(),
    ...entry,
  };

  patient.entries = patient.entries.concat(newEntry);
  return newEntry;
};

export default {
    getEntries,
    getNonSensitiveEntries,
    addPatient,
    findById,
    addEntry
};