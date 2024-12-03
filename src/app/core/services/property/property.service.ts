import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter } from 'lodash';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(private http: HttpClient) { }

  createProperty(data: any, images: File[]): Observable<any> {
    const formData = new FormData();
    // Append the selected images
   
    images.forEach((image) => {
      formData.append('images', image); // Only use 'images' as the key
    });
    
   // Retrieve the token from localStorage
    const token = localStorage.getItem('authToken');

    formData.append('data', JSON.stringify(data));
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
    return this.http.post(`${baseUrl}property`, formData, { headers });

  }
  // Fetch properties method
  fetchProperties(page: number = 1, limit: number = 4): Observable<any> {
    let params = new HttpParams();
    const token = localStorage.getItem('authToken');
    params = params.append('page', page.toString());
    params = params.append('limit', limit.toString());
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.get(`${baseUrl}property`, { headers, params });
  } 



  getFilteredProperties(filters: any, page: number = 1, limit: number = 9): Observable<any> {
    let params = new HttpParams();

    // Add each filter to query params
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        if (Array.isArray(filters[key])) {
          // If the value is an array, append each value separately with the same key
          filters[key].forEach((value: string) => {
            params = params.append(key, value);
          });
        } else {
          // Otherwise, just append the single value
          params = params.append(key, filters[key]);
        }
      }
    });
      // Append page and limit
  params = params.append('page', page.toString());
  params = params.append('limit', limit.toString());

    return this.http.get(`${baseUrl}property/filtered`, { params });
  }

  fetchMyPropertyById(id: string): Observable<any> {
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${baseUrl}property/details/${id}`, { headers });
  } 
  fetchPropertyById(id: string): Observable<any> {
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${baseUrl}property/${id}`, { headers });
  } 
  calculateMortgage(data: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' // Set content type as JSON
    });
  
    // Make POST request with the data (city, area, propertyType) to calculate mortgage
    return this.http.post(`${baseUrl}property/approx-mortgage-price`, data, { headers });
  }
  

}
