export enum UserRole {
  STUDENT = 'STUDENT',
  ADMIN = 'ADMIN'
}

export enum RequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export enum ServiceType {
  CERTIFICATE = 'Certificate Issuance',
  ROOM_BOOKING = 'Room Reservation',
  EVENT_APPROVAL = 'Club Event Approval',
  EQUIPMENT_LOAN = 'Equipment Loan'
}

export interface ServiceRequest {
  id: string;
  studentName: string;
  studentId: string;
  type: ServiceType;
  details: string;
  date: string;
  status: RequestStatus;
  xmlPayload: string; // Simulating the SOAP XML contract
  adminComments?: string;
}

export interface Stats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

export interface SystemLog {
  id: string;
  timestamp: string;
  source: 'SOAP-GW' | 'AUTH' | 'REST-API' | 'DB-SHARD-1';
  message: string;
  type: 'INFO' | 'SUCCESS' | 'WARN';
}