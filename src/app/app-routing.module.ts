import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {BusComponent} from "./bus/bus.component";
import {BusListingComponent} from "./bus-listing/bus-listing.component";

const routes: Routes = [
  {path: 'search', component: HomeComponent},
  {path: 'bus-list', component: BusListingComponent},
  {path: 'bus', component: BusComponent},
  {path: '', redirectTo: '/search', pathMatch: 'full'},
  {path: '**', redirectTo: '/search'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
