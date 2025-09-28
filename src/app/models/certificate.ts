export interface ObtainedCertificate {
  obtainedCertificateId: number;
  dateObtained: Date;
  certificate: Certificate;
}

export interface Certificate {
  certificateId: number;
  name: string;
  description: string;
  code: string;
}
