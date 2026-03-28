import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ClientService } from '../../../services/client-service';
import { ClientInt } from '../../../interfaces/client-int';

@Component({
  selector: 'app-client-recherche',
  standalone :true , 
  imports: [CommonModule,RouterModule],
  templateUrl: './client-recherche.html',
  styleUrl: './client-recherche.css',
})
export class ClientRecherche implements OnInit {

client!: ClientInt | null;

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}
 ngOnInit(): void {
    const identifiant = this.route.snapshot.paramMap.get('identifiant');
    if (identifiant ) {
      this.clientService.getClientById(identifiant ).subscribe({
        next: (data) => {
          this.client = data;
          this.cd.detectChanges();
        },
        error: (err) => {
          console.error(err);
          this.client = null;
        }
      });
    }
  }

  editClient(identifiant : string) {
    this.router.navigate(['/client-modif', identifiant ]);
  }

  deleteClient(identifiant : string) {
    if (confirm('Voulez-vous vraiment supprimer ce client ?')) {
      this.clientService.deleteClient(identifiant ).subscribe({
        next: () => {
          alert('Client supprimé avec succès !');
          this.client = null; // le tableau devient vide
          this.cd.detectChanges();
        },
        error: (err) => console.error('Erreur suppression client', err)
      });
    }
  }
  goBack() {
  this.router.navigate(['/clients']);
}

}
