import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, switchMap, Observable } from 'rxjs';
import { ClientInt } from '../interfaces/client-int';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private refresh$ = new BehaviorSubject<void>(undefined);
  private apiUrl='http://localhost:8081/api/clients';
  constructor(private http:HttpClient) {}
  getAllClients():Observable<ClientInt[]>
  { return this.refresh$.pipe(
      switchMap(() => this.http.get<ClientInt[]>(this.apiUrl)))
    //return this.http.get<ClientInt[]>(this.apiUrl);
  }
  getClientById(identifiant: string): Observable<ClientInt> {
    return this.http.get<ClientInt>(`${this.apiUrl}/${identifiant}`);
  }
   updateClient(client: ClientInt): Observable<ClientInt> {
    return this.http.put<ClientInt>(`${this.apiUrl}/${client.identifiant}`, client);
  }
  deleteClient(identifiant: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${identifiant}`);
  }
  addClient(client: ClientInt): Observable<ClientInt> {
    return this.http.post<ClientInt>(this.apiUrl, client);
  }

   
}

