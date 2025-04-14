
import { Routes } from '@angular/router';
import { EditComponent } from './managementCountries/edit/edit.component';
import { IndexComponent } from './listCountries/index/index.component';
import { ShowComponent } from './listCountries/show/show.component';
import { CreateComponent } from './managementCountries/create/create.component';
 
export const routes: Routes = [
    { path: '', redirectTo: 'managementCountries/create', pathMatch: 'full'},
    { path: 'logCountries', redirectTo: 'logCountries/index', pathMatch: 'full'},    
    
    { path: 'logCountries/index', component: IndexComponent },
    { path: 'logCountries/show', component: ShowComponent },
    { path: 'managementCountries', redirectTo: 'managementCountries/create', pathMatch: 'full'},
    { path: 'managementCountries/create', component: CreateComponent },
    { path: 'managementCountries/edit', component: EditComponent },
    { path: 'managementCountries/edit',   redirectTo: '/managementCountries/edit?id=1', pathMatch: 'full' },
];
