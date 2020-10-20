import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth.guard';
import { LoginComponent } from './core/components/login/login.component';

const routes: Routes = [ 
  { path: 'login', component: LoginComponent },
  { path: 'search', 
    loadChildren: () => import('./features/search/search.module').then(m => m.SearchModule), 
    canActivate: [AuthGuard] 
  }, 
  { path: 'userdetails', 
    loadChildren: () => import('./features/user-details/user-details.module').then(m => m.UserDetailsModule), 
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'search' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
