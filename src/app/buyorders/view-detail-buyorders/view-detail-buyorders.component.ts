import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/shared.service';
import { FormGroup, FormControl, FormArray, FormBuilder,Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-view-detail-buyorders',
  templateUrl: './view-detail-buyorders.component.html',
  styleUrls: ['./view-detail-buyorders.component.css']
})
export class ViewDetailBuyordersComponent implements OnInit {
  id: any;
  buyOrderDetail: any;
  constructor(private route: ActivatedRoute, private service: SharedService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getById();
    
  }
  getById(){
    this.service.getBuyOrderById(this.id).subscribe(data => {
      this.buyOrderDetail = data;
      console.log(data.orderNo);
      
    })
  }
}
