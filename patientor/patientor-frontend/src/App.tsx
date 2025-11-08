import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Link, Routes, useMatch } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "./constants";
import { Diagnosis, Patient } from "./types";

import patientService from "./services/patients";
import diagnoseService from "./services/diagnoses";

import PatientListPage from "./components/PatientListPage";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

interface PatientDetailsProps  {
  patient: Patient | undefined | null;
  diagnoses: Diagnosis[];
}

const PatientDetails = ({patient, diagnoses}: PatientDetailsProps) => {
  if (!patient) {
    return null;
  }

  console.log('patient', patient);
  console.log('diagnoses', diagnoses);

  const getDescription = (code: string): string => {
    const diagnosis = diagnoses.find(d => d.code === code);
    return diagnosis ? diagnosis.name : '';
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
      <h2>entries</h2>
      {patient.entries.length === 0 
          ? <p>No entries available</p> 
          : (patient.entries.map(entry => (
              <div key={entry.id}>
                <p>{entry.date} <i>{entry.description}</i></p>
                {entry.diagnosisCodes?.map(diagCode => (
                    <li style={{marginLeft: '50px'}}key={diagCode}>{diagCode} {getDescription(diagCode)}</li>
                ))}
              </div>
            )))}
    </div>
  );
};

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  useEffect(() => {
    const fetchDiagnoseList = async() => {
      const diagnoses = await diagnoseService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnoseList();
  }, []);
  

  const match = useMatch('/patients/:id');
  const patient = match 
    ? patients.find(patient => patient.id === String(match.params.id))
    : null;

  return (
    <div className="App">
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
            <Route path="/patients/:id" element={<PatientDetails patient={patient} diagnoses={diagnoses}/>} />
          </Routes>
        </Container>
    </div>
  );
};

export default App;
