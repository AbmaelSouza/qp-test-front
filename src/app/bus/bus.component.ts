import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {ApiService} from "../api.service";
import {Router} from "@angular/router";

interface Seat {
  seat: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
  occupied: boolean;
  type: string;
}

@Component({
  selector: 'app-bus',
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.scss']
})
export class BusComponent {
  seatsData: Seat[] = [];
  leito: boolean = true;


  constructor(private api: ApiService, private router: Router) {
    const data = this.api.getSelectedBusSeatsData();

    if (data.data) {
      this.seatsData = data.data;
      this.leito = (data.item.seatClass === "LEITO CAMA" || data.item.seatClass === "EXECUTIVO" || data.item.seatClass === "CONVENCIONAL");
    } else {
      this.router.navigate(['/bus-listing'])
    }
  }

  protected readonly Math = Math;

}
