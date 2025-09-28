import {Component, OnInit, signal, ViewChild} from '@angular/core';
import {
  faAngleDown,
  faAngleUp,
  faBriefcase,
  faCarAlt,
  faCarSide,
  faCircleDot,
  faCircleInfo,
  faClipboardCheck,
  faCopy,
  faFileContract,
  faGaugeHigh,
  faIdCard,
  faKey,
  faPaperclip,
  faScrewdriverWrench,
  faUpRightFromSquare,
  faUserTie,
  faWarehouse,
} from '@fortawesome/free-solid-svg-icons';
import {
  FleetCarAttachment,
  FleetCarAttachmentDetail,
  FleetCompanyCar,
  FleetDriver,
  FleetLeasingCar,
} from '../../models/fleet';
import {FleetService} from '../../services/fleet/fleet.service';
import {Clipboard} from '@capacitor/clipboard';
import {timer} from 'rxjs/internal/observable/timer';
import {IonModal} from '@ionic/angular';
import {isPlatform, RefresherCustomEvent} from '@ionic/core';
import {HomePageModule} from '../home/home.module';
import {Capacitor} from "@capacitor/core";
import {Directory, Filesystem} from '@capacitor/filesystem';
import {FileOpener} from "@capawesome-team/capacitor-file-opener";
import {convertBase64ToBlobPdf} from "../../util/helpers";
import {TranslocoService} from "@jsverse/transloco";
import {OnesignalService} from "../../services/onesignal/onesignal.service";


@Component({
  selector: 'app-fleet',
  templateUrl: './fleet.page.html',
  styleUrls: ['./fleet.page.scss'],
})
export class FleetPage implements OnInit {
  @ViewChild(IonModal)
  modal!: IonModal;

  homeModule = HomePageModule;

  protected readonly carMileage = faGaugeHigh;
  protected readonly carMoreInfo = faCircleInfo;
  protected readonly carKeys = faKey;
  protected readonly carGarage = faWarehouse;
  protected readonly copyClipboard = faCopy;
  protected readonly carIcon = faCarSide;
  protected readonly repairIcon = faScrewdriverWrench;
  protected readonly inspectionIcon = faClipboardCheck;
  protected readonly leasContract = faFileContract;
  protected readonly carDriverIcon = faIdCard;
  protected readonly carOwnerCompany = faUserTie;
  protected readonly carTire = faCircleDot;
  protected readonly dropDownActive = faAngleDown;
  protected readonly dropDownInactive = faAngleUp;

  dropDownCards = signal({
    carDriver: false,
    carDetails: false,
    carTires: false,
    carKeys: false,
    carLeasing: false,
    carOwner: false,
    carGarage: false,
    carInsurance: false,
    carExtra: false,
    carAttachments: false
  });

  fleetCar: FleetCompanyCar | FleetLeasingCar | undefined;

  fleetCarAttachments: FleetCarAttachment[] | undefined;

  fleetDriver: FleetDriver | undefined;

  showCopied = false;

  progress = false;

  imageLoading = true;

  carImage = '';

  constructor(private fleetService: FleetService, private t: TranslocoService, private oneSignalService: OnesignalService) {
  }

  async ngOnInit() {
    await this.loadCarDriverDetails();

    this.imageLoading = false;
    this.progress = false;
  }

  onClickDropDownCard(cardName: string) {
    this.dropDownCards.update((cards: any) => {
      cards[cardName] = !cards[cardName];
      return cards;
    });
  }

