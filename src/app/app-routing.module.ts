import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { InfoComponent } from './Components/info/info.component';
import { AccessHomeGuard } from './Services/guard/access-home.guard';

const routes: Routes = [
  { path: '', redirectTo: 'info', pathMatch: 'full' },
  { path: 'info', component: InfoComponent },
  { path: 'home', component: HomeComponent, canActivate: [AccessHomeGuard] },
  { path: '**', redirectTo: 'info' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
