import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import { Contact } from './contact';

@Injectable({
  providedIn: 'root'
})
export class WebServiceService {
  
  constructor(private http : HttpClient) { }
  
  baseURL = "https://sc3012964.glitch.me/api/contatos/"; //já tá no glitch

  //obtem todos os contatos registrados no banco de dados
  serviceGetContacts() : Observable<Contact[]> {
    return this.http.get<Contact[]>(this.baseURL);
  }

  //obtem um contato específico registrado no banco de dados
  serviceGetContact(id:string) : Observable<any> {
    return this.http.get<any>(this.baseURL + id);
  }

  //registra um novo contato no banco de dados
  serviceRegisterContact(contact) : Observable<any>{
    let body = new HttpParams();
    body = body.set("name", contact.name);
    body = body.set("email", contact.email);
    body = body.set("phone", contact.phone);
    return this.http.post(this.baseURL, body, {observe: "response"});
  }

  //atualiza um contato específico no banco de dados
  serviceUpdateContact(contact, id:string) : Observable<any>{
    let body = new HttpParams();
    body = body.set("name", contact.name);
    body = body.set("email", contact.email);
    body = body.set("phone", contact.phone);
    return this.http.put(this.baseURL + id, body, {observe: "response"});
  }

  //deleta um contato específico no banco de dados
  serviceDeleteContact(id:string) : Observable<any>{
    return this.http.delete(this.baseURL + id, {observe: "response"});
  }
  
}
