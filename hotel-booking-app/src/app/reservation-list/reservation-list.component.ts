import { Component, OnInit } from '@angular/core';
import { Reservation } from '../models/reservation';
import { ReservationService } from '../reservation/reservation.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css'
})
export class ReservationListComponent implements OnInit{

  reservations: Reservation[] = [];
  constructor(private reservationService: ReservationService){}
  
  ngOnInit(): void {
    this.reservationService.getReservations().subscribe(reservation => {
      this.reservations = reservation;
    });
  }

  deleteReservation(id: string){
    this.reservationService.deleteReservation(id).subscribe(() => {
      console.log("Delete request completed");
    });
  }
}
