import { Component, OnInit } from '@angular/core';

import { faDoorOpen, faGamepad, faCog } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FireAuthService } from '../providers/fire-auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  faGoogle = faGoogle;
  faDoorOpen = faDoorOpen;
  faGamepad = faGamepad;
  faCog = faCog;

  constructor(public fireAuth: FireAuthService) { }

  ngOnInit() {
  }

  login = () => this.fireAuth.googleLogin();

  logout = () => this.fireAuth.logout();

}
