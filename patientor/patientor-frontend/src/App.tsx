import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Link, Routes, useMatch } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "./constants";
import { Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

const PatientDetails = ({patient}) => {
  if (!patient) {
    return null;
  }
  console.log('patient', patient);
  console.log('female', FemaleIcon);
  console.log('male', MaleIcon);

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
    </div>
  );
};

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);
  

  // for ex 9.22
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
            <Route path="/patients/:id" element={<PatientDetails patient={patient}/>} />
          </Routes>
        </Container>
    </div>
  );
};

export default App;
