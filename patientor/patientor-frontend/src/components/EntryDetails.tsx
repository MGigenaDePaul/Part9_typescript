import { Diagnosis, Entry} from "../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface EntryDetailsProps {
    entry: Entry,
    diagnoses: Diagnosis[]
}

const EntryDetails = ({entry, diagnoses}: EntryDetailsProps) => {
    
    const getDiagnosisDescription = (code: string): string => {
        const diagnosis = diagnoses.find(d => d.code === code);
        return diagnosis ? diagnosis.name : 'This code does not exist';
    };

    const assertNever = (value: never): never => {
        throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
    };

    switch(entry.type){
        case "Hospital":
            return (
                <div style={{border: '2px solid black', padding: '10px'}}>
                    <b>{entry.date}</b> <LocalHospitalIcon />
                    <br />
                    <i>{entry.description}</i>
                    <br />
                    <FavoriteIcon style={{color: 'rgba(207, 207, 86, 1)'}}/>
                    <br />
                    {entry.diagnosisCodes 
                        ? 
                            <div>
                                <i>Codes</i>
                                {entry.diagnosisCodes?.map(diagCode => (<li style={{marginLeft: '25px'}}key={diagCode}>{diagCode}: {getDiagnosisDescription(diagCode)}</li>))}
                            </div>
                        :   <i>No codes</i>
                    }
                    <p>diagnose by {entry.specialist}</p>
                </div>
            );
        case "OccupationalHealthcare":
            return (
                <div style={{border: '2px solid black', marginTop: '10px', padding: '10px'}}>
                    <b>{entry.date}</b> <WorkOutlineIcon />
                    <br />
                    <i>{entry.description}</i>
                    <br />
                    {entry.diagnosisCodes 
                        ? 
                            <div>
                                <i>Codes</i>
                                {entry.diagnosisCodes?.map(diagCode => (<li style={{marginLeft: '25px'}}key={diagCode}>{diagCode}: {getDiagnosisDescription(diagCode)}</li>))}
                            </div>
                        :   <i>No codes</i>
                    }
                    <p>diagnose by {entry.specialist}</p>
                </div>
            );
        case "HealthCheck":
            return (
                <div style={{border: '2px solid black', marginTop: '10px', padding: '10px'}}>
                    <b>{entry.date}</b> <MedicalServicesIcon />
                    <br />
                    <i>{entry.description}</i>
                    <br />
                    <FavoriteIcon style={{color: 'rgba(181, 12, 12, 1)'}}/>
                    <br />
                    {entry.diagnosisCodes 
                        ? 
                            <div>
                                <i>Codes</i>
                                {entry.diagnosisCodes?.map(diagCode => (<li style={{marginLeft: '25px'}}key={diagCode}>{diagCode}: {getDiagnosisDescription(diagCode)}</li>))}
                            </div>
                        :   <i>No codes</i>
                    }
                    <p>diagnose by {entry.specialist}</p>
                </div>
            );
        default: 
            return assertNever(entry);
    }
};

export default EntryDetails;