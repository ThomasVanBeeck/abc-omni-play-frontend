import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faAngleDown, faAngleUp, faPaperclip, faUpRightFromSquare} from "@fortawesome/free-solid-svg-icons";
import {FleetCarAttachment} from "../../../../models/fleet";

@Component({
  selector: 'app-car-attachments',
  templateUrl: './car-attachments.component.html',
  styleUrls: ['./car-attachments.component.scss'],
})
export class CarAttachmentsComponent implements OnInit {


  @Output() dropdownClicked = new EventEmitter<string>();
  @Output() openAttachmentClicked = new EventEmitter<string>();
  @Input({ required: true }) dropDownCards: any;
  @Input({ required: true }) fleetCarAttachments: FleetCarAttachment[] | undefined;



  onClickDropDownCard(card: string) {
    this.dropdownClicked.emit(card);
  }

  constructor() { }

  ngOnInit() {}




  formatSizeUnits(bytes: number)
  {
    let bytesFormat: string
    if ( ( bytes >> 30 ) & 0x3FF )
      bytesFormat = ( bytes >>> 30 ) + '.' + ( bytes & (3*0x3FF )) + 'GB' ;
    else if ( ( bytes >> 20 ) & 0x3FF )
      bytesFormat = ( bytes >>> 20 ) + '.' + ( bytes & (2*0x3FF ) ) + 'MB' ;
    else if ( ( bytes >> 10 ) & 0x3FF )
      bytesFormat = ( bytes >>> 10 ) + '.' + ( bytes & (0x3FF ) ) + 'KB' ;
    else if ( ( bytes >> 1 ) & 0x3FF )
      bytesFormat = ( bytes >>> 1 ) + 'Bytes' ;
    else
      bytesFormat = bytes + 'Byte' ;
    return bytesFormat ;
  }

  openAttachment(attachmentUrl: string) {
    this.openAttachmentClicked.emit(attachmentUrl);
  }


  protected readonly dropDownInactive = faAngleUp;
  protected readonly faPaperclip = faPaperclip;
  protected readonly faUpRightFromSquare = faUpRightFromSquare;
  protected readonly dropDownActive = faAngleDown;
}
