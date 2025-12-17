import { ServiceRequest, RequestStatus, ServiceType, SystemLog } from '../types';

// Initial Mock Data
let requests: ServiceRequest[] = [
  {
    id: 'REQ-1001',
    studentName: 'Mohamed Amine',
    studentId: 'S101010',
    type: ServiceType.ROOM_BOOKING,
    details: 'Requesting Room 304 for AI Club workshop.',
    date: new Date(Date.now() - 86400000 * 5).toISOString(),
    status: RequestStatus.APPROVED,
    xmlPayload: `<ServiceRequest>\n  <ID>REQ-1001</ID>\n  <Type>Room Reservation</Type>\n  <Student>S101010</Student>\n</ServiceRequest>`,
    adminComments: 'Granted. Please ensure the projector is turned off after use.'
  },
  {
    id: 'REQ-1002',
    studentName: 'Fatima Zahra',
    studentId: 'S202020',
    type: ServiceType.CERTIFICATE,
    details: 'Urgent: Transcript needed for scholarship application.',
    date: new Date(Date.now() - 86400000 * 3).toISOString(),
    status: RequestStatus.PENDING,
    xmlPayload: `<ServiceRequest>\n  <ID>REQ-1002</ID>\n  <Type>Certificate Issuance</Type>\n  <Student>S202020</Student>\n</ServiceRequest>`
  },
  {
    id: 'REQ-1003',
    studentName: 'Youssef Benali',
    studentId: 'S303030',
    type: ServiceType.EQUIPMENT_LOAN,
    details: 'Borrowing a DSLR camera for the photography club weekend trip.',
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
    status: RequestStatus.REJECTED,
    xmlPayload: `<ServiceRequest>\n  <ID>REQ-1003</ID>\n  <Type>Equipment Loan</Type>\n  <Student>S303030</Student>\n</ServiceRequest>`,
    adminComments: 'Insurance policy expired. Cannot loan high-value assets.'
  },
  {
    id: 'REQ-1004',
    studentName: 'Omar Tazi',
    studentId: 'S404040',
    type: ServiceType.EVENT_APPROVAL,
    details: 'Charity bake sale in the main courtyard next Tuesday.',
    date: new Date(Date.now() - 43200000).toISOString(),
    status: RequestStatus.PENDING,
    xmlPayload: `<ServiceRequest>\n  <ID>REQ-1004</ID>\n  <Type>Club Event Approval</Type>\n  <Student>S404040</Student>\n</ServiceRequest>`
  },
  {
    id: 'REQ-1005',
    studentName: 'Salma Bennani',
    studentId: 'S505050',
    type: ServiceType.CERTIFICATE,
    details: 'Enrollment verification letter for bus pass.',
    date: new Date(Date.now() - 21600000).toISOString(),
    status: RequestStatus.APPROVED,
    xmlPayload: `<ServiceRequest>\n  <ID>REQ-1005</ID>\n  <Type>Certificate Issuance</Type>\n  <Student>S505050</Student>\n</ServiceRequest>`
  },
  {
    id: 'REQ-1006',
    studentName: 'Ahmed El Idrissi',
    studentId: 'S606060',
    type: ServiceType.ROOM_BOOKING,
    details: 'Study group room needed for Finals prep. 4 people.',
    date: new Date(Date.now() - 3600000).toISOString(),
    status: RequestStatus.PENDING,
    xmlPayload: `<ServiceRequest>\n  <ID>REQ-1006</ID>\n  <Type>Room Reservation</Type>\n  <Student>S606060</Student>\n</ServiceRequest>`
  },
  {
    id: 'REQ-1007',
    studentName: 'Hicham Alami',
    studentId: 'S707070',
    type: ServiceType.EQUIPMENT_LOAN,
    details: 'Laptop loan for coding hackathon.',
    date: new Date(Date.now() - 7200000).toISOString(),
    status: RequestStatus.PENDING,
    xmlPayload: `<ServiceRequest>\n  <ID>REQ-1007</ID>\n  <Type>Equipment Loan</Type>\n  <Student>S707070</Student>\n</ServiceRequest>`
  },
  {
    id: 'REQ-1008',
    studentName: 'Karim Berrada',
    studentId: 'S808080',
    type: ServiceType.EVENT_APPROVAL,
    details: 'Guest speaker event: "Future of Tech in Morocco".',
    date: new Date(Date.now() - 86400000 * 7).toISOString(),
    status: RequestStatus.APPROVED,
    xmlPayload: `<ServiceRequest>\n  <ID>REQ-1008</ID>\n  <Type>Club Event Approval</Type>\n  <Student>S808080</Student>\n</ServiceRequest>`
  },
  {
    id: 'REQ-1009',
    studentName: 'Zineb El Fassi',
    studentId: 'S909090',
    type: ServiceType.CERTIFICATE,
    details: 'Graduation expected date letter.',
    date: new Date(Date.now() - 1000000).toISOString(),
    status: RequestStatus.PENDING,
    xmlPayload: `<ServiceRequest>\n  <ID>REQ-1009</ID>\n  <Type>Certificate Issuance</Type>\n  <Student>S909090</Student>\n</ServiceRequest>`
  },
  {
    id: 'REQ-1010',
    studentName: 'Bilal Chraibi',
    studentId: 'S111111',
    type: ServiceType.ROOM_BOOKING,
    details: 'Auditorium booking for Drama Club rehearsal.',
    date: new Date(Date.now() - 86400000 * 1).toISOString(),
    status: RequestStatus.REJECTED,
    xmlPayload: `<ServiceRequest>\n  <ID>REQ-1010</ID>\n  <Type>Room Reservation</Type>\n  <Student>S111111</Student>\n</ServiceRequest>`,
    adminComments: 'Auditorium is under maintenance.'
  }
];

