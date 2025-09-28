import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { GenericHealthService } from '../../../services/health/generic-health-service';

@Component({
  selector: 'app-module-card',
  templateUrl: './module-card.component.html',
  styleUrls: ['./module-card.component.scss'],
  imports: [IonicModule, TranslocoDirective],
  standalone: true
})
export class ModuleCardComponent {
  @Input() name!: string;
  @Input() title!: string;
  @Input() image!: string;
  @Input() description!: string;
  @Input() link!: string;
  @Input() healthService!: GenericHealthService;
  isToastOpen: boolean = false;

  constructor(private router: Router) {
  }

  async navigateTo() {
    // deze regel is om health check van backend te overrulen
    // mag weg nadat backends wel degelijk werken
    await this.router.navigate([`/${this.link}`]);


    // dit is de code die de health check eerst doet vooraleer hij navigeert naar de pagina...
    // wanneer backends goed werken moet deze code enabled worden
    /*
    this.healthService.isHealthy().subscribe(
      async (available) => {
        if (!available) {
          this.isToastOpen = true;
          return;
        }
        await this.router.navigate([`/${this.link}`]);
      }
    );
*/
  }

  setOpen(status: boolean) {
    this.isToastOpen = status;
  }
}
