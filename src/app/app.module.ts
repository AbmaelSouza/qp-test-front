import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BusComponent} from './bus/bus.component';
import {HomeComponent} from './home/home.component';
import {SearchComponent} from './home/search/search.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { BusListingComponent } from './bus-listing/bus-listing.component';

@NgModule({
  declarations: [
    AppComponent,
    BusComponent,
    HomeComponent,
    SearchComponent,
    BusListingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
