import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BusComponent} from "./bus/bus.component";
import {BusListingComponent} from "./bus-listing/bus-listing.component";
import {SearchComponent} from "./search/search.component";

const routes: Routes = [
  {path: 'search', component: SearchComponent},
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
