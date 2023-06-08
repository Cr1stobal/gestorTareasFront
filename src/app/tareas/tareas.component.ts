import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { TareaService } from '../tarea.service';


@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {
  tareas:any[] = [];
  formulario: FormGroup = this.fb.group({
    nombre: [],
    completado: [false]
  });

  constructor(
    private tareaService: TareaService,
    private fb: FormBuilder
    
    ) { }

    ngOnInit(): void {
      this.getAll();
    }

    getAll() {
      this.tareaService.getAll()
      .subscribe((tareas: any) => {
        console.log('tareas', tareas);
        this.tareas = tareas._embebed.tareas;
      })
    }

    save(){
      const values = this.formulario.value;

      console.log('values', values);

      this.tareaService.create(values)
      .subscribe(() => {
        this.getAll();
      })
    }

}
