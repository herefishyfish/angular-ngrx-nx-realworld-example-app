import { ChangeDetectionStrategy, Component, inject, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { AuthStore } from '@realworld/auth/data-access';
import { NativeScriptRouterModule } from "@nativescript/angular";
// import { FooterComponent } from '../../conduit/src/app/layout/footer/footer.component';
// import { NavbarComponent } from '../../conduit/src/app/layout/navbar/navbar.component';

@Component({
  selector: 'cdt-root',
  templateUrl: './app.component.html',
  imports: [
    // FooterComponent, 
    // NavbarComponent, 
    RouterModule,
    NativeScriptRouterModule
],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppComponent {
  // protected readonly authStore = inject(AuthStore);

  // constructor() {
  //   this.authStore.getUser();
  // }
}
