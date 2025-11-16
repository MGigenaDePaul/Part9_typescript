import {Button} from '@mui/material';

const EntriesForm = ({handleSubmit, handleReset}) => {
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
    );
};

export default EntriesForm;

