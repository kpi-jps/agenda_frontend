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
  
  ngOnInit(): void {
  }
  /*
  //aobtem todos os contatos registrados no banco de dados
  getContacts() {

  }

  //inicia o processo de deletar um contato específico, tornando visível um elemento html,
  //semelhante a um alert, que permite concluir a tarefa
  startDeleteContact(id: string) {

  }

  //deleta um contato específico
  deleteContact(id : string) {

  }

  //inicia o processo de edição das informações de um contato específico, apresentando o
  //componente responsável pela tarefa
  startUpdateContact(id : string) {

  }

  //inicia o processo de registro de um contato no banco de dados, apresentando o
  //componente responsável pela tarefa
  startRegisterContact(id: string) {

  }
  */

}
