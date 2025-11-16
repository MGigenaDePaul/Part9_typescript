import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { Diagnosis, Entry, EntryWithoutId, Patient} from "../types";
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
      diagnosisCodes: newDiagnosisCodes ? newDiagnosisCodes.split(',').map(diagCode => diagCode.trim()) : undefined,
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
    setNewDiagnosisCodes('');
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
    setNewDiagnosisCodes('');
    setDischargeDate('');
    setDischargeCriteria('');
    setNewEmployerName('');
    setSickLeaveStartDate('');
    setSickLeaveEndDate('');
    setError('');
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

  const sickLeaveStyles = {
    border: 'none',
    borderBottom: '1px solid black',
    width: '20%',
    outline: 'none',
    marginLeft: '10px',
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
        <h3>New Entry</h3> 
        <div style={divOfInputStyles}>
          {/*SELECT ENTRY TYPE*/}
          <select value={entryType} onChange={(event) => setEntryType(event.target.value as 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare')}>
            <option value='HealthCheck'>HealthCheck</option>
            <option value='Hospital'>Hospital</option>
            <option value='OccupationalHealthcare'>OccupationalHealthCare</option>
          </select>
        </div>

        {/*COMMON FIELDS FOR ENTRIES*/}
        <div style={divOfInputStyles}>
          <label style={labelStyles}>Description</label>
          <input type='text' style={inputStyles} value={newDescription} onChange={(event) => setNewDescription(event.target.value)}/>
        </div>
        <div style={divOfInputStyles}>
          <label style={labelStyles}>Date</label>
          <input type='date' value={newDate} style={inputStyles} onChange={(event) => setNewDate(event.target.value)} />
        </div>
        <div style={divOfInputStyles}>
          <label style={labelStyles}>Specialist</label>
          <input value={newSpecialist} style={inputStyles} onChange={(event) => setNewSpecialist(event.target.value)} />
        </div>
        <div style={divOfInputStyles}>
          <label style={labelStyles}>Diagnoses Codes</label>
          <input value={newDiagnosisCodes} style={inputStyles} onChange={(event) => setNewDiagnosisCodes(event.target.value)} />
        </div>

        {/*CONDITIONAL FIELDS DEPENDING OF THE ENTRY TYPE */}

        {entryType === 'HealthCheck' && (
          <div style={divOfInputStyles}>
            <label style={labelStyles}>HealthCheck Rating</label>
            <input value={newHealthCheckRating} style={inputStyles} onChange={(event) => setNewHealthCheckRating(event.target.value)} />
          </div>
        )}

        {entryType === 'Hospital' && (
          <>          
            <div style={divOfInputStyles}>
              <label style={labelStyles}>Discharge Date</label>
              <input style={inputStyles} type='date' value={dischargeDate} onChange={(event) => setDischargeDate(event.target.value)} />
            </div>
            <div style={divOfInputStyles}>
              <label style={labelStyles}>Discharge Criteria</label>
              <input style={inputStyles} value={dischargeCriteria} onChange={(event) => setDischargeCriteria(event.target.value)} />
            </div>
          </>
        )}


        {entryType === 'OccupationalHealthcare' && (
          <>
            <div style={divOfInputStyles}>
              <label style={labelStyles}>Employer Name</label>
              <input style={inputStyles} value={newEmployerName} onChange={(event) => setNewEmployerName(event.target.value)} />
            </div>
            <div style={divOfInputStyles}>
              <label style={labelStyles}>SickLeave</label>
              <div>
                <label style={{marginLeft: '10px', fontSize: '12px', fontWeight: 'bold', color: 'rgba(100, 100, 100, 2)'}}>Start Date: </label>
                <input type='date' style={sickLeaveStyles} value={sickLeaveStartDate} onChange={(event) => setSickLeaveStartDate(event.target.value)} />
              </div>
              <div>
                <label style={{marginLeft: '10px', fontSize: '12px', fontWeight: 'bold', color: 'rgba(100, 100, 100, 2)'}}>End Date: </label>
                <input type='date' style={sickLeaveStyles} value={sickLeaveEndDate} onChange={(event) => setSickLeaveEndDate(event.target.value)} />
              </div>
            </div>
          </>
        )}

        
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