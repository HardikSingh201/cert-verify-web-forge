
export interface Certificate {
  id: string;
  recipientName: string;
  issuerName: string;
  courseName: string;
  issueDate: string;
  expiryDate?: string;
  certificateNumber: string;
  status: 'active' | 'expired' | 'revoked';
  description?: string;
  achievements?: string[];
}

// Mock data for frontend development
export const mockCertificates: Certificate[] = [
  {
    id: "cert-1234-abcd-5678",
    recipientName: "Jane Doe",
    issuerName: "Tech Academy",
    courseName: "Full Stack Web Development",
    issueDate: "2023-06-15",
    expiryDate: "2026-06-15",
    certificateNumber: "TA-FS-2023-001",
    status: "active",
    description: "Completed 600 hours of intensive training in modern web development technologies.",
    achievements: ["React", "Node.js", "MongoDB", "Express", "TypeScript"]
  },
  {
    id: "cert-5678-efgh-9012",
    recipientName: "John Smith",
    issuerName: "Design Institute",
    courseName: "UX/UI Design Fundamentals",
    issueDate: "2023-04-10",
    certificateNumber: "DI-UX-2023-042",
    status: "active",
    description: "Mastered user-centered design principles and prototyping techniques.",
    achievements: ["User Research", "Wireframing", "Figma", "Usability Testing"]
  },
  {
    id: "cert-9012-ijkl-3456", 
    recipientName: "Alex Johnson",
    issuerName: "Tech Academy",
    courseName: "DevOps Engineering",
    issueDate: "2022-11-20",
    expiryDate: "2023-11-20",
    certificateNumber: "TA-DO-2022-073",
    status: "expired",
    description: "Learned CI/CD pipelines and infrastructure automation.",
    achievements: ["Docker", "Kubernetes", "Jenkins", "AWS"]
  },
  {
    id: "cert-3456-mnop-7890",
    recipientName: "Sarah Williams",
    issuerName: "Cyber Security Institute",
    courseName: "Ethical Hacking",
    issueDate: "2023-01-05",
    certificateNumber: "CSI-EH-2023-019",
    status: "revoked",
    description: "Comprehensive training in network security and penetration testing.",
    achievements: ["Network Security", "Penetration Testing", "Security Auditing"]
  }
];

// This would be replaced by actual API calls in a production app
let certificates = [...mockCertificates];

export const getCertificates = () => {
  return [...certificates];
};

export const getCertificate = (id: string) => {
  return certificates.find(cert => cert.id === id || cert.certificateNumber === id);
};

export const addCertificate = (certificate: Omit<Certificate, 'id'>) => {
  const id = `cert-${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 6)}`;
  const newCert = { ...certificate, id };
  certificates.push(newCert);
  return newCert;
};

export const updateCertificate = (id: string, updates: Partial<Omit<Certificate, 'id'>>) => {
  const index = certificates.findIndex(cert => cert.id === id);
  if (index !== -1) {
    certificates[index] = { ...certificates[index], ...updates };
    return certificates[index];
  }
  return null;
};

export const deleteCertificate = (id: string) => {
  const index = certificates.findIndex(cert => cert.id === id);
  if (index !== -1) {
    const deleted = certificates[index];
    certificates = certificates.filter(cert => cert.id !== id);
    return deleted;
  }
  return null;
};

export const validateCertificate = (identifier: string) => {
  const certificate = certificates.find(
    cert => cert.id === identifier || cert.certificateNumber === identifier
  );
  
  if (!certificate) {
    return {
      isValid: false,
      message: "Certificate not found."
    };
  }
  
  if (certificate.status === "revoked") {
    return {
      isValid: false,
      certificate,
      message: "This certificate has been revoked."
    };
  }
  
  if (certificate.status === "expired" || 
      (certificate.expiryDate && new Date(certificate.expiryDate) < new Date())) {
    return {
      isValid: false,
      certificate,
      message: "This certificate has expired."
    };
  }
  
  return {
    isValid: true,
    certificate,
    message: "Valid certificate."
  };
};
