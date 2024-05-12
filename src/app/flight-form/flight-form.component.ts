import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  route = inject(ActivatedRoute)
  flightData!: Flight;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    if (id != null) {
      this.getFlight(Number.parseInt(id))
    }
  }

  flightForm = this.formBuilder.group({
    flightNumber: ['', Validators.required],
    fromCity: ['', Validators.required],
    toCity: ['', Validators.required],
    arrivalTime: ['', Validators.required],
    departureTime: ['', Validators.required],    
    airportCode: ['', Validators.required],
    aircraftId: ['', Validators.required],
    ticketPrice: ['', Validators.required],
    ticketPriceCurrency: ['', Validators.required],
    creatorId: ['']
  })

  get flightNumber() {
    return this.flightForm.controls['flightNumber'];
  }

  get arrivalTime() {
    return this.flightForm.controls['arrivalTime'];
  }

  get departureTime() {
    return this.flightForm.controls['departureTime'];
  }

  get fromCity() {
    return this.flightForm.controls['fromCity'];
  }

  get toCity() {
    return this.flightForm.controls['toCity'];
  }

  get airportCode() {
    return this.flightForm.controls['airportCode'];
  }

  get aircraftId() {
    return this.flightForm.controls['aircraftId'];
  }

  get ticketPrice() {
    return this.flightForm.controls['ticketPrice'];
  }

  get ticketPriceCurrency() {
    return this.flightForm.controls['ticketPriceCurrency'];
  }

  addOrUpdateFlight() {
    const flightD = {
      flightNumber: this.flightNumber.value,
      arrivalTime: this.arrivalTime.value,
      departureTime: this.departureTime.value,
      fromCity: this.fromCity.value,
      toCity: this.toCity.value,
      airportCode: this.airportCode.value,
      aircraftId: this.aircraftId.value,
      ticketPrice: this.ticketPrice.value,
      ticketPriceCurrency: this.ticketPriceCurrency.value,
      creatorId: null
    }
    
    return this.http.post<any>(`${environment.apiUrl}/flight`, flightD)
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

  getFlight(flightId: number) {
    return this.http.get<any>(`${environment.apiUrl}`,{
      params: {flightId: flightId}
    })
    .subscribe({
      next: (res) => {
        console.log(res); 
        this.flightForm.patchValue({
          flightNumber: res.flightNumber,
          arrivalTime: res.arrivalTime,
          departureTime: res.departureTime,
          fromCity: res.fromCity,
          toCity: res.toCity,
          airportCode: res.airportCode,
          aircraftId: res.aircraftId,
          ticketPrice: res.ticketPrice,
          ticketPriceCurrency: res.ticketPriceCurrency 
        })
      },
      error: (err) => {
        console.log(err);        
      }
    });
  }

}
