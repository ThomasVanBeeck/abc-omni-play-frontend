import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  faAngleDown,
  faAngleUp,
  faCarSide,
  faCircleDot,
  faCircleInfo,
  faCopy,
  faFileContract,
  faKey,
  faPaperclip,
  faUserTie,
  faWarehouse
} from '@fortawesome/free-solid-svg-icons';
import { FleetCompanyCar, FleetLeasingCar, Item, ItemGroup } from '../../../../models/fleet';
import { TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.scss']
})
export class CarInfoComponent {

  @Input({ required: true }) fleetCar: FleetCompanyCar | FleetLeasingCar | undefined;
  @Input({ required: true }) dropDownCards: any;
  @Output() dropdownClicked = new EventEmitter<string>();
  @Output() clipBoardClicked = new EventEmitter<string>();

  constructor(private transService: TranslocoService) {
  }

  onClickDropDownCard(card: string) {
    this.dropdownClicked.emit(card);
  }

  writeToClipboard(content: string) {
    this.clipBoardClicked.emit(content);
  }

  /* Note: Add mew Item if needed, do not forget to also add it to the AllItemGroups */

  getItemsForCarDetails(): Item[] {
    if (!this.fleetCar) return [];

    return [
      {
        title: this.transService.translate('fleet.content.carInfo.registrationPlate'),
        value: this.fleetCar.registrationPlate,
        clipboard: this.fleetCar.registrationPlate
      },
      {
        title: this.transService.translate('fleet.content.carInfo.brandAndModel'),
        value: `${this.fleetCar.brand.name} ${this.fleetCar.type}`,
        clipboard: `${this.fleetCar.brand.name} ${this.fleetCar.type}`
      },
      {
        title: this.transService.translate('fleet.content.carInfo.chassisNumber'),
        value: this.fleetCar.chassisNumber,
        clipboard: this.fleetCar.chassisNumber
      },
      {
        title: this.transService.translate('fleet.content.carInfo.firstRegistrationDate'),
        value: this.fleetCar.firstRegistrationDate,
        clipboard: this.fleetCar.firstRegistrationDate
      },
      {
        title: this.transService.translate('fleet.content.carInfo.engineType'),
        value: this.fleetCar.engineType,
        clipboard: this.fleetCar.engineType
      },
      {
        title: this.transService.translate('fleet.content.carInfo.enginePower'),
        value: this.fleetCar.enginePower,
        clipboard: this.fleetCar.enginePower
      }
    ];

  }

  getItemsForCarTires(): Item[] {
    if (!this.fleetCar) return [];

    return [
      {
        title: this.transService.translate('fleet.content.carInfo.tireLocation'),
        value: this.fleetCar.tireLocation,
        clipboard: this.fleetCar.tireLocation
      },
      {
        title: this.transService.translate('fleet.content.carInfo.tireInformation'),
        value: this.fleetCar.tireInformation,
        clipboard: this.fleetCar.tireInformation
      },
      {
        title: this.transService.translate('fleet.content.carInfo.tireType'),
        value: this.fleetCar.tireType,
        clipboard: this.fleetCar.tireType
      }
    ];
  }

  getItemsForCarKeys(): Item[] {
    if (!this.fleetCar) return [];

    return [
      {
        title: this.transService.translate('fleet.content.carInfo.spireKeyLocation'),
        value: this.fleetCar.spareKeyLocation,
        clipboard: this.fleetCar.spareKeyLocation
      }
    ];
  }

  getItemsForCarLeasingDetails(): Item[] {
    if (!this.fleetCar) return [];

    if (!('leasingCompany' in this.fleetCar && this.fleetCar.leasingCompany != null)) return [];

    return [
      {
        title: this.transService.translate('fleet.content.name'),
        value: this.fleetCar.leasingCompany.name,
        clipboard: this.fleetCar.leasingCompany.name
      },
      {
        title: this.transService.translate('fleet.content.email'),
        value: this.fleetCar.leasingCompany.email,
        clipboard: this.fleetCar.leasingCompany.email
      },
      {
        title: this.transService.translate('fleet.content.phone'),
        value: this.fleetCar.leasingCompany.telephone,
        clipboard: this.fleetCar.leasingCompany.telephone
      },
      {
        title: this.transService.translate('fleet.content.address'),
        value: this.fleetCar.leasingCompany.address,
        clipboard: this.fleetCar.leasingCompany.address
      }
    ];
  }

  getItemsForCarOwnerDetails(): Item[] {
    if (!this.fleetCar) return [];

    if (!('owner' in this.fleetCar)) return [];

    return [
      {
        title: this.transService.translate('fleet.content.name'),
        value: this.fleetCar.owner.companyName,
        clipboard: this.fleetCar.owner.companyName
      },
      {
        title: this.transService.translate('fleet.content.carInfo.purchaseDate'),
        value: this.fleetCar.purchaseDate,
        clipboard: this.fleetCar.purchaseDate
      },
      {
        title: this.transService.translate('fleet.content.carInfo.catalogValue'),
        value: this.fleetCar.catalogValue + ' €',
        clipboard: this.fleetCar.catalogValue.toString()
      },
      {
        title: this.transService.translate('fleet.content.carInfo.purchaseCost'),
        value: this.fleetCar.purchaseCost + ' €',
        clipboard: this.fleetCar.purchaseCost.toString()
      }
    ];
  }

