export interface Experience {
  experienceId: number;
  startDate: Date;
  endDate: Date;
  projectName: string;
  companyName: string;
  description: string;
  role: Role;
  sector: Sector;
}

export interface Role {
  name: string;
  requestStatus: string;
}

export interface Sector {
  sectorName: string;
  requestStatus: string;
}
