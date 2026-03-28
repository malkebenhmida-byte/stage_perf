import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-retirer',
  imports: [FormsModule,RouterModule],
  templateUrl: './retirer.html',
  styleUrl: './retirer.css',
})
export class Retirer {
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
  `http://localhost:8081/api/comptes/retirer?numero=${this.compte}&montant=${this.montant}`,
  {})
      .subscribe({
        next: () => {
          alert('retrait effectué avec succès');
        },
        error: () => {
          alert('Échec de l’opération de retrait');
        }
      });
  }

}
