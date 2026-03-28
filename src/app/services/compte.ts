import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Compte {
  private apiUrl = 'http://localhost:8081/api/comptes';

  constructor(private http: HttpClient) {}

  getComptesByClientId(clientId: number) {
    return this.http.get<any[]>(`${this.apiUrl}/client/${clientId}`);
  }
}
