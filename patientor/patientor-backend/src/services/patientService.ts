import { Patient, NonSensitivePatientEntry, NewPatientEntry } from '../types';
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

export default {
    getEntries,
    getNonSensitiveEntries,
    addPatient,
    findById
};