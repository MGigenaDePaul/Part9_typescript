import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { Diagnosis, Entry, EntryWithoutId, Patient} from "../types";
import { useEffect, useState } from 'react';
import EntryDetails from './EntryDetails';
import patientService from '../services/patients';
import {Alert} from '@mui/material';
import EntriesForm from './EntriesForm';
import axios from 'axios';

interface PatientDetailsProps  {
    patient: Patient | undefined | null;
    diagnoses: Diagnosis[];
}

const PatientDetails = ({patient, diagnoses}: PatientDetailsProps) => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [newDescription, setNewDescription] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newSpecialist, setNewSpecialist] = useState('');
  const [newHealthCheckRating, setNewHealthCheckRating] = useState('');
  const [newDiagnosisCodes, setNewDiagnosisCodes] = useState<string[]>([]);
  const [error, setError] = useState<string>('');
  const [entryType, setEntryType] = useState<'HealthCheck' | 'Hospital' | 'OccupationalHealthcare'>('HealthCheck');

  // STATES HOSPITAL
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  // STATES OCCUPATIONALHEALTHCARE
  const [newEmployerName, setNewEmployerName] = useState('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');

  useEffect(() => {
    if (patient?.entries){
      setEntries(patient.entries);
    }
  }, [patient]);

   if (!patient) {
    return null;
  }

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const baseEntry = {
      description: newDescription,
      date: newDate,
      specialist: newSpecialist,
      diagnosisCodes: ( newDiagnosisCodes && newDiagnosisCodes.length > 0 ) ? newDiagnosisCodes : undefined
      };

    // create entry depending on the type
    let entryToAdd: EntryWithoutId;

    switch (entryType) {
      case 'HealthCheck':
        entryToAdd = {
          ...baseEntry,
          type: 'HealthCheck' as const,
          healthCheckRating: Number(newHealthCheckRating),
        }; break;
      case 'Hospital':
        entryToAdd = {
          ...baseEntry,
          type: 'Hospital' as const,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria
          }
        }; break;
      case 'OccupationalHealthcare':
        entryToAdd = {
          ...baseEntry,
          type: 'OccupationalHealthcare' as const,
          employerName: newEmployerName,
          sickLeave: {
            startDate: sickLeaveStartDate,
            endDate: sickLeaveEndDate
          }
        }; break;
    }

    const addedEntry = await patientService.addEntry(patient.id, entryToAdd);
    setEntries(entries.concat(addedEntry));

    setNewDescription('');
    setNewDate('');
    setNewSpecialist('');
    setNewHealthCheckRating('');
    setNewDiagnosisCodes([]);
    setDischargeDate('');
    setDischargeCriteria('');
    setNewEmployerName('');
    setSickLeaveStartDate('');
    setSickLeaveEndDate('');
    setError('');
    } catch (error) {
      if (axios.isAxiosError(error)) {  
        if (error.response?.data) {
          console.log('error response data', error.response.data);
          const errorData = error.response.data;

          // handle errors from zod like { error: [...] }
            if (errorData.error && Array.isArray(errorData.error)) {
              console.log('data error', errorData.error);
              const errorMessages = errorData.error.map((error: { path: unknown[]; message: unknown; }) => {
                const field = error.path.join('');
                return `Value of ${field} Incorrect: ${newHealthCheckRating}`;
              }).join('. ');
              setError(errorMessages);
            } 
          // if it's a string
            else if (typeof errorData === 'string') {
              setError(errorData);
            } 
          // if it's another object
            else {
              setError(JSON.stringify(errorData));
            }
        }
      } else {
        setError('Error connecting to server');
      }
    }
  };

  const handleReset = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setNewDescription('');
    setNewDate('');
    setNewSpecialist('');
    setNewHealthCheckRating('');
    setNewDiagnosisCodes([]);
    setDischargeDate('');
    setDischargeCriteria('');
    setNewEmployerName('');
    setSickLeaveStartDate('');
    setSickLeaveEndDate('');
    setError('');
  };

  return (
    <div>
      <h2 style={{display: 'flex'}}>
        {patient.name}
        { ( (patient.gender === 'female') && <FemaleIcon /> ) 
        || ( (patient.gender === 'male') && <MaleIcon /> ) 
        }
      </h2>
      <br />
      ssn: {patient.ssn || 'no ssn available'}
      <br />
      occupation: {patient.occupation}
      <br />
      <br />
      {/*IF THERE'S AN ERROR, DISPLAY IT */}
      {error && <Alert severity={'error'}>{error}</Alert>}
      {/*ENTRIES FORM */}
      <EntriesForm handleSubmit={handleSubmit} handleReset={handleReset}
        newDescription={newDescription} setNewDescription={setNewDescription}
        newDate={newDate} setNewDate={setNewDate} 
        newSpecialist={newSpecialist} setNewSpecialist={setNewSpecialist}
        newHealthCheckRating={newHealthCheckRating} setNewHealthCheckRating={setNewHealthCheckRating}
        newEmployerName={newEmployerName} setNewEmployerName={setNewEmployerName} 
        newDiagnosisCodes={newDiagnosisCodes} setNewDiagnosisCodes={setNewDiagnosisCodes}
        dischargeDate={dischargeDate} setDischargeDate={setDischargeDate}
        dischargeCriteria={dischargeCriteria} setDischargeCriteria={setDischargeCriteria}
        sickLeaveStartDate={sickLeaveStartDate} setSickLeaveStartDate={setSickLeaveStartDate}
        sickLeaveEndDate={sickLeaveEndDate} setSickLeaveEndDate={setSickLeaveEndDate}
        entryType={entryType} setEntryType={setEntryType} diagnoses={diagnoses}
      />
      {/*display the entries */}
      <h2>entries</h2>
      {entries.length === 0 
          ? <p>No entries available</p> 
          : entries.map(entry => (
                <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
            ))
      }
    </div>
  );
};

export default PatientDetails;