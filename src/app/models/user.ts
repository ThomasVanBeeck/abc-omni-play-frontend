
    export interface User {
    id: bigint;
    firstName: string;
    lastName: string;
    appRole: AppRole;
    experiencePoints: bigint;
  }

  export enum AppRole {
    USER = "USER",
    ADMIN = "ADMIN",
    SUPERADMIN = "SUPERADMIN",
  }