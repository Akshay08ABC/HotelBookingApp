import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = "http://localhost:3000";

  private reservations:Reservation[] = [];
  constructor(private http: HttpClient){}

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiUrl + "/reservations");
  }

  getReservation(id: string): Observable<Reservation> {
    return this.http.get<Reservation>(this.apiUrl + "/reservation/"+id);
  }

  addReservation(res: Reservation): Observable<void> {
    return this.http.post<void>(this.apiUrl + "/reservation/", res);
  }

  deleteReservation(id: string): Observable<void> {
    return this.http.delete<void>(this.apiUrl + "/reservation/"+id);
  }

  updateReservation(id: string, res: Reservation): Observable<void> {
    return this.http.put<void>(this.apiUrl + "/reservation/"+id, res);
  }
}