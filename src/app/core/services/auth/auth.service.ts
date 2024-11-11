import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  constructor(private http: HttpClient) { }

  private currentUserSubject = new BehaviorSubject<any>(this.getUser());

  user$ = this.currentUserSubject.asObservable();

  setUser(user: any) {
    localStorage.setItem('user', user);
    this.currentUserSubject.next(user); // Notify all subscribers about the new user
    
  }

  getUser() {
    const userData = localStorage.getItem('user');
    if (userData === undefined || userData === null) {
      return null;
    }

    // Attempt to parse userData and handle any JSON parsing errors
    try {
      return JSON.parse(userData);
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null; // Return null if parsing fails
    }
  }


  logout() {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null); // Notify subscribers about logout
  }


  // Signup method to send data to backend
  signup(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(`${baseUrl}auth/signup`, data, { headers });

  }
  // Signup method to send data to backend
  login(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(`${baseUrl}auth/login`, data, { headers });
  }
}
