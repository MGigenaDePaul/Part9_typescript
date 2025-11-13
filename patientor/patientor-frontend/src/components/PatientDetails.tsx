import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { Diagnosis, Patient} from "../types";

import EntryDetails from './EntryDetails';

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
          : patient.entries.map(entry => (
                <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
            ))
      }
    </div>
  );
};

export default PatientDetails;