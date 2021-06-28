import { Component, OnInit } from '@angular/core';
import { WebServiceService } from '../web-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  alert : boolean = false; //controla a visualização do "alert" (true = visível)
  error : boolean = false; //controla se o "alert" será de erro (se erro error = true)
  success : boolean = false; //controla se o "alert" será sucesso (see sucesso success = true)
  content : string = ''; //conteúdo do "alert"
  formRegister : FormGroup; //controla o formuário

  constructor(private service : WebServiceService,
              private location : Location
      ) {

     }
  
  //registra dados de um contato no banco de dados
  onSubmit() {
    let msg : string = '';
    if(this.formRegister.get('name').valid && this.formRegister.get('email').valid && this.formRegister.get('phone').valid) {
      let contact = {
        name:this.formRegister.get('name').value,
        email:this.formRegister.get('email').value,
        phone: this.formRegister.get('phone').value
      }
      this.service.serviceRegisterContact(contact).subscribe(res => {
        if(res.ok == true) {
          msg = 'Contato salvo com sucesso!';
          console.log('ok')
          this.triggerAlert(msg, 'success');
        } else {
          msg = 'O contato não foi salvo!'
          this.triggerAlert(msg, 'error');
        }
      });
    } else {
      if (!this.formRegister.get('name').valid) {
        msg += 'Nome não preenchido. ';
      } if (!this.formRegister.get('email').valid) {
        msg += 'Email não preenchido ou inválido. ';
      } if(!this.formRegister.get('phone').valid) {
        msg += 'Telefone não preenchido. ';
      }
      this.triggerAlert(msg, 'error');
    }
  }

  //cancela o formulário retornando para a página anterior
  cancelUpdate() {
    this.location.back();
  }

  //dispara o alert para erros e sucesso
  triggerAlert(msg : string, type : string) {
    let check : boolean = true;
    if(type == 'error') {
      check = false;
      this.error = true;
    } else {
      this.success = true;
    }
    this.alert = true;
    this.content = msg;
    setTimeout (() => {
      this.alert = false;
      this.content = '';
      this.error = false;
      this.success = false;
      if(check) {
        this.location.back();
      }
    }, 3000)
  }
  
  //inicia o formulário
  private initForm() {
    this.formRegister = new FormGroup({
    name : new FormControl(null, [Validators.required]),
    email : new FormControl(null, [Validators.required, Validators.email]),
    phone : new FormControl(null, [Validators.required])
    });
  }
  
  ngOnInit(): void {
    this.initForm();
  }

}
