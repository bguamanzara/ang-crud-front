import { Component, OnInit } from '@angular/core';
import { Persona } from '../../../_model/persona';
import { FormGroup, FormControl } from '@angular/forms';
import { PersonaService } from '../../../_service/persona.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-persona-edicion',
  templateUrl: './persona-edicion.component.html',
  styleUrls: ['./persona-edicion.component.css']
})
export class PersonaEdicionComponent implements OnInit {

  id: number;
  persona: Persona;
  form: FormGroup;
  edicion: boolean = false;
  
  constructor(private personaService: PersonaService, private route: ActivatedRoute, private router: Router) {
    this.form = new FormGroup({
      'idCurso': new FormControl(0),
      'nombre': new FormControl(''),
      'descripcion': new FormControl(''),
      'cantHoras': new FormControl(0),
      'docente': new FormControl(''),
      'vigente': new FormControl(true)
    });
   }

   ngOnInit() {
    this.persona = new Persona();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      console.log(this.id);
      this.edicion = this.id != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.edicion) {
      this.personaService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'idCurso': new FormControl(data.idCurso),
          'nombre': new FormControl(data.nombre),
          'descripcion': new FormControl(data.descripcion),
          'cantHoras': new FormControl(data.cantHoras),
          'docente': new FormControl(data.docente),
          'vigente': new FormControl(data.vigente)
        });
      });
    }
  }

  operar(){
    this.persona.idCurso = this.form.value['idCurso'];
    this.persona.nombre = this.form.value['nombre'];
    this.persona.descripcion = this.form.value['descripcion'];
    this.persona.cantHoras = this.form.value['cantHoras'];
    this.persona.docente = this.form.value['docente'];
    this.persona.vigente = this.form.value['vigente'];

    if(this.persona != null && this.persona.idCurso > 0){
      //update
      this.personaService.modificar(this.persona).subscribe( data => {
        console.log(data);
        this.personaService.listar().subscribe(data => {
          this.personaService.personaCambio.next(data);
          this.personaService.mensajeCambio.next('Se modificó');
        });
      });
    }else{
      //insert
      this.personaService.registrar(this.persona).subscribe( data => {
        console.log(data);
        this.personaService.listar().subscribe(data => {
          this.personaService.personaCambio.next(data);
          this.personaService.mensajeCambio.next('Se registró');
        });
      });
    }

    this.router.navigate(['persona']);
  }

}
