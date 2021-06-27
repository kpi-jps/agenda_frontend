import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { WebServiceService } from '../web-service.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  @Output() alert = new EventEmitter<string>();
  formUpdate : FormGroup;
  contact : Contact ;
  constructor(private service : WebServiceService,
              private route : ActivatedRoute,
              private location : Location
              ) {  
  }
  
  getContact() {
    let id = this.route.snapshot.paramMap.get("id");
    this.service.serviceGetContact(id).subscribe(response => {
      this.contact = response;
      console.log(this.contact);
      this.formUpdate.get("name").setValue(this.contact.name);
      this.formUpdate.get("email").setValue(this.contact.email);
      this.formUpdate.get("phone").setValue(this.contact.phone);
    }) 
  }
  cancelUpdate() {
    this.location.back();
  }
  /*
  alert : boolean = true;
  confirm : boolean = false;
  content : string = '';
  triggerAlert(msg : string) {
    
    this.alert = true;
    this.content = msg;
    setTimeout (() => {
      this.alert = false;
      this.content = '';
    }, 3000)
  }
  */

  onSubmit() {
    if(this.formUpdate.get('email').valid) {
      console.log('é válido');
      this.location.back();
    } else {
      this.alert.emit('não é válido');
      console.log('não é válido');
    }
  }
  
  private initForm() {
    this.formUpdate = new FormGroup({
    name : new FormControl(null, [Validators.required]),
    email : new FormControl(null, [Validators.required, Validators.email]),
    phone : new FormControl(null, [Validators.required])
    });
  }
  
  ngOnInit(): void {
    this.initForm();
    this.getContact();
  }

}
