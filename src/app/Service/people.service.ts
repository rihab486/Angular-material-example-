import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../employee';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private baseUrl ='https://hub.dummyapis.com/employee?noofRecords=100&idStarts=1';

  constructor(private http:HttpClient) { }
  getAllPeoples(): Observable<any> {
    return this.http.get<Employee[]>(`${this.baseUrl}`);
  }
}
