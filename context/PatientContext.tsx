import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface PatientContextType {
    patientId: string;
    setPatientId: (id: string) => void;
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);

export function PatientProvider({ children }: { children: ReactNode }) {
    const [patientId, setPatientId] = useState<string>('');

    return (
        <PatientContext.Provider value={{ patientId, setPatientId }}>
            {children}
        </PatientContext.Provider>
    );
}

export function usePatient() {
    const context = useContext(PatientContext);
    if (context === undefined) {
        throw new Error('usePatient must be used within a PatientProvider');
    }
    return context;
}