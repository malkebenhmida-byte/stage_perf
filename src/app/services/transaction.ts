import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Transaction {
  private apiUrl = 'http://localhost:8081/api/transactions'; // adapte selon ton backend

  constructor(private http: HttpClient) { }

  // Récupère toutes les transactions pour un compte donné
  getTransactionsCompte(compteNumero: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/compte/${compteNumero}`);
  }

  enregistrerTransaction(type: string, montant: number, description: string, solde: number, numeroCompte: string): Observable<any> {
    const body = {
      type,
      montant,
      description,
      solde,
      numeroCompte,
      date: new Date() 
    };
    return this.http.post<any>(`${this.apiUrl}/ajouter`, body);
  }
}
