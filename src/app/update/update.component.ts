import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { WebServiceService } from '../web-service.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  alert : boolean = false; //controla a visualização do "alert" (true = visível)
  error : boolean = false; //controla se o "alert" será de erro (se erro error = true)
  success : boolean = false; //controla se o "alert" será sucesso (see sucesso success = true)
  content : string = ''; //conteúdo do "alert"
  formUpdate : FormGroup; //variável de controle do formulário
  contact : Contact ; //representa um contato

  constructor(private service : WebServiceService,
              private route : ActivatedRoute,
              private location : Location
              ) {  
  }
  
  //retorna um contato específico passando como parâmetro o id do contato, preenchendo o formulário
  //com os dados do contato
  getContact() {
    let id = this.route.snapshot.paramMap.get("id"); //retorna o id da rota
    this.service.serviceGetContact(id).subscribe(response => {
      this.contact = response;
      console.log(this.contact);
      //setando os valores nos campos do formulário
      this.formUpdate.get("name").setValue(this.contact.name);
      this.formUpdate.get("email").setValue(this.contact.email);
      this.formUpdate.get("phone").setValue(this.contact.phone);
    }) 
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
  
  //atualiza dados do contato no banco de dados
  onSubmit() {
    let msg : string = '';
    if(this.formUpdate.get('name').valid && this.formUpdate.get('email').valid && this.formUpdate.get('phone').valid) {
      let id = this.route.snapshot.paramMap.get("id");
      let contact = {
        name:this.formUpdate.get('name').value,
        email:this.formUpdate.get('email').value,
        phone: this.formUpdate.get('phone').value
      }
      this.service.serviceUpdateContact(contact, id).subscribe(res => {
        if(res.ok == true) {
          msg = 'Contato atualizado com sucesso!';
          console.log('ok')
          this.triggerAlert(msg, 'success');
        } else {
          msg = 'O contato não foi atualizado!'
          this.triggerAlert(msg, 'error');
        }
      });
    } else {
      if (!this.formUpdate.get('name').valid) {
        msg += 'Nome não preenchido. ';
      } if (!this.formUpdate.get('email').valid) {
        msg += 'Email não preenchido ou inválido. ';
      } if(!this.formUpdate.get('phone').valid) {
        msg += 'Telefone não preenchido. ';
      }
      this.triggerAlert(msg, 'error');
    }
  }
  
  //inicia o formulário
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
