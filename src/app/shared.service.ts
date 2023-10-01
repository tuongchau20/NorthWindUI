import { Injectable } from '@angular/core';
import { Observable, Subject,tap } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  createShipper(val: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.APIUrl + '/shippers', val, httpOptions).pipe(
      tap(() => {
        this._refreshData.next();
      })
    );  }
  updateShipper(val: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<any>(this.APIUrl + '/shippers/' + val.id, val, httpOptions).pipe(
      tap(() => {
        this._refreshData.next();
      })
    );  }
  
  readonly APIUrl = 'https://localhost:7074/api';
  private _refreshData = new Subject<void>();
  get RefreshedData(){
    return this._refreshData;
  }
  
  constructor(private http: HttpClient) { }
  getAllShippers() {
    return this.http.get<any>(this.APIUrl+'/shippers');

  }
  deleteShipper(val: any) {
    return this.http.delete<any>(this.APIUrl+'/products/'+ val);

  }

  getAllCategories() {
    return this.http.get<any>(this.APIUrl+'/categories');
  }

  deleteCategory(val: any) {
    return this.http.delete<any>(this.APIUrl+'/categories/'+ val);
  }
  createCategory(val: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.APIUrl + '/categories', val, httpOptions).pipe(
      tap(() => {
        this._refreshData.next();
      })
    );
  }
  updateCategory(val: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<any>(this.APIUrl + '/categories/' + val.id, val, httpOptions).pipe(
      tap(() => {
        this._refreshData.next();
      })
    );
  }
  getAllProducts() {
    return this.http.get<any>(this.APIUrl+'/products');
  }
  createProducts(val: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.APIUrl+'/products', val, httpOptions);
  }
  updateProducts(val: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<any>(this.APIUrl+'/products', val, httpOptions);
  }
  deleteProducts(val: any){
    return this.http.delete<any>(this.APIUrl+'/products/'+ val);
  }
  
  getAllCustomers() {
    return this.http.get<any>(this.APIUrl+'/customers');
  }
  createCustomers(val: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.APIUrl+'/customers', val, httpOptions);
  }
  updateCustomers(val: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<any>(this.APIUrl+'/customers', val, httpOptions);
  }
  deleteCustomers(val: any){
    return this.http.delete<any>(this.APIUrl+'/customers/'+ val);
  }
  getAllBuyOrders(PageNumber: any, PageSize: any){
    return this.http.get<any>(this.APIUrl+'/BuyOrder?PageNumber=' + PageNumber + '&PageSize=' + PageSize);
  }
  getBuyOrderById(val: any) {
    return this.http.get<any>(this.APIUrl+'/BuyOrder/' + val);
  } 
  createBuyOrders(val: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.APIUrl+'/BuyOrder', val, httpOptions).pipe(
      tap(() =>{
        this._refreshData.next();
      })
    );
  }
  updateBuyOrders(val: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<any>(this.APIUrl+'/BuyOrder', val, httpOptions).pipe(
      tap(() =>{
        this._refreshData.next();
      })
    );
  }
  updateBuyOrdersDetail(val: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<any>(this.APIUrl+'/BuyOrderDetail', val, httpOptions);
  }
  deleteBuyOrders(val: any){
    return this.http.delete<any>(this.APIUrl+'/BuyOrder/'+ val);
  }
  deleteBuyOrderById(val: any){
    return this.http.delete<any>(this.APIUrl+'/BuyOrderDetail/'+ val);
  }


  getAllOrders(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl+'/Order');
  }
  getOrderById(val: any) {
    return this.http.get<any>(this.APIUrl+'/Order/' + val);
  }
  createOrders(val: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.APIUrl+'/Order', val, httpOptions).pipe(
      tap(() =>{
        this._refreshData.next();
      })
    );
  }
  updateOrders(val: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<any>(this.APIUrl+'/Order', val, httpOptions).pipe(
      tap(() =>{
        this._refreshData.next();
      })
    );
  }
  updateOrdersDetail(val: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<any>(this.APIUrl+'/OrderDetail', val, httpOptions);
  }
  deleteOrders(val: any){
    return this.http.delete<any>(this.APIUrl+'/Order/'+ val);
  }
  deleteOrderById(val: any){
    return this.http.delete<any>(this.APIUrl+'/OrderDetail/'+ val);
  }
}
