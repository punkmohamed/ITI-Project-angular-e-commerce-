import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import Register from '../Interfaces/register';
import Login from '../Interfaces/login';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpClient = inject(HttpClient)
  isBrowser: boolean;
  token: any = ''
  userID: any = ''
  route = inject(Router)
  loggedInUser: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null)
  userInformation: BehaviorSubject<any> = new BehaviorSubject<any>(null)


  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId)
    if (this.isBrowser) {
      const token = localStorage.getItem('token')
      if (token) {
        this.loggedInUser.next(JSON.parse(token))
        this.loadUserInformation()
      }
    }
  }


  register(data: Register): Observable<Register> {
    return this.httpClient.post<Register>('http://localhost:3000/signup', data)
  }
  login(data: Login): Observable<any> {
    return this.httpClient.post<any>('http://localhost:3000/signin', data)
  }
  Logout() {
    if (this.isBrowser) localStorage.removeItem("token")
    this.route.navigate(['login'])
    this.loggedInUser.next(null)
    this.userInformation.next(null)
  }
  saveUserData(token: string) {
    if (this.isBrowser) localStorage.setItem("token", JSON.stringify(token))
    this.loggedInUser.next(token)
    this.loadUserInformation()
  }
  getUserInformation(): Observable<any> {
    if (this.isBrowser) {
      this.token = localStorage.getItem("token");
      if (this.token) {
        const decodedToken: any = jwtDecode(this.token);
        this.userID = decodedToken.id;
      }
    }
    return this.httpClient.get<any>(`http://localhost:3000/user/${this.userID}`);
  }

  updateUserInformation(data: any): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders();
    if (this.isBrowser) {
      this.token = localStorage.getItem('token');
      const decodedToken: any = jwtDecode(this.token);
      this.userID = decodedToken.id;
      headers = new HttpHeaders({
        'Authorization': `Bearer ${this.token.replace(/"/g, '')}`
      });

    }
    const updateObservable = this.httpClient.patch<any>(`http://localhost:3000/user/update/${this.userID}`, data, { headers });

    updateObservable.subscribe(updatedUserInfo => {
      this.userInformation.next(updatedUserInfo);
    });

    return updateObservable;
  }

  loadUserInformation() {
    if (this.isBrowser) {
      this.token = localStorage.getItem('token');
      if (this.token) {
        const decodedToken: any = jwtDecode(this.token);
        this.userID = decodedToken.id;
        this.getUserInformation().subscribe(userInfo => {
          this.userInformation.next(userInfo);
        });
      }
    }
  }
  forgotPasswordEmail(data: any): Observable<any> {
    return this.httpClient.post<any>('http://localhost:3000/user/resetPasswordEmail', data)
  }
  resetPasswordEmail(token: any, data: any): Observable<any> {
    return this.httpClient.patch<any>(`http://localhost:3000/user/resetPassword/${token}`, data)
  }
  activateTheAccount(token: any): Observable<any> {
    return this.httpClient.patch<any>(`http://localhost:3000/verfiy/${token}`, token)
  }
}
