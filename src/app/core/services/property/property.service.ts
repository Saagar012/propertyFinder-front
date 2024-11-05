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
    // Append the selected images
   
    images.forEach((image) => {
      formData.append('images', image); // Only use 'images' as the key
    });
    

    formData.append('data', JSON.stringify(data));
    console.log("formdata" + formData);
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

  fetchPropertyById(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiaWF0IjoxNzI5NjkyOTIwLCJleHAiOjE3Mzc0Njg5MjB9.Lws1r0BI8CVTArK2ufvrnEcJstU76WyiNAgT_3r94Ck`
    });
    return this.http.get(`${baseUrl}property/${id}`, { headers });
  }


}
