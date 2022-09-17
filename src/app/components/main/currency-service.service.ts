import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurrencyServiceService {

  constructor(private http: HttpClient) { }

  getCountries() {
    return this.http.get('../../../assets/countries.json')
    .subscribe(result => console.log(result))
}
}
