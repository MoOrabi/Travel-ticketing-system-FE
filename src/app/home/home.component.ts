import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Flight } from '@app/_models/flight';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private http: HttpClient) { }


  getAll() {
    return this.http.get<any[]>(`${environment.apiUrl}/my-all`)
    .subscribe({
      next: (res) => {
        console.log(res); 
        this.myAll = res       
      },
      error: (err) => {
        console.log(err);        
      }
    });
  }

  myAll: Array<Flight> | undefined;

  ngOnInit() {
    this.getAll()
  }

  deleteFlight(flightId: number) {
    return this.http.delete<any[]>(`${environment.apiUrl}`, {params: {
      flightId: flightId
    }})
    .subscribe({
      next: (res) => {
        console.log(res); 
        window.location.reload()
      },
      error: (err) => {
        if(err == "OK") {
          window.location.reload()
        }
        console.log(err);        
      }
    });
  }
  
}
