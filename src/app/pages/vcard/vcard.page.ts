import {Component, OnInit} from '@angular/core';
import {VCardService} from "../../services/people2/vcard/v-card.service";
import {VCard} from "../../models/v-card";
import {Options} from 'ngx-qrcode-styling';

@Component({
  selector: 'app-vcard',
  templateUrl: './vcard.page.html',
  styleUrls: ['./vcard.page.scss'],
})
export class VcardPage implements OnInit {
  vCard: VCard | undefined;
  vCardLoading: boolean = true;
  config: Options | undefined
  vCardData: string[] = [];

  constructor(private vCardService: VCardService) {
  }

  async loadVCard() {
    this.vCardService.getMyVCard().subscribe(
      {
        next: (vCard) => {
          this.vCard = vCard;
          this.createConfig();
          this.createVCardData();
          this.vCardLoading = false;
        },
        error: (error) => {
          console.error('Error while loading vCard: ', error.message);
          this.vCardLoading = false;
        }
      },
    )
  }

  createConfig() {
    this.config = {
      width: 300,
      height: 300,
      data: this.vCard?.vcard,
      image: "assets/icon/abc.png",
      margin: 0,
      dotsOptions: {
        color: "#000000",
        type: "square",
      },
      backgroundOptions: {
        color: "#ffffff",
      },
      imageOptions: {
        margin: 0,
      }
    }
  }

  createVCardData() {
    const data: string[] = this.vCard!.vcard.split("\n");
    for (let i = 0; i < data.length; i++) {
      if (!data[i].toUpperCase().match("(BEGIN|END):VCARD|VERSION:[0-9\.]+"))
        this.vCardData.push(data[i].split(":")[1]);
    }
  }

  ngOnInit() {
    this.loadVCard()
  }

}
