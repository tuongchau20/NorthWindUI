import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIUrl = 'http://localhost:5177/api';
  constructor(private http: HttpClient) { }
  getAllProducts(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl+'/products');
  }
  createProducts(val: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.APIUrl+'/products', val, httpOptions);
  }
  updateProducts(val: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put(this.APIUrl+'/products', val, httpOptions);
  }
  deleteProducts(val: any){
    return this.http.delete(this.APIUrl+'/products/'+ val);
  }
  
  getAllCustomers(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl+'/customers');
  }
  createCustomers(val: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.APIUrl+'/customers', val, httpOptions);
  }
  updateCustomers(val: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put(this.APIUrl+'/customers', val, httpOptions);
  }
  deleteCustomers(val: any){
    return this.http.delete(this.APIUrl+'/customers/'+ val);
  }
}
