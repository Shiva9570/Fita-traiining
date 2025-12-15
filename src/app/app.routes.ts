import { Routes } from '@angular/router';
import { LoginpageComponent } from './login/loginpage/loginpage.component';
import { RegisterComponent } from './login/register/register.component';
import { HomeComponent } from './login/home/home.component';
import { MyprofileComponent } from './login/myprofile/myprofile.component';
import { ProductsComponent } from './login/products/products.component';
import { ProductlistComponent } from './login/productlist/productlist.component';
import { AddUserComponent } from './login/add-user/add-user.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { GridShowComponent } from './login/grids-show/grids-show.component';
import { MaleFemaleComponent } from './male-female/male-female.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginpageComponent,
    canActivate: [LoginGuard],
  },

  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoginGuard],
  },

  {
    path: 'home',
    component: HomeComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: 'myprofile', component: MyprofileComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'productlist', component: ProductlistComponent },
      { path: 'add-user', component: AddUserComponent },
      { path: 'grids-show', component: GridShowComponent },
      { path: 'male-female', component: MaleFemaleComponent }
    ],
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
