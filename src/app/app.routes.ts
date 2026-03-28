import { Routes } from '@angular/router';
import { authentificationGuard } from './authentification-guard';
import { Login } from './components/login/login';
import { ClientModif } from './components/ClientPart/client-modif/client-modif';
import { Client } from './components/ClientPart/client/client';
import { ClientAjout } from './components/ClientPart/client-ajout/client-ajout';
import { CompteDetail } from './components/ComptePart/compte-detail/compte-detail';
import { Retirer } from './components/ComptePart/retirer/retirer';
import { Virement } from './components/ComptePart/virement/virement';
import { Deposer } from './components/ComptePart/deposer/deposer';
import { Transactions } from './components/ComptePart/transactions/transactions';
export const routes: Routes = [

  { path: '', component: Login },
  { path: 'clients', component: Client , canActivate: [authentificationGuard]  },
  { path: 'client-modif/:identifiant', component: ClientModif } , 
  { path: 'client-ajout', component: ClientAjout } , 
  { path: 'compte/:clientId', component: CompteDetail  } ,
  { path: 'retirer/:numCompte', component: Retirer  } ,
  { path: 'deposer/:numCompte', component: Deposer } ,
  { path: 'virement/:numCompte', component: Virement } ,
   { path: 'transactions/:numCompte', component: Transactions} ,
];
