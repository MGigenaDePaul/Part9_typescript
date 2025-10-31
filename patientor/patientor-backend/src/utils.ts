import { Gender, NewPatientEntry } from "./types";

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    const newEntry: NewPatientEntry = {
        name: parseName(object.name),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation)
    };
    return newEntry;
  }

  throw new Error('inccorrect data: some fields are missing');
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

// name
const parseName = (name: unknown): string => {
  if (!name || !isString(name)){
    throw new Error('incorrect or missing name');
  }
  return name;
};

/* gender 
const parseGender = (gender: unknown): string => {
    if (!gender || !isString(gender)) {
        throw new Error('incorrect or missing gender');
    }
    return gender;
};
*/

// GENDER(enum)
const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

// date
const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)){
    throw new Error ('incorrect or missing dateOfBirth');
  }
  return dateOfBirth;
};

// ssn
const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)){
    throw new Error('incorrect or missing ssn');
  }
  return ssn;
};

// occupation
const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('incorrect or missing occupation');
  }
  return occupation;
};

export default toNewPatientEntry;