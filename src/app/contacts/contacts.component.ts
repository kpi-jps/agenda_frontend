import { Component, OnInit } from '@angular/core'; 
import { Contact } from '../contact';
import { WebServiceService } from '../web-service.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  constructor(private service:WebServiceService) { }
  
  
  contacts : Contact[];
  msg : boolean = false;
  msgContent : string = 'Não há contatos registrados!';
  alert : boolean = false; //controla a visualização do "alert" (true = visível)
  error : boolean = false; //controla se o "alert" será de erro (se erro error = true)
  success : boolean = false; //controla se o "alert" será sucesso (see sucesso success = true)
  alertContent : string = ''; //conteúdo do "alert"

  confirm : boolean = false; //controla a visualização do "confirm" usado na deleção de um contato (true = visível)
  confirmContent : string = ''; //conteúdo do "confirm"

  id : string = ''; //id do contato a ser deletado

  //obtem todos os contatos registrados no banco de dados
  getContacts() : void {
    this.service.serviceGetContacts().subscribe(response => {
      
      this.contacts = response;
      if (response.length == 0) {
        this.msg = true;
      }
    })
  }

  //inicia o processo de deleção de um contato passando como parâmetro o "id" do mesmo
  //apresenta o elemento "confirm" 
  initDelete(id : string, name : string) {
    this.openConfirm();
    this.confirmContent = 'Tem certeza que deseja deletar o contato ' + name + '.';
    this.id = id;
  }

  //inicia o elemento "confirm"
  openConfirm() {
    this.confirm = true;
  }

  //fecha o elemento "confirm"
  closeConfirm() {
    this.confirm = false;
    this.confirmContent = '';
  }

  //dispara o alert para erros e sucesso
  triggerAlert(msg : string, type : string) : void{
    let check : boolean = true;
    if(type == 'error') {
      check = false;
      this.error = true;
    } else {
      this.success = true;
    }
    this.alert = true;
    this.alertContent = msg;
    setTimeout (() => {
      this.alert = false;
      this.alertContent= '';
      this.error = false;
      this.success = false;
      if(check) {
        this.getContacts();
      }
    }, 3000)
  }

  deleteContact() : void {
    let msg : string = '';
    this.service.serviceDeleteContact(this.id).subscribe(res => {
      if(res.ok == true) {
        this.closeConfirm();
        msg = 'Contato deletado com sucesso!';
        console.log('ok')
        this.triggerAlert(msg, 'success');
      } else {
        msg = 'Erro, o contato não foi deletado!'
        this.triggerAlert(msg, 'error');
      }
    });
  }

  ngOnInit(): void {
    this.getContacts();
  }
}
