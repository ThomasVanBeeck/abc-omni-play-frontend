export interface FleetCompanyConfig {
  configId: string;
  key: string;
  value: string;
  category: string;
  description: string;
  inputType: string;
}

export interface FleetCompany {
  companyId: string;
  companyName: string;
  bankDetailsId: string;
  configId: FleetCompanyConfig;
}

export interface CarDriver {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  company: FleetCompany;
}

export interface CarBrand {
  id: string;
  name: string;
}

export enum EngineType {
  DIESEL = 'DIESEL',
  PETROL = 'PETROL',
  ELECTRIC = 'ELECTRIC',
  HYBRID = 'HYBRID',
  UNKNOWN = 'UNKNOWN',
}

export enum TyreType {
  SUMMER = 'SUMMER',
  WINTER = 'WINTER',
  ALL_SEASON = 'ALL_SEASON',
  UNKNOWN = 'UNKNOWN',
}

export interface FleetBaseCar {
  carId: string;
  registrationPlate: string;
  firstRegistrationDate: string;
  lastRegistrationDate: string;
  brand: CarBrand;
  model: string;
  type: string;
  chassisNumber: string;
  co2: number;
  wltp: number;
  nedc1: number;
  nedc2: number;
  fuelConsumption: number;
  tireLocation: string;
  tireInformation: string;
  spareKeyLocation: string;
  extraInformation: string;
  carDriver: CarDriver;
  active: boolean;
  inOrder: boolean;
  carType: string; // Assuming CarType is a string in TypeScript, adjust as necessary
  mileage: number;
  lastMileageUpdatedAt: string;
  availableFrom: string;
  availableTo: string;
  expected: boolean;
  inspectionEndDate: string;
  nextCarServiceMileage: number;
  nextCarServiceDate: string;
  engineType: string; // Assuming EngineType is a string in TypeScript, adjust as necessary
  enginePower: string;
  weight: string;
  accountNumber: number;
  tireType: string; // Assuming TyreType is a string in TypeScript, adjust as necessary
  catalogValue: number;
}

export interface CarGarage {
  id: string;
  name: string;
  email: string;
  telephone: string;
  residence: string;
  defaultGarage: string;
}

export interface FleetCompanyCar extends FleetBaseCar {
  owner: FleetCompany;
  purchaseDate: string;
  garage: CarGarage;
  insuranceAgent: string;
  insuranceContractNumber: string;
  insuranceContractEndDate: string;
  purchaseCost: number;
}

export interface FleetLeasingCompany {
  id: string;
  name: string;
  defaultLeasingCompany: boolean;
  email: string;
  telephone: string;
  address: string;
}

export interface FleetLeasingCar extends FleetBaseCar {
  leasingCompany: FleetLeasingCompany;
  lessee: FleetCompany;
  leasePrice: number;
  expectedDeliveryDate: string;
  startDateContract: string;
  endDateContract: string;
  extraInformationContract: string;
  promisedCarDriver: CarDriver;
  delivered: boolean;
  orderDate: string;
}

/* Fleet Driver */
export interface FleetMinimalCar {
  carId: string;
  registrationPlate: string;
  brand: CarBrand;
  carType: string;
  mileage: number;
  lastUpdatedMileage: string;
}

export interface FleetMinimalFuelCard {
  cardNumber: string;
  activationDate: string;
  expirationDate: string;
}

export interface FleetDriver extends CarDriver {
  email: string;
  residence: string;
  car: FleetMinimalCar;
  inOrderCars: FleetMinimalCar[];
  fuelCard: FleetMinimalFuelCard;
  active: boolean;
}

export interface FleetCarAttachment {
  name: string;
  size: number;
  url: string;
  thumbnailUrl: string;
}

export interface FleetCarAttachmentDetail {
  fileId: string;
  content: string;
  fileName: string;
  size: number;
}

export interface Item {
  title: string;
  value: string;
  clipboard: string;
}

export interface ItemGroup {
  title: string;
  icon: any;
  dropDownKey: string;
  items: Item[];
}

export interface InputCarImg {
  brand: string;
  carYear: string;
  zoomLevel: number;
  width: number;
  model: string;
  angle: number;
  key: string;
}
