import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-auth-redirect',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPage implements OnInit {

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.getAccessToken().subscribe(value => {
      if (!value) {
        return;
      }
    })
  }

}
