export interface Owner {
  id: number;
  fullName: string;
  dateOfBirth: string;
  gender: string;
  typeofdocument: string;
  serialNumber: string;
  telephone: string;
  email: string;
}

export interface Animal {
  id: number;
  image: string;
  name: string;
  species: string;
  gender: string;
  birthDate: string;
  age: number;
  breed: string;
  color: string;
  ownerId: number;
  owner: Owner;
}

export interface Appointment {
  id: number;
  date: string;
  weight: number;
  type: string;
  doctorName: string;
  examinationDescription: string;
  animalId: number;
  animal: Animal;
}

export interface Diagnosis {
  id: number;
  description: string;
  medicines: string;
  price: string;
  appointmentId: number;
  appointment: Appointment;
}

export interface OwnerForm {
  id: number | null;
  fullName: string;
  dateOfBirth: string;
  gender: string;
  typeofdocument: string;
  serialNumber: string;
  telephone: string;
  email: string;
}
