import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { take } from 'rxjs';




@Injectable({
  providedIn: 'root',
})
export class AnimalService {
 apiUri = '/api/animals';

constructor(private http: HttpClient) {}

httpOptions = new HttpHeaders().set('Content-Type', 'application/json');

getAllAnimalsData(): Observable<any> {
return this.http.get<any>(this.apiUri) 
}

newAnimal(data: any): Observable<any> {
    return this.http.post<any>(
      this.apiUri,
      data,
      {headers: this.httpOptions});
  }





}
