import { Component, OnInit } from '@angular/core';
import { IntranetServiceService } from '../../services/intranet/intranet-service.service';
import { Event } from '../../models/event';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslocoDirective } from '@jsverse/transloco';
import { NewsCardComponent } from './news-card/news-card.component';
import {NewsItem} from "../../models/news";
import {Router} from "@angular/router";

@Component({
  selector: 'app-news-summary',
  templateUrl: './news-summary.component.html',
  standalone: true,
  imports: [
    NgForOf,
    IonicModule,
    TranslocoDirective,
    NewsCardComponent,
    NgIf,
    DatePipe
  ],
  styleUrls: ['./news-summary.component.scss']
})
export class NewsSummaryComponent implements OnInit {
  news: NewsItem[] = [];
  recentNews: NewsItem | undefined;
  date = new Date();


  constructor(private intranetService: IntranetServiceService, private translation: TranslocoDirective, private router: Router) {
  }

  ngOnInit() {
    this.intranetService.fetchAllNews().subscribe(value => {
      this.news = value.result.sort((a, b) => {
        return new Date(b.item.releaseOn).getTime() - new Date(a.item.releaseOn).getTime();
      });

      this.recentNews = this.news.find(news => {
        return new Date(news.item.releaseOn) <= new Date();
      });

      if (this.recentNews) {
        this.news = this.news.filter(news => news !== this.recentNews).splice(0, 3);
      }
    });
  }

  viewAllNews() {
    // TODO:"Logic to navigate to the full news page
  }

  viewSpecificNews(newsId: string) {
    // route to the page with the news id
    this.router.navigate(['/news/', newsId]).then(r => console.log(r));
  }

}
