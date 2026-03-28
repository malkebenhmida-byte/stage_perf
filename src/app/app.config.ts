import {importProvidersFrom ,ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter ,RouterModule, Routes } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { Login } from './components/login/login';
import { Client } from './components/ClientPart/client/client';
import { ClientModif } from './components/ClientPart/client-modif/client-modif';
import { ClientAjout } from './components/ClientPart/client-ajout/client-ajout';
import { ClientRecherche } from './components/ClientPart/client-recherche/client-recherche';
import { CompteDetail } from './components/ComptePart/compte-detail/compte-detail';
import { Retirer } from './components/ComptePart/retirer/retirer';
import { Deposer } from './components/ComptePart/deposer/deposer';
import { Virement } from './components/ComptePart/virement/virement';
import { Transactions } from './components/ComptePart/transactions/transactions';
import { provideHttpClient } from '@angular/common/http';

const routes: Routes = [
  { path: '', component: Login },
  { path: 'clients', component: Client , runGuardsAndResolvers: 'always'},
  { path: 'client-modif/:identifiant', component:ClientModif },
  { path: 'client-ajout', component: ClientAjout },
  { path: 'client-recherche/:identifiant', component: ClientRecherche },
   { path: 'compte/:clientId', component: CompteDetail  } ,
 { path: 'retirer/:numCompte', component: Retirer  } ,
  { path: 'deposer/:numCompte', component: Deposer } ,
  { path: 'virement/:numCompte', component: Virement } ,
  { path: 'transactions/:numCompte', component: Transactions} 
  
];
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
    importProvidersFrom(ReactiveFormsModule, RouterModule),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideClientHydration(withEventReplay())
  ]
};