// Log Simulation
let logSubscribers: ((log: SystemLog) => void)[] = [];

const emitLog = (source: SystemLog['source'], message: string, type: SystemLog['type'] = 'INFO') => {
  const log: SystemLog = {
    id: Math.random().toString(36).substring(7),
    timestamp: new Date().toLocaleTimeString(),
    source,
    message,
    type
  };
  logSubscribers.forEach(cb => cb(log));
};

export const subscribeToLogs = (callback: (log: SystemLog) => void) => {
  logSubscribers.push(callback);
  return () => {
    logSubscribers = logSubscribers.filter(cb => cb !== callback);
  };
};

// Start background noise logs
setInterval(() => {
  if (Math.random() > 0.7) {
    const events = [
      { s: 'SOAP-GW', m: 'Heartbeat check: ACTIVE' },
      { s: 'DB-SHARD-1', m: 'Connection pool: 45/50 used' },
      { s: 'REST-API', m: 'Cache invalidation cycle started' },
      { s: 'AUTH', m: 'Token refresh cycle: OK' }
    ];
    const evt = events[Math.floor(Math.random() * events.length)];
    emitLog(evt.s as any, evt.m);
  }
}, 3500);

export const generateXML = (req: Partial<ServiceRequest>): string => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<ServiceRequest xmlns="http://university.edu/schema/service">
  <Header>
    <Timestamp>${new Date().toISOString()}</Timestamp>
    <Source>StudentPortal_WebClient</Source>
    <SecurityToken>eyJh...[truncated]</SecurityToken>
  </Header>
  <Body>
    <Student>
      <ID>${req.studentId || 'UNKNOWN'}</ID>
      <Name>${req.studentName || 'Unknown'}</Name>
    </Student>
    <Service>
      <Type>${req.type}</Type>
      <Description>${req.details}</Description>
    </Service>
  </Body>
</ServiceRequest>`;
};

// Simulate REST GET
export const fetchRequests = async (): Promise<ServiceRequest[]> => {
  emitLog('REST-API', 'GET /api/v1/requests - Received', 'INFO');
  return new Promise((resolve) => {
    setTimeout(() => {
      emitLog('DB-SHARD-1', 'SELECT * FROM requests LIMIT 50', 'SUCCESS');
      resolve([...requests]);
    }, 600);
  });
};

// Simulate SOAP Validation -> REST Create
export const createRequest = async (data: Omit<ServiceRequest, 'id' | 'status' | 'date' | 'xmlPayload'>): Promise<ServiceRequest> => {
  emitLog('SOAP-GW', 'Inbound Envelope Received. Size: 1.2KB', 'INFO');
  return new Promise((resolve) => {
    setTimeout(() => {
      emitLog('SOAP-GW', 'XSD Validation: PASSED', 'SUCCESS');
      emitLog('REST-API', 'Unmarshalling XML to Java Object...', 'INFO');
      
      const newReq: ServiceRequest = {
        ...data,
        id: `REQ-${Math.floor(Math.random() * 9000) + 1000}`,
        status: RequestStatus.PENDING,
        date: new Date().toISOString(),
        xmlPayload: generateXML(data)
      };
      // In a real app, the SOAP service would parse the XML above and insert into DB
      requests = [newReq, ...requests];
      emitLog('DB-SHARD-1', `INSERT INTO requests VALUES (${newReq.id})`, 'SUCCESS');
      resolve(newReq);
    }, 1500); 
  });
};

// Simulate REST PATCH
export const updateRequestStatus = async (id: string, status: RequestStatus, comment?: string): Promise<void> => {
  emitLog('REST-API', `PATCH /api/requests/${id} [Status=${status}]`, 'INFO');
  return new Promise((resolve) => {
    setTimeout(() => {
      requests = requests.map(r => r.id === id ? { ...r, status, adminComments: comment } : r);
      emitLog('DB-SHARD-1', `UPDATE requests SET status='${status}' WHERE id='${id}'`, 'SUCCESS');
      // Mock triggering an email notification simulation
      emitLog('SOAP-GW', `Notification Service: Queued email to student`, 'INFO');
      resolve();
    }, 800);
  });
};