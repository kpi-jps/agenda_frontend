import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import { Contact } from './contact';

@Injectable({
  providedIn: 'root'
})
export class WebServiceService {
  constructor( ) {}
  //constructor(private http : HttpClient) { }
  /*
  baseURL = "colocar aqui o link do banco de dados do glich";

  //obtem todos os contatos registrados no banco de dados
  getContacts() : Observable<Contact[]> {
    return this.http.get<Contact[]>(this.baseURL + "/contatos");
  }

  //registra um novo contato no banco de dados
  registerContact(contact) : Observable<any>{
    let body = new HttpParams();
    body = body.set("name", contact.title);
    body = body.set("email", contact.email);
    body = body.set("phone", contact.phone);
    return this.http.post(this.baseURL + "/contatos", body, {observe: "response"});
  }

  //atualiza um contato específico no banco de dados
  updateContact(contact, id:string) : Observable<any>{
    let body = new HttpParams();
    body = body.set("name", contact.title);
    body = body.set("email", contact.email);
    body = body.set("phone", contact.phone);
    return this.http.put(this.baseURL + "/contatos/" + id, body, {observe: "response"});
  }

  //deleta um contato específico no banco de dados
  deleteContact(id:string) : Observable<any>{
    return this.http.delete(this.baseURL + "/contatos/" + id, {observe: "response"});
  }
  */
}
