import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Compte } from '../../../services/compte';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-compte-detail',
  imports: [CommonModule,RouterModule],
  templateUrl: './compte-detail.html',
  styleUrl: './compte-detail.css',
})
export class CompteDetail implements OnInit  {
comptes: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private compteService: Compte
  ) {}

  ngOnInit(): void {
    const clientId = this.route.snapshot.paramMap.get('clientId');

    if (clientId) {
      this.compteService.getComptesByClientId(+clientId)
        .subscribe(data => {
          this.comptes = data;
        });
    }
  }
}
