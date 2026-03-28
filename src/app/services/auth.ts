import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class Authentification 
{

  private apiUrl = 'http://localhost:8081/api/auth';


  constructor(private http: HttpClient , private router: Router) {}

   login(email: string, password: string ):  Observable<string> {
    return this.http.post(
      `${this.apiUrl}/login`,
      { email, password },
      {  responseType: 'text' }
    );
  }

 logout() {
  localStorage.removeItem('token');

  console.log('Utilisateur déconnecté');

  // 🔥 remplace l'URL dans l'historique
  this.router.navigateByUrl('/', { replaceUrl: true });
}
isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  
}



