import {Component} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  collapsed = true;

  constructor(public authSvc: AuthService, private router: Router) {
  }

  async logout() {
    try {
      await this.authSvc.logout();
      await this.router.navigate(['auth']);
      this.collapsed = true;
    } catch (error) {
      console.log(error);
    }
  }
}
