import { Component } from '@angular/core';
import { Router ,  RouterModule} from '@angular/router';
import { Authentification } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
 
  constructor(private authService: Authentification, private router: Router) {}

  logout() {
    console.log('CLICK LOGOUT');
    this.authService.logout();
  
  }

}
