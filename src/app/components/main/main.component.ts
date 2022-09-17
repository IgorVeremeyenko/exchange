import { Component, OnInit } from '@angular/core';
import { SortEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { Currency } from 'src/app/interfaces/currency';
import { DatePipe } from '@angular/common'
import { DataService } from 'src/app/services/data.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    currencies: Currency[] = []; 

    stateOptions!: any[];

    value1: string = "off";

    loading: boolean = true;

    date!: Date

    errorMessages: string = '';

    constructor(private dataService: DataService, public datepipe: DatePipe, private theme: ThemeService){
        this.stateOptions = [{label: 'Сiemny', value: 'md-light-indigo'}, {label: 'Jasny', value: 'bootstrap4-dark-purple'}];
    }

    ngOnInit(){
        this.loadData();
       
    }

    changeTheme(event:string) {
        
        this.theme.switchTheme(event)
    }

    onInputCalendar(date: any){
        let date_regex = /^\d{2}\/\d{2}\/\d{4}$/ ;
        if(date_regex.test(date) === true){
           this.date = date;
           this.loadDataByDate(); 
        }
    }

    loadData(){
        this.dataService.getAll().subscribe(data => {
            data.map(items => {
                this.currencies = items.rates
                this.loading = false
            })
        })
    }

    customSort(event: SortEvent) {
        event.data!.sort((data1, data2) => {
            let value1 = data1[event.field!];
            let value2 = data2[event.field!];
            let result = null;

            if (value1 == null && value2 != null)
                result = -1;
            else if (value1 != null && value2 == null)
                result = 1;
            else if (value1 == null && value2 == null)
                result = 0;
            else if (typeof value1 === 'string' && typeof value2 === 'string')
                result = value1.localeCompare(value2);
            else
                result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

            return (event.order! * result);
        });
    }

    clear(table: Table) {
        table.clear();
    }

    loadDataByDate(){
        const choosen_date = this.datepipe.transform(this.date, 'YYYY-MM-dd')?.toString();
        this.dataService.getByDate(choosen_date!).subscribe(data => {
            console.log(data);
            this.currencies = [];
            data.map(items => {
                this.currencies = items.rates;
            })
        }, error => {
            this.currencies = []
            if(error.statusText === 'Not Found - Brak danych'){                
                this.errorMessages = `${error.status} Not Found`
            }
            if(error.statusText === 'B³êdny zakres dat / Invalid date range'){
                this.errorMessages = `404 Bad Request`
            }
            else {
                this.errorMessages = `${error.status} ${error.statusText}`
            }
        })
    }

}
