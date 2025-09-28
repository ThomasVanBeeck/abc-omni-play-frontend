import { Component, OnInit } from '@angular/core';
import {isPlatform} from '@ionic/core';
import {NewsItemDetails} from "../../models/news";
import {ActivatedRoute} from "@angular/router";
import {IntranetServiceService} from "../../services/intranet/intranet-service.service";
import {TranslocoDirective} from "@jsverse/transloco";

@Component({
  selector: 'app-colleagues',
  templateUrl: './news-details.page.html',
  styleUrls: ['./news-details.page.scss']
})
export class NewsDetailsPage implements OnInit {
  newsItem: NewsItemDetails | undefined;

  constructor(
    private route: ActivatedRoute,
    private intranetService: IntranetServiceService,
    private translation: TranslocoDirective
  ) {}

  ngOnInit() {
    const newsId = this.route.snapshot.paramMap.get('id');
    if (newsId) {
      this.intranetService.fetchNewsById(newsId).subscribe(newsItem => {
        this.newsItem = newsItem;
      });
    }
  }

  protected readonly isPlatform = isPlatform;
}
