import { Component ,OnInit} from '@angular/core';
import { Navbar } from '../../navbar/navbar';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../../../services/client-service';
import { ClientInt } from '../../../interfaces/client-int';

@Component({
  selector: 'app-client-ajout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './client-ajout.html',
  styleUrl: './client-ajout.css',
})
export class ClientAjout implements OnInit{
  clientForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      identifiant: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      date_naiss: ['', Validators.required],
      genre: ['', Validators.required],
      adresse: ['', Validators.required],
      adresse_mail: ['', [Validators.required, Validators.email]],
      num_tel: ['', Validators.required]
    });
  }

  submit() {
    if (this.clientForm.valid) {

      const newClient: ClientInt = this.clientForm.value;

      this.clientService.addClient(newClient).subscribe({
        next: () => {
          alert(' Client ajouté avec succès !');
          this.router.navigate(['/clients']);
        },
        error: (err) => {
          console.error('Erreur ajout client', err);
          alert('client déja existant');
        }
      });
    }
  }

}
