import { HttpClient, HttpHeaders } from '@angular/common/http';
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

    images.forEach((image, index) => {
      formData.append(`images[${index}]`, image, image.name);
    });

    formData.append('data', JSON.stringify(data));
    const headers = new HttpHeaders({
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiaWF0IjoxNzI5NjkyOTIwLCJleHAiOjE3Mzc0Njg5MjB9.Lws1r0BI8CVTArK2ufvrnEcJstU76WyiNAgT_3r94Ck`
    });
    return this.http.post(`${baseUrl}property`, formData, { headers });

  }
    // Fetch properties method
    fetchProperties(): Observable<any> {

      const headers = new HttpHeaders({
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiaWF0IjoxNzI5NjkyOTIwLCJleHAiOjE3Mzc0Njg5MjB9.Lws1r0BI8CVTArK2ufvrnEcJstU76WyiNAgT_3r94Ck`
      }); 
      return this.http.get(`${baseUrl}property`, { headers });
    }

    fetchPropertyById(id: number): Observable<any> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiaWF0IjoxNzI5NjkyOTIwLCJleHAiOjE3Mzc0Njg5MjB9.Lws1r0BI8CVTArK2ufvrnEcJstU76WyiNAgT_3r94Ck`
      });
      return this.http.get(`${baseUrl}property/${id}`, { headers });
    }
    

}
