import {Component, OnInit} from '@angular/core';
import {ApiService} from "../api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-bus-listing',
  templateUrl: './bus-listing.component.html',
  styleUrl: './bus-listing.component.scss'
})
export class BusListingComponent implements OnInit{
  data: any[] = []; // Array to hold the listing data

  constructor(private api: ApiService,private router:Router) { }

  ngOnInit(): void {
    this.data = this.api.getBusesData();
    this.data.sort((a, b) => {
      const departureA = new Date(a.departure.date + ' ' + a.departure.time).getTime();
      const departureB = new Date(b.departure.date + ' ' + b.departure.time).getTime();
      return departureA - departureB;
    });
    if(this.data.length === 0){
      alert('Nenhum Ônibus foi encontrado')
      this.router.navigate(['/search'])
    }
  }

  selectBus(item:any):void{
    this.api.getSeats(item.id).subscribe(
      (data) => {
        this.api.setSelectedBusSeatsData(data, item);
        this.router.navigate(['/bus'])
      },
      (error) => {
        console.error('Error fetching stops:', error);
      })

  }
}
