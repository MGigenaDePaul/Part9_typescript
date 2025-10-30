export type Diagnosis = {
    code: string,
    name: string,
    latin?: string
};

export type Patient = {
    id: string,
    name: string,
    dateofBirth: string,
    ssn: string,
    gender: string, 
    occupation: string
};