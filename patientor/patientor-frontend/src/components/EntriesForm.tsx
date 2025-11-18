import {Button} from '@mui/material';
import { Diagnosis } from '../types';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';

interface EntriesFormProps {
    handleSubmit: (event: React.SyntheticEvent) => void;
    handleReset: (event: React.SyntheticEvent) => void;
    newDescription: string;
    setNewDescription: React.Dispatch<React.SetStateAction<string>>;
    newDate: string;
    setNewDate: React.Dispatch<React.SetStateAction<string>>;
    newSpecialist: string;
    setNewSpecialist: React.Dispatch<React.SetStateAction<string>>;
    newHealthCheckRating: string;
    setNewHealthCheckRating: React.Dispatch<React.SetStateAction<string>>;
    newEmployerName: string;
    setNewEmployerName: React.Dispatch<React.SetStateAction<string>>;
    newDiagnosisCodes: string[];
    setNewDiagnosisCodes: React.Dispatch<React.SetStateAction<string[]>>;
    dischargeDate: string;
    setDischargeDate: React.Dispatch<React.SetStateAction<string>>;
    dischargeCriteria: string;
    setDischargeCriteria: React.Dispatch<React.SetStateAction<string>>;
    sickLeaveStartDate: string;
    setSickLeaveStartDate: React.Dispatch<React.SetStateAction<string>>;
    sickLeaveEndDate: string;
    setSickLeaveEndDate: React.Dispatch<React.SetStateAction<string>>;
    entryType: 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare';
    setEntryType: React.Dispatch<React.SetStateAction<'HealthCheck' | 'Hospital' | 'OccupationalHealthcare'>>;
    diagnoses: Diagnosis[];
}

const EntriesForm = ({
    handleSubmit, handleReset,
    newDescription, setNewDescription, newDate, setNewDate,
    newSpecialist, setNewSpecialist, 
    newHealthCheckRating, setNewHealthCheckRating,
    newEmployerName, setNewEmployerName,
    newDiagnosisCodes, setNewDiagnosisCodes, 
    dischargeDate, setDischargeDate, 
    dischargeCriteria, setDischargeCriteria,
    sickLeaveStartDate, setSickLeaveStartDate,
    sickLeaveEndDate, setSickLeaveEndDate,
    entryType, setEntryType,
    diagnoses
}: EntriesFormProps) => {

     const handleDiagnosisChange = (event: SelectChangeEvent<string[]>) => {
        const { target: { value } } = event;
        setNewDiagnosisCodes(typeof value === 'string' ? value.split(',') : value);
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
        <form onSubmit={handleSubmit} style={{border: '2px solid black', padding: '10px'}} onReset={handleReset}>
            <h3>New {entryType} Entry</h3> 
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
                {/*ex 9.30, used multiple select for diagnosis codes, in this case chip */}
                <FormControl fullWidth>
                    <InputLabel id="diagnosis-codes-label">Diagnosis Codes</InputLabel>
                    <Select
                        labelId="diagnosis-codes-label"
                        multiple
                        value={newDiagnosisCodes}
                        onChange={handleDiagnosisChange}
                        input={<OutlinedInput label="Diagnosis Codes" size='small'/>}
                        renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((code) => (
                                <Chip key={code} label={code} size="small" />
                            ))}
                        </Box>
                        )}>
                        
                        {diagnoses.map((diagnosis) => (
                            <MenuItem key={diagnosis.code} value={diagnosis.code}>
                                {diagnosis.code} - {diagnosis.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>

            {/*CONDITIONAL FIELDS DEPENDING OF THE ENTRY TYPE */}

            {entryType === 'HealthCheck' && (
            <div style={divOfInputStyles}>
                <label style={labelStyles}>HealthCheck Rating</label>
                <input placeholder='Insert a number between 0-3' value={newHealthCheckRating} style={inputStyles} onChange={(event) => setNewHealthCheckRating(event.target.value)} />
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
    );
};

export default EntriesForm;