  getItemsForCarGarageDetails(): Item[] {
    if (!this.fleetCar) return [];

    if (!('garage' in this.fleetCar)) return [];

    return [
      {
        title: this.transService.translate('fleet.content.name'),
        value: this.fleetCar.garage.name,
        clipboard: this.fleetCar.garage.name
      },
      {
        title: this.transService.translate('fleet.content.email'),
        value: this.fleetCar.garage.email,
        clipboard: this.fleetCar.garage.email
      },
      {
        title: this.transService.translate('fleet.content.phone'),
        value: this.fleetCar.garage.telephone,
        clipboard: this.fleetCar.garage.telephone
      },
      {
        title: this.transService.translate('fleet.content.address'),
        value: this.fleetCar.garage.residence,
        clipboard: this.fleetCar.garage.residence
      }
    ];

  }

  getItemsForCarInsuranceDetails(): Item[] {
    if (!this.fleetCar) return [];

    if (!('garage' in this.fleetCar)) return [];

    return [
      {
        title: this.transService.translate('fleet.content.carInfo.insuranceCompany'),
        value: this.fleetCar.insuranceAgent,
        clipboard: this.fleetCar.insuranceAgent
      },
      {
        title: this.transService.translate('fleet.content.carInfo.insuranceContractNumber'),
        value: this.fleetCar.insuranceContractNumber,
        clipboard: this.fleetCar.insuranceContractNumber
      },
      {
        title: this.transService.translate('fleet.content.carInfo.insuranceContractEndDate'),
        value: this.fleetCar.insuranceContractEndDate,
        clipboard: this.fleetCar.insuranceContractEndDate
      }
    ];

  }

  getItemsForCarExtraDetails(): Item[] {
    if (!this.fleetCar) return [];

    return [
      {
        title: this.transService.translate('fleet.content.carInfo.extraInfo'),
        value: this.fleetCar.extraInformation,
        clipboard: this.fleetCar.extraInformation
      },
      {
        title: this.transService.translate('fleet.content.carInfo.inspectionEndDate'),
        value: this.fleetCar.inspectionEndDate,
        clipboard: this.fleetCar.inspectionEndDate
      }
    ];
  }

  getAllItemGroupsWithIconsAndItems(): ItemGroup[] {
    if (!this.fleetCar) return [];

    const itemGroups: ItemGroup[] = [];
    itemGroups.push(
      {
        title: this.transService.translate('fleet.content.carInfo.itemGroups.carDetails'),
        icon: this.carIcon,
        items: this.getItemsForCarDetails(),
        dropDownKey: 'carDetails'
      },
      {
        title: this.transService.translate('fleet.content.carInfo.itemGroups.tires'),
        icon: this.carTire,
        items: this.getItemsForCarTires(),
        dropDownKey: 'carTires'
      },
      {
        title: this.transService.translate('fleet.content.carInfo.itemGroups.keys'),
        icon: this.carKeys,
        items: this.getItemsForCarKeys(),
        dropDownKey: 'carKeys'
      },
      {
        title: this.transService.translate('fleet.content.carInfo.itemGroups.extraInformation'),
        icon: this.carMoreInfo,
        items: this.getItemsForCarExtraDetails(),
        dropDownKey: 'carExtraInformation'
      }
    );

    if ('owner' in this.fleetCar) {
      itemGroups.push(
        {
          title: this.transService.translate('fleet.content.carInfo.itemGroups.insurance'),
          icon: this.faPaperclip,
          items: this.getItemsForCarInsuranceDetails(),
          dropDownKey: 'carInsurance'
        },
        {
          title: this.transService.translate('fleet.content.carInfo.itemGroups.owner'),
          icon: this.carOwnerCompany,
          items: this.getItemsForCarOwnerDetails(),
          dropDownKey: 'carOwner'
        },
        {
          title: this.transService.translate('fleet.content.carInfo.itemGroups.garage'),
          icon: this.carGarage,
          items: this.getItemsForCarGarageDetails(),
          dropDownKey: 'carGarage'
        }
      );
    }

    if ('leasingCompany' in this.fleetCar && this.fleetCar.leasingCompany != null) {
      itemGroups.push(
        {
          title: this.transService.translate('fleet.content.carInfo.itemGroups.leasingCompany'),
          icon: this.leasContract,
          items: this.getItemsForCarLeasingDetails(),
          dropDownKey: 'carLeasing'
        }
      );
    }

    return itemGroups;
  }

  protected readonly dropDownInactive = faAngleUp;
  protected readonly faPaperclip = faPaperclip;
  protected readonly dropDownActive = faAngleDown;
  protected readonly carTire = faCircleDot;
  protected readonly leasContract = faFileContract;
  protected readonly carMoreInfo = faCircleInfo;
  protected readonly carOwnerCompany = faUserTie;
  protected readonly carGarage = faWarehouse;
  protected readonly copyClipboard = faCopy;
  protected readonly carIcon = faCarSide;
  protected readonly carKeys = faKey;
}
