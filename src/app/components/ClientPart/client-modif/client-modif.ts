import { CommonModule } from '@angular/common';
import { Component ,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../../services/client-service';
import { ActivatedRoute, Router ,RouterLink } from '@angular/router';
import { ClientInt } from '../../../interfaces/client-int';

@Component({
  selector: 'app-client-modif',
  standalone:true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './client-modif.html',
  styleUrl: './client-modif.css',
})
export class ClientModif implements OnInit{
   clientForm!: FormGroup;
    clientId!: string;

constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

    ngOnInit(): void {
      
    // Initialiser le formulaire
    this.clientForm = this.fb.group({
      identifiant: [{ value: '', disabled: true }], 
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      date_naiss: ['', Validators.required],
      genre: ['', Validators.required],
      adresse: ['', Validators.required],
      adresse_mail: ['', [Validators.required, Validators.email]],
      num_tel: ['', Validators.required]
    });
    // Récupérer l'id du client depuis l'URL
    this.route.paramMap.subscribe(params => {
  this.clientId = String(params.get('identifiant'));

  // Recharger le formulaire à chaque changement de paramètre
  this.clientService.getClientById(this.clientId).subscribe({
    next: (client: ClientInt) => this.clientForm.patchValue(client),
    error: (err) => console.error('Erreur chargement client', err)
  });
});

  }
  submit() {
    if (this.clientForm.valid) {
      // Prendre toutes les valeurs même celle disabled
      const updatedClient: ClientInt = {
        identifiant: this.clientId, // l'identifiant ne change pas
        ...this.clientForm.getRawValue() // inclut id désactivé
      };

      this.clientService.updateClient(updatedClient).subscribe({
        next: () => {
          alert('Client modifié avec succès !');
          this.router.navigate(['/clients']); // revenir à la liste
        },
        error: (err) => console.error('Erreur modification client', err)
      });
    }
  }
}
