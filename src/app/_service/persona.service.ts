import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HOST } from '../_shared/var.constant';
import { Persona } from '../_model/persona';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  url: string = `${HOST}/personas`;
  personaCambio = new Subject<Persona[]>();
  mensajeCambio = new Subject<string>();

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Persona[]>(this.url)
  }

  listarPorId(id: number){
    return this.http.get<Persona>(`${this.url}/${id}`)
  }

  registrar(persona: Persona){
    return this.http.post<Persona>(this.url, persona)
  }

  modificar(persona: Persona){
    return this.http.put<Persona>(this.url, persona)
  }

  eliminar(id: number){
    return this.http.delete(`${this.url}/${id}`)
  }
}
