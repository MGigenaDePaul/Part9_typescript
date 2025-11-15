import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { Diagnosis, Entry, Patient} from "../types";
import { useEffect, useState } from 'react';
import EntryDetails from './EntryDetails';
import patientService from '../services/patients';
import {Alert, Button} from '@mui/material';
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
  const [newDiagnosisCodes, setNewDiagnosisCodes] = useState('');
  const [error, setError] = useState<string>('');
  const [entryType, setEntryType] = useState<'HealthCheck' | 'Hospital' | 'OccupationalHealthcare'>('HealthCheck');

  // STATES HOSPITAL
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  // STATES OCCUPATIONALHEALTHCARE
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
  const [sickLeaveEnddate, setSickLeaveEndDate] = useState('');

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
      const entryToAdd = {
      type: 'HealthCheck' as const,
      description: newDescription,
      date: newDate,
      specialist: newSpecialist,
      healthCheckRating: Number(newHealthCheckRating),
      diagnosisCodes: newDiagnosisCodes ? newDiagnosisCodes.split(',').map(diagCode => diagCode.trim()) : undefined,
    };

    const addedEntry = await patientService.addEntry(patient.id, entryToAdd);
    setEntries(entries.concat(addedEntry));

    setNewDescription('');
    setNewDate('');
    setNewSpecialist('');
    setNewHealthCheckRating('');
    setNewDiagnosisCodes('');
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
    setNewDiagnosisCodes('');  
  };

  const divOfInputStyles = {
    padding: '5px',
  };

  const labelStyles = {
    display: 'flex',
    alignContent: 'start',
    justifyContent: 'space-between',
    fontSize: '12px',
    fontWeight: 'bold',
    color: 'rgba(100, 100, 100, 2)'
  };

  const inputStyles = {
    border: 'none',
    borderBottom: '1px solid black',
    width: '100%',
    outline: 'none',
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
      <form onSubmit={handleSubmit} style={{border: '2px solid black', padding: '10px'}} onReset={handleReset}>
        <h3>New HealthCheck entry</h3>
        <div style={divOfInputStyles}>
          <label style={labelStyles}>Description</label>
          <input type='text' style={inputStyles} value={newDescription} onChange={(event) => setNewDescription(event.target.value)}/>
        </div>
        <div style={divOfInputStyles}>
          <label style={labelStyles}>Date</label>
          <input value={newDate} style={inputStyles} onChange={(event) => setNewDate(event.target.value)} />
        </div>
        <div style={divOfInputStyles}>
          <label style={labelStyles}>Specialist</label>
          <input value={newSpecialist} style={inputStyles} onChange={(event) => setNewSpecialist(event.target.value)} />
        </div>
        <div style={divOfInputStyles}>
          <label style={labelStyles}>HealthCheck Rating</label>
          <input value={newHealthCheckRating} style={inputStyles} onChange={(event) => setNewHealthCheckRating(event.target.value)} />
        </div>
        <div style={divOfInputStyles}>
          <label style={labelStyles}>Diagnoses Codes</label>
          <input value={newDiagnosisCodes} style={inputStyles} onChange={(event) => setNewDiagnosisCodes(event.target.value)} />
        </div>

        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '10px'}}>
          <Button type='reset' style={{background: 'rgb(238, 53, 77)'}} variant='contained'>CANCEL</Button>
          <Button type='submit' style={{background: 'rgb(110, 110, 110)'}} variant='contained'>ADD</Button>
        </div>
      </form>
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