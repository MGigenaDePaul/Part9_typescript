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

const addPatient = (entry: NewPatientEntry): Patient => {
   const newDiaryEntry = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    id: uuid(),
    ...entry
  };

  patients.concat(newDiaryEntry);
  return newDiaryEntry;
};

export default {
    getEntries,
    getNonSensitiveEntries,
    addPatient
};