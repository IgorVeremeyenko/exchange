import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Products } from '../interfaces/products';
import { Currency } from '../interfaces/currency';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private urlAll = "https://api.nbp.pl/api/exchangerates/tables/A/?format=json"
  private urlDate = ""

  constructor(private _http: HttpClient) { }

  getAll() {
    return this._http.get<Products[]>(this.urlAll);
  }
  getByDate(date: string) {
    const url = this.setDate(date);
    return this._http.get<Products[]>(url);
  }

  setDate(date:string){
    return this.urlDate = `https://api.nbp.pl/api/exchangerates/tables/A/${date}/?format=json`
  }
}
