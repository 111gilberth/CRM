import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { MyDishesComponent } from './pages/my-dishes/my-dishes.component';
import { AccountComponent } from './pages/account/account.component';
import { LoginComponent } from './component/login/login.component';
import { DishDetailComponent } from './pages/my-dishes/dish-detail/dish-detail.component';
import { AuthorizatedGuard } from './services/authorizated.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard',
    canActivate:[AuthorizatedGuard],
    component: HomeComponent,
    children:[{
      path:'my-dishes',
      component: MyDishesComponent
    },
    { path: 'my-dishes/dish/:cat/:id', component: DishDetailComponent },
    {
      path:'account',
      component: AccountComponent
    }] 
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }