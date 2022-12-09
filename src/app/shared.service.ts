import { Injectable } from '@angular/core';
import { Observable, Subject,tap } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIUrl = 'http://localhost:5177/api';
  private _refreshData = new Subject<void>();
  get RefreshedData(){
    return this._refreshData;
  }
  
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
  getAllBuyOrders(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl+'/BuyOrder');
  }
  getBuyOrderById(val: any) {
    return this.http.get<any>(this.APIUrl+'/BuyOrder/' + val);
  }
  // createBuyOrders(val: any) {
  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  //   return this.http.post(this.APIUrl+'/BuyOrder', val, httpOptions);
  // }  
  createBuyOrders(val: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.APIUrl+'/BuyOrder', val, httpOptions).pipe(
      tap(() =>{
        this._refreshData.next();
      })
    );
  }
  // updateBuyOrders(val: any) {
  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  //   return this.http.put(this.APIUrl+'/BuyOrder', val, httpOptions);
  // }
  updateBuyOrders(val: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put(this.APIUrl+'/BuyOrder', val, httpOptions).pipe(
      tap(() =>{
        this._refreshData.next();
      })
    );
  }
  updateBuyOrdersDetail(val: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put(this.APIUrl+'/BuyOrderDetail', val, httpOptions);
  }
  deleteBuyOrders(val: any){
    return this.http.delete(this.APIUrl+'/BuyOrder/'+ val);
  }
}
