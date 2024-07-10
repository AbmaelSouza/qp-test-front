import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private busesData:any[] =  [];
  private selectedBusSeats:any = {}

  private apiUrl = 'http://localhost:8000/api'; // Adjusted apiUrl to use localhost

  constructor(private http: HttpClient) {
  }

  getStops(): Observable<any> {
    const url = `${this.apiUrl}/stops`;
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }

  setBusesData(data: any) {
    this.busesData = data;
  }

  getBusesData() {
    return this.busesData;
  }

  search(from: string, to: string, travelDate: string ): Observable<any> {
    const url = `${this.apiUrl}/search`;
    const data = {
      from,
      to,
      travelDate,
    };
    return this.http.post(url, data).pipe(
      catchError(this.handleError)
    );
  }

  getSeats(travelId: string): Observable<any> {
    const url = `${this.apiUrl}/seats`;
    const data = {
      travelId,
      orientation: 'horizontal',
      type: 'matriz'
    };
    return this.http.post(url, data).pipe(
      catchError(this.handleError)
    );
  }

  setSelectedBusSeatsData(data: any, item:any){
    this.selectedBusSeats = {data:data,item:item};
  }
  getSelectedBusSeatsData(){
    return this.selectedBusSeats;
  }


  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      console.error('An error occurred:', error.error.message);
    } else {
      // Server-side error
      console.error('Backend returned status code:', error.status);
      console.error('Response body:', error.error);
    }
    // Return an observable with a user-facing error message
    return throwError('Error connecting to server. Please try again later.');
  }

}
