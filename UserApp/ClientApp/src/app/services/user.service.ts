import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient } from "@angular/common/http";
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  Url ="../api/user";

  constructor(private http: HttpClient) { }

  CreateUser(user:User)  
   {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };  
     return this.http.post<User>(this.Url+'/CreateUser/', user,httpOptions)  
   }
   


   ValidateUser(user:User)  
   {  
    return this.http.get<User>(this.Url + '/ValidateUser/?mobileNumber=' + user.MobileNumber+'&&password='+user.Password);  
   }
}
