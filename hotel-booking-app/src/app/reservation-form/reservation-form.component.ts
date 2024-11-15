import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Reservation } from '../models/reservation';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent implements OnInit{
  reservationForm:FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private activeRouteMap: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required]
    });
    let id = this.activeRouteMap.snapshot.paramMap.get('id');
    if(id){
      this.reservationService.getReservation(id).subscribe(reservation => {
        if(reservation)
          this.reservationForm.patchValue(reservation);
      });
    }
  }

  onSubmit() {
    if(this.reservationForm.valid){
      let reservation: Reservation = this.reservationForm.value

      let id = this.activeRouteMap.snapshot.paramMap.get('id')

      if(id){
        // Update
        this.reservationService.updateReservation(id, reservation).subscribe(() => {
          console.log("Put Request completed");
        })
      } else {
        // New
        this.reservationService.addReservation(reservation).subscribe(() => {
          console.log("Post request completed");
        }) 
      }

      this.router.navigate(['/list']);
    }
  }
}
