// import { Patient, Gender } from "./types";
// import { v1 as uuid } from 'uuid';
// import patients from '../data/patients';

// const isString = (text: unknown): text is string => {
//   return typeof text === 'string' || text instanceof String;
// };

// const parseGender = (gender: unknown): string => {
//     if (!gender || !isString(gender)) {
//         throw new Error('incorrect or missing gender');
//     }

//     return gender;
// };

// const parseName = (name: unknown): string => {
//   if (!name || !isString(name)){
//     throw new Error('incorrect or missing name');
//   }
//   return name;
// };

// const parseDateOfBirth = (dateOfBirth: unknown): string => {
//   if (!dateOfBirth || !isString(dateOfBirth)){
//     throw new Error ('incorrect or missing dateOfBirth');
//   }
//   return dateOfBirth;
// };

// const parseSsn = (ssn: unknown): string => {
//   if (!ssn || !isString(ssn)){
//     throw new Error('incorrect or missing ssn');
//   }
//   return ssn;
// };

// const parseOccupation = (occupation: unknown): string => {
//   if (!occupation || !isString(occupation)) {
//     throw new Error('incorrect or missing occupation');
//   }
//   return occupation;
// };

// const toNewPatientEntry = (object: unknown): Patient => {
//   if (!object || typeof object !== 'object') {
//     throw new Error('incorrect or missing data');
//   }

//   const newEntry: Patient = {
//     id: uuid(),
//     name: parseName(object.name),
//     dateofBirth: parseDateOfBirth(object.dateOfBirth),
//     ssn: parseSsn(object.ssn),
//     gender: parseGender(Gender),
//     occupation: parseOccupation(object.occupation)
//   };

//   patients.concat(newEntry);
//   return newEntry;
// };

// export default toNewPatientEntry;