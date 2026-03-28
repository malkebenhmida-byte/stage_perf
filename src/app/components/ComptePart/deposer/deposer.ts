import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-deposer',
  imports: [FormsModule,RouterModule],
  templateUrl: './deposer.html',
  styleUrl: './deposer.css',
})
export class Deposer {
comptes: any[] = [];
compte : string =''; 
  montant: number = 0;

  constructor(private http: HttpClient,private route: ActivatedRoute) {}

   ngOnInit() {
    const numCompte = this.route.snapshot.paramMap.get('numCompte');
    
    if (numCompte) {
      this.compte = numCompte;
      console.log("Compte récupéré :", this.compte); // 👈 test
    }
  }

  onSubmit() {

  const body = {
    compte: this.compte,
    montant: this.montant
  };

    this.http.post(
  `http://localhost:8081/api/comptes/deposer?numero=${this.compte}&montant=${this.montant}`,
  {})
      .subscribe({
        next: () => {
          alert('Dépôt effectué avec succès');
        },
        error: () => {
          alert('Échec de l’opération de dépôt');
        }
      });
  }
}
