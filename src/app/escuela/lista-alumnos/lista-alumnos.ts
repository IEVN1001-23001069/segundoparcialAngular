import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms'
import { IAlumno } from './alumnos';
import { CommonModule } from '@angular/common';

@Component({
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  selector: 'app-lista-alumnos',
  styleUrl: './lista-alumnos.css',
  templateUrl: './lista-alumnos.html',
})
export class ListaAlumnos{
  formulario!:FormGroup
  alumnos:IAlumno[]=[]
  indiceEdicion:number=-1

  nuevoAlumno:IAlumno={//La lista 
  matricula:'',
  nombre:'',
  correo:'',
  materia:'',
  }
  ngOnInit():void{
    this.cargarAlumnos()
    this.formulario=new FormGroup({
      matricula:new FormControl(''),
      nombre:new FormControl(''),
      correo:new FormControl(''),
      materia:new FormControl(''),
    })
  }

  agregarAlumno():void{
    if(
      this.nuevoAlumno.matricula === '' ||
      this.nuevoAlumno.nombre === '' ||
      this.nuevoAlumno.correo === '' ||
      this.nuevoAlumno.materia === ''

    ){
      alert('Todos los campos son obligatorios');
      return;
    }
    if(this.indiceEdicion !== -1){
      this.alumnos[this.indiceEdicion]={
        ...this.nuevoAlumno
      }
    }else{
      this.alumnos.push({...this.nuevoAlumno}) //... se conoce como split o metodos de propagación, le dice al script que van a insertarse todas las propiedades que contenga el objeto, para eso primero debemos cargar el local storage ya que quqeremos agregar elementos a la lista, vemos si existe la lista en el local storage y se la insertamos a este elemento

    }

    localStorage.setItem(
      'alumnos',
      JSON.stringify(this.alumnos)
    ) //Con esto agregamos el elemento al local storage nuevamente, mas el nombre de la variable, y el JSON.stringify permite la transformación del formato para subirlo.
    this.limpiarCampos()
  }
  
  muestraAlumnos():void{
    this.nuevoAlumno.matricula=this.formulario.value.matricula
    this.nuevoAlumno.nombre=this.formulario.value.nombre
    this.nuevoAlumno.correo=this.formulario.value.correo
    this.nuevoAlumno.materia=this.formulario.value.materia
    this.agregarAlumno()
  }

  cargarAlumnos(): void{
    const datos = localStorage.getItem('alumnos'); //Cargamos los elementos a la lista que encontramos en el localStorage

    if(datos){
      this.alumnos = JSON.parse(datos) //Transforma los datos 
    }
  }

  editarAlumnos(index:number):void{//Contiene un parametro de tipo númerico index para identificar donde se encuentra cada elemento de la lista 
    this.nuevoAlumno={
      ...this.alumnos[index] //de la lista solo seleccionamos un elemento que cumpla con la posición deseada, se hace un split del elemento
    }
    const alumno=this.alumnos[index] //vamos a pasar los valores a la const alumno
    this.formulario.patchValue({ // formulario se refiere a todos los elementos del formGroup, patchValue permite subir los valores del Backend al Frontend 
      matricula: alumno.matricula,
      nombre:alumno.nombre,
      correo:alumno.correo,
      materia:alumno.materia
    })

    this.indiceEdicion=index //Como es un valor particular entrara al else de agregar alumno 
  }

  eliminarAlumno(index:number):void{//tambien recibe un indice
    this.alumnos.splice(index,1)//Splice recorre el elemento y lo elimina 
    localStorage.setItem(
      'alumnos',
      JSON.stringify(this.alumnos)
    )
  }

  limpiarCampos():void{
    this.formulario.reset();
    this.nuevoAlumno = {
      matricula:'',
      nombre:'',
      correo:'',
      materia: ''
    }
    this.indiceEdicion=-1
  }
}
