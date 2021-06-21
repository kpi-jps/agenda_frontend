import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { RegisterComponent } from './register/register.component';
import { UpdateComponent } from './update/update.component';


const routes: Routes = [
  {path: 'contatos', component: ContactsComponent},
  {path: 'registrar', component: RegisterComponent},
  {path: 'editar/:id', component: UpdateComponent},
  {path: '', redirectTo: '/contatos', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
