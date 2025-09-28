export interface Profile {
  id: string;
  givenName: string;
  surname: string;
  mail: string;
  jobTitle: string;
  mobilePhone: string;
  businessPhones: string[];
  officeLocation: string;
  preferredLanguage: string;
  userPrincipalName: string;
  displayName: string;
  manager: Profile;
}
