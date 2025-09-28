import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AuthModule } from '@auth0/auth0-angular';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [HomePage],
        imports: [
          IonicModule.forRoot(),
          AuthModule.forRoot({
            domain: 'dev-jkp6af0oqav3r3ux.us.auth0.com',
            clientId: 'zOZE3SSxfCIYLDJUdi9lAhJyXEWDOOTJ',
            useRefreshTokens: true,
            useRefreshTokensFallback: false,
            authorizationParams: {
              redirect_uri,
            },
          }),
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(HomePage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
