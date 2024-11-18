import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  fetchProperties(): Observable<any> {
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.get(`${baseUrl}property`, { headers });
  }
  getFilteredProperties(filters: any): Observable<any> {
    let params = new HttpParams();

    // Add each filter to query params
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        params = params.append(key, filters[key]);
      }
    });
    return this.http.get(`${baseUrl}property`, { params });
  }

  fetchPropertyById(id: string): Observable<any> {
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${baseUrl}property/${id}`, { headers });
  }


}
