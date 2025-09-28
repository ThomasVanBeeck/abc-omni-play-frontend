import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FleetDriver} from "../../../../models/fleet";
import {faAngleDown, faAngleUp, faCopy, faIdCard} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-car-driver',
  templateUrl: './car-driver.component.html',
  styleUrls: ['./car-driver.component.scss'],
})
export class CarDriverComponent implements OnInit {

  @Input({ required: true}) fleetDriver: FleetDriver | undefined;
  @Input({ required: true }) dropDownCards: any;
  @Output() dropdownClicked = new EventEmitter<string>();
  @Output() clipBoardClicked = new EventEmitter<string>();


  constructor() { }

  ngOnInit() {}


  writeToClipboard(content: string){
    this.clipBoardClicked.emit(content);
  }


  onClickDropDownCard(card: string) {
    this.dropdownClicked.emit(card);
  }

  protected readonly faIdCard = faIdCard;
  protected readonly dropDownInactive = faAngleUp;
  protected readonly dropDownActive = faAngleDown;
  protected readonly copyClipboard = faCopy;
}
