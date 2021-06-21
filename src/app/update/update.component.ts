import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { WebServiceService } from '../web-service.service';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  formUpdate : FormGroup;

  constructor(private service : WebServiceService) { }
  
  onSubmit() {

  }
  
  private initForm() {
    this.formUpdate = new FormGroup({
    name : new FormControl(null, [Validators.required]),
    email : new FormControl(null, [Validators.required]),
    phone : new FormControl(null)
    });
  }
  
  ngOnInit(): void {
    this.initForm();
  }

}
