import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-virement',
  imports: [FormsModule, RouterModule,CommonModule],
  templateUrl: './virement.html',
  styleUrl: './virement.css',
})
export class Virement {
comptes: any[] = [];          // Liste des comptes disponibles pour sélection
  compteSource: string = '';     // Compte à débiter
  compteDest: string = '';       // Compte destinataire
  montant: number = 0;           // Montant du virement
  date: string = '';             // Date du virement
  description: string = '';      // Description optionnelle

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    const numCompte = this.route.snapshot.paramMap.get('numCompte');
    if (numCompte) {
      this.compteSource = numCompte;
      console.log('Compte source récupéré :', this.compteSource);
    }

     const today = new Date();
  this.date = today.toISOString().split('T')[0];

    // Si tu veux récupérer tous les comptes pour sélectionner le compte source
    /*this.http.get<any[]>('http://localhost:8081/api/comptes')
      .subscribe(data => this.comptes = data);*/   
  }
  onSubmit() {

    console.log("Source:", this.compteSource);
console.log("Destination:", this.compteDest);
console.log("Montant:", this.montant); 
    const body = {
      compteSource: this.compteSource,
      compteDest: this.compteDest,
      montant: this.montant,
      date: this.date,
      description: this.description , 
      
    };
   
    this.http.post(
  `http://localhost:8081/api/comptes/virement?source=${this.compteSource}&destination=${this.compteDest}&montant=${this.montant}`,
  {},{ responseType: 'text' } 
).subscribe({
      next: () => {
         alert("Virement effectué avec succés ");
      },
      error: () => {
        alert('Échec de l’opération de virement');
       // alert("Erreur backend: " + (err.error?.message || err.error || err.message));
      }
    });
  }
  
}
