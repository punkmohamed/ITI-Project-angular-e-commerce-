import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

import { ProductDetailsComponent } from './pages/product-details/product-details.component';

import { ProductPageComponent } from './pages/product-page/product-page.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';
import { UserInfoComponent } from './pages/user-info/user-info.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ActivateAccountComponent } from './pages/activate-account/activate-account.component';
import { FavoritesProductsComponent } from './pages/favorites-products/favorites-products.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { CartComponent } from './pages/cart/cart.component';
import { ShippingUserAddressComponent } from './pages/shipping-user-address/shipping-user-address.component';
import { CheckOutComponent } from './pages/check-out/check-out.component';
import { UserOrdersComponent } from './pages/user-orders/user-orders.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', canActivate: [authGuard], component: HomeComponent },
  { path: 'products', canActivate: [authGuard], component: ProductPageComponent },
  { path: 'productDetails/:id', canActivate: [authGuard], component: ProductDetailsComponent },
  { path: 'cart', canActivate: [authGuard], component: CartComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'resetPassword/:token', component: ResetPasswordComponent },
  { path: 'verfiyAccount/:token', component: ActivateAccountComponent },
  { path: 'checkOut/:id', component: CheckOutComponent },
  {
    path: 'settings', canActivate: [authGuard], component: SettingsComponent, children: [
      { path: 'profile', canActivate: [authGuard], component: UserInfoComponent },
      { path: 'favoriteProducts', canActivate: [authGuard], component: FavoritesProductsComponent },
      { path: 'yourAddress', canActivate: [authGuard], component: ShippingUserAddressComponent },
      { path: 'userOrders', canActivate: [authGuard], component: UserOrdersComponent },
    ]
  },
];
