import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Transaction } from '../../../services/transaction';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transactions',
  imports: [FormsModule ,RouterModule,CommonModule],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css',
})
export class Transactions implements OnInit {
  compteNumero: string = '';
  transactions: any[] = [];
  typeFiltre: string = '';
  transactionsOriginales: any[] = [];

  pageSize = 5;
currentPage = 1;
totalTransactions = 0;

allTransactions: any[] = [];
pagedTransactions: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private transactionService: Transaction
  ) {}

  ngOnInit() {
    // Récupérer le paramètre "compte" de l'URL
    this.route.paramMap.subscribe(params => {
      const numero = params.get('numCompte');
      if (numero) {
        this.compteNumero = numero;
        this.chargerTransactions();
      }
    });
  }

  chargerTransactions() {
  this.transactionService.getTransactionsCompte(this.compteNumero)
    .subscribe((data: any) => {
      this.allTransactions = data;
      this.transactionsOriginales = data;

      this.totalTransactions = data.length;
      this.currentPage = 1;

      this.updatePagination();
    });
}

updatePagination() {
  const startIndex = (this.currentPage - 1) * this.pageSize;
  const endIndex = startIndex + this.pageSize;

  this.pagedTransactions = this.allTransactions.slice(startIndex, endIndex);
}

goToPage(page: number) {
  const totalPages = this.getTotalPages();
  if (page < 1 || page > totalPages) return;

  this.currentPage = page;
  this.updatePagination();
}

getTotalPages(): number {
  return Math.ceil(this.totalTransactions / this.pageSize);
}

getEndIndex(): number {
  return Math.min(this.currentPage * this.pageSize, this.totalTransactions);
}

  filtrerTransactions() {
  if (this.typeFiltre) {
    this.allTransactions = this.transactionsOriginales.filter(
      t => t.type === this.typeFiltre
    );
  } else {
    this.allTransactions = this.transactionsOriginales;
  }

  this.totalTransactions = this.allTransactions.length;
  this.currentPage = 1;
  this.updatePagination();
}

  retour() {
    window.history.back();
  }
}