  remainingDays(date: string) {
    const days = Math.floor(
      (new Date(date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    )-80
    const years = Math.floor(days / 365);
    const yearsLabel = years > 1 ? this.t.translate('years') : this.t.translate('year');
    if(years > 0) {
      const months = Math.floor((days - years * 365) / 30);
      const monthsLabel = months > 1 ? this.t.translate('months.value') : this.t.translate('month');
      if(months > 0)
        return `${years} ${yearsLabel} ${this.t.translate('and')} ${months} ${monthsLabel}`;

      return `${years} ${yearsLabel}`;
    } else {
      const months = Math.floor(days / 30);
      const monthsLabel = months > 1 ? this.t.translate('months.value') : this.t.translate('month');
      return `${months} ${monthsLabel}`;
    }
  }

  loadCarImage(placeholder = false) {
    if(!this.fleetCar) return;
    this.imageLoading = true;
    const carYear = this.fleetCar!.firstRegistrationDate.split('-')[0];
    const zoomLevel = 18;
    const width = 800;
    const model = this.fleetCar!.model.split(" ")[0];
    const angle = 23;
    // Lizy is without watermark but is a littlebit illegal :D
    const keys = ['Lizy', 'img']

    this.fleetService.getDynamicCarImageFromImg({
      brand: this.fleetCar!.brand.name,
      carYear,
      zoomLevel,
      width,
      model,
      angle,
      key: keys[0]
    }).subscribe({
      next: (img: any) => {
        this.carImage = URL.createObjectURL(img);
        this.imageLoading = false;
      },
      error: (error) => {
        console.error('Error while loading car image: ', error);
        this.imageLoading = false;
      },
    });
  }

  remainingMileage(mileage: number) {
    if(!this.fleetCar) return;
    return mileage - this.fleetCar.mileage;
  }

  writeToClipboard = async (textToCopy: string) => {
    this.showCopied = true;
    await Clipboard.write({
      string: textToCopy,
    });

    timer(500).subscribe(() => {
      this.showCopied = false;
    });
  };

  isInspectionLate(car: FleetCompanyCar | FleetLeasingCar) {
    return new Date(car.inspectionEndDate) < new Date();
  }

  isInspectionDue(car: FleetCompanyCar | FleetLeasingCar) {
    return (
      new Date(car.inspectionEndDate) <
      new Date(new Date().setMonth(new Date().getMonth() + 5))
    );
  }

  hasCarMilageDataForMaintenanceCheck(car: FleetCompanyCar | FleetLeasingCar) {
    return (
      car.mileage != null &&
      car.nextCarServiceMileage != null &&
      car.nextCarServiceMileage > 0
    );
  }

  isMaintenanceLate(car: FleetCompanyCar | FleetLeasingCar) {
    return (
      (!!car.nextCarServiceDate &&
        new Date(car.nextCarServiceDate) < new Date()) ||
      (this.hasCarMilageDataForMaintenanceCheck(car) &&
        car.mileage > car.nextCarServiceMileage)
    );
  }

  isMaintenanceDue(car: FleetCompanyCar | FleetLeasingCar) {
    return (
      (!!car.nextCarServiceDate &&
        new Date(car.nextCarServiceDate) <
        new Date(new Date().setMonth(new Date().getMonth() + 5))) ||
      (this.hasCarMilageDataForMaintenanceCheck(car) &&
        car.mileage > car.nextCarServiceMileage - 1000)
    );
  }

  isLeasingContractDue(car: FleetLeasingCar) {
    return (
      !!car.endDateContract &&
      new Date(car.endDateContract) <
      new Date(new Date().setMonth(new Date().getMonth() + 5))
    );
  }

  isLeasingContractLate(car: FleetLeasingCar) {
    return !!car.endDateContract && new Date(car.endDateContract) < new Date();
  }

  addSplittersToRegistrationPlate(registrationPlate: string) {
    const platePattern = /^([A-Z0-9]{1,1})([A-Z0-9]{1,3})([A-Z0-9]{1,3})$/;

    if (platePattern.test(registrationPlate)) {
      return registrationPlate.replace(platePattern, '$1-$2-$3');
    } else {
      return registrationPlate;
    }
  }

  async forceRefreshCarData(event: RefresherCustomEvent) {
    if (this.fleetCar?.carId)
      await this.loadFleetCarDetails(this.fleetCar.carId, true);

    await event.target.complete();
  }

  async loadFleetCarAttachments(carId: string) {
    const fleetCarAttachment = await this.fleetService.getFleetCarAttachments();

    if (fleetCarAttachment) {
      this.fleetCarAttachments = fleetCarAttachment;
      return;
    }
    this.fleetService.getFleetCarAttachmentsByCarId(carId).subscribe({
      next: async (attachments) => {
        await this.fleetService.setFleetCarAttachments(attachments);
        this.fleetCarAttachments = attachments;
      },
      error: (error) => {
        console.error('Error while loading fleet car attachments: ', error);
      },
    });
  }

  async loadFleetCarDetails(carId: string, forceRefetch = false) {
    const fleetCar = await this.fleetService.getFleetCar();

    if (!forceRefetch && fleetCar) {
      this.fleetCar = fleetCar;
      this.loadCarImage()
      return;
    }

    this.fleetService.getFleetCarDetailsById(carId).subscribe({
      next: async (car) => {
        car = {
          ...car,
          registrationPlate: this.addSplittersToRegistrationPlate(
            car.registrationPlate
          ),
        };
        await this.fleetService.setFleetCar(car);
        this.fleetCar = car;
        this.loadCarImage()
      },
      error: (error) => {
        console.error('Error while loading fleet car details: ', error);
      },
    });
  }

  async loadCarDriverDetails() {
    this.fleetService.getMyFleetDriverDetails().subscribe({
      next: async (driver) => {
        this.fleetDriver = driver;
        if (
          this.fleetDriver.car &&
          this.fleetDriver.car.carId
        ) {
          await this.loadFleetCarAttachments(this.fleetDriver.car.carId)
          await this.loadFleetCarDetails(this.fleetDriver.car.carId);

          this.oneSignalService.setOneSignalUserCarId(this.fleetDriver.car.carId);
        } else {
          await this.loadFleetCarAttachments('f010bb4c-e1f7-4f66-b6cc-43e37e4f409d')
          await this.loadFleetCarDetails('f010bb4c-e1f7-4f66-b6cc-43e37e4f409d');
          // DEBUG ONLY
          this.oneSignalService.setOneSignalUserCarId('f010bb4c-e1f7-4f66-b6cc-43e37e4f409d');
        }

      },
      error: (error) => {
        console.error('Error while loading driver details: ', error);
      },
    });
  }

  async openPdfCrossPlatform(uri: string) {
    if(!Capacitor.isNativePlatform()) {
      window.open(uri, '_blanc');
    } else {
      await FileOpener.openFile({
        path: uri,
        mimeType: 'application/pdf'
      })
    }
  }

  async downloadAndOpenPdfFile(attachmentDetail: FleetCarAttachmentDetail) {
    if(!this.fleetCar) return;

    const blobPdf = convertBase64ToBlobPdf(attachmentDetail.content);
    if(!Capacitor.isNativePlatform()) {
      const blobUrl = URL.createObjectURL(blobPdf);
      await this.openPdfCrossPlatform(blobUrl);
      return;
    }

    const writeDirectory = Capacitor.getPlatform() === 'ios' ? Directory.Documents : Directory.Data;
    // get epoch time
    const epochTime = new Date().getTime();

    const fileName = attachmentDetail.fileName.replace(/(.*)\.pdf(.*)/, `$1_${epochTime}.$2pdf`);

    const pdfData = 'data:application/pdf;base64,' + attachmentDetail.content;

    const { uri } = await Filesystem.writeFile({
      path: fileName,
      data: pdfData,
      directory: writeDirectory,
      recursive: true
    })


    if(uri) {
      await this.openPdfCrossPlatform(uri);
    }
  }

  async openAttachment(attachmentUrl: string) {
    this.progress = true;
    const carId = this.fleetCar?.carId;
    if(!carId) return;

    const splits = attachmentUrl.split('/');
    const attachmentId = splits[splits.length - 1];

    this.fleetService.getFleetCarAttachmentByUrl(attachmentId, carId).subscribe({
      next: async (attachment) => {
        await this.downloadAndOpenPdfFile(attachment);
        this.progress = false;
      },
      error: (error) => {
        console.error('Error while loading car attachment: ', error);
      },
    })
  }

  protected readonly faCarSide = faCarSide;
  protected readonly faBriefcase = faBriefcase;
  protected readonly faCarAlt = faCarAlt;
  protected readonly faPaperclip = faPaperclip;
  protected readonly faUpRightFromSquare = faUpRightFromSquare;
  protected readonly isPlatform = isPlatform;
}
