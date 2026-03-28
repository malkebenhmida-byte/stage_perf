import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../services/client-service';
import { ClientInt } from '../../../interfaces/client-int';
import { CommonModule } from '@angular/common';
import { RouterModule ,Router} from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { Observable ,  Subject, switchMap, startWith  } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Navbar } from "../../navbar/navbar";
@Component({
  selector: 'app-client',
  imports: [CommonModule, RouterModule, FormsModule, Navbar],
  standalone:true,
  templateUrl: './client.html',
  styleUrl: './client.css',
})
export class Client implements OnInit {
  clients:ClientInt[]= [];
  clients$!: Observable<ClientInt[]>;
private refresh$ = new Subject<void>();

  searchId: string = '';

 pageSize = 10;
  currentPage = 1;
  totalClients = 0;

  allClients: ClientInt[] = [];     
  pagedClients: ClientInt[] = [];  
  constructor(private clientService : ClientService,private router: Router ,private cd: ChangeDetectorRef ){}

   ngOnInit(): void {
    this.loadClients();
    console.log('Client component INIT');
    this.clients$ = this.clientService.getAllClients();
     
  ;
  }
searchClient() {
    if (this.searchId.trim() !== '') {
      this.router.navigate(['client-recherche', this.searchId]);
    }
  }

  loadClients()
  {
    console.log('loadClients() called');
    
    this.clientService.getAllClients().subscribe(
      {
        next : (data) => 
        {
          this.allClients = data;
          this.clients =  data; 
          this.totalClients = data.length;
          this.currentPage = 1;
          this.cd.detectChanges();
          this.updatePagination();
          console.log("clients",data);
        },
        error :(err) =>
          console.error('Erreur chargement clients', err)
      }
    );
  }

   updatePagination() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    this.pagedClients = this.allClients.slice(startIndex, endIndex);
  }

   goToPage(page: number) {
    const totalPages = this.getTotalPages();
    if (page < 1 || page > totalPages) return;

    this.currentPage = page;
    this.updatePagination();
  }  

   getTotalPages(): number {
    return Math.ceil(this.totalClients / this.pageSize);
  }

  onPageSizeChange(event: any) {
    this.pageSize = +event.target.value;
    this.currentPage = 1;
    this.updatePagination();
  }

  getEndIndex(): number {
  return Math.min(this.currentPage * this.pageSize, this.totalClients);
}

  deleteClient(identifiant: string) {
  if (confirm("Voulez-vous vraiment supprimer ce client ?")) {
    this.clientService.deleteClient(identifiant).subscribe({
      next: () => {
        this.clientService.getAllClients().subscribe(clients => {
          this.clients = clients; // 🔹 tableau classique
          alert("Client supprimé avec succès");
        });
      },
      error: (err) => console.error("Erreur suppression client", err)
    });
  }
}
}
