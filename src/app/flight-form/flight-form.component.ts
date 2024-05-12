import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Flight } from '@app/_models/flight';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-flight-form',
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.css']
})
export class FlightFormComponent {

  formBuilder = inject(FormBuilder);
  router = inject(Router)
  constructor(private http: HttpClient) { }

  flightForm = this.formBuilder.group({
    flightNumber: ['', Validators.required],
    arrivalTime: ['', Validators.required],
    departureTime: ['', Validators.required],
    fromCity: ['', Validators.required],
    toCity: ['', Validators.required],
    airportCode: ['', Validators.required],
    aircraftId: ['', Validators.required],
    ticketPrice: ['', Validators.required],
    ticketPriceCurrency: ['', Validators.required]
  })

  addOrUpdateFlight(flightData: Flight) {
    return this.http.post<any[]>(`${environment.apiUrl}/flight`, flightData)
    .subscribe({
      next: (res) => {
        console.log(res); 
        this.router.navigate(['/home'])
      },
      error: (err) => {
        console.log(err);        
      }
    });
  }

  deleteFlight(flightId: number) {
    return this.http.delete<any[]>(`${environment.apiUrl}/flight`, {params: {
      flightId: flightId
    }})
    .subscribe({
      next: (res) => {
        console.log(res); 
        window.location.reload()
      },
      error: (err) => {
        console.log(err);        
      }
    });
  }

}
