import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { IZodiaco } from '../formularios/zodiaco/izodiaco';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-lista-zodiaco',
  styleUrl: './lista-zodiaco.css',
  templateUrl: './lista-zodiaco.html',
})
export class ListaZodiaco implements OnInit { 
  formulario!: FormGroup;
  indiceEdicion:number=-1
  mostrarModal: boolean = false;

  zodiacos:IZodiaco[]=[]
  nuevoZodiaco:IZodiaco={//La lista 
    nombreCompleto: '',
    edad: 0,
    signo: '',
    sexo: ''
  }

  nombreCompleto: string = '';
  edad: number = 0;
  signo: string = '';
  imagenSigno: string = '';
  mostrarResultado: boolean = false;

  ngOnInit(): void {
    this.cargarZodiaco()
    this.formulario = new FormGroup({
      nombreCompleto: new FormControl(''),
      edad: new FormControl(''),
      signo: new FormControl(''),
      sexo: new FormControl(''),
    });
  }



  cargarZodiaco(): void{
    const datos = localStorage.getItem('zodiacos'); //Cargamos los elementos a la lista que encontramos en el localStorage

    if(datos){
      this.zodiacos = JSON.parse(datos) //Transforma los datos 
    }
  }

  editarZodiacos(index:number):void{//Contiene un parametro de tipo númerico index para identificar donde se encuentra cada elemento de la lista 
    this.nuevoZodiaco={
      ...this.zodiacos[index] //de la lista solo seleccionamos un elemento que cumpla con la posición deseada, se hace un split del elemento
    }
    const zodiaco=this.zodiacos[index] //vamos a pasar los valores a la const alumno
    this.formulario.patchValue({ // formulario se refiere a todos los elementos del formGroup, patchValue permite subir los valores del Backend al Frontend 
      nombreCompleto: zodiaco.nombreCompleto,
      edad: zodiaco.edad,
      signo: zodiaco.signo,
      sexo: zodiaco.sexo
    })

    this.indiceEdicion=index //Como es un valor particular entrara al else de agregar alumno 
    this.mostrarModal = true;
  }

  eliminarZodiaco(index:number):void{//tambien recibe un indice
    this.zodiacos.splice(index,1)//Splice recorre el elemento y lo elimina 
    localStorage.setItem(
      'zodiacos',
      JSON.stringify(this.zodiacos)
    )
  }


  guardarEdicionModal(): void {
    this.nuevoZodiaco.nombreCompleto = this.formulario.value.nombreCompleto;
    this.nuevoZodiaco.edad = this.formulario.value.edad;
    this.nuevoZodiaco.signo = this.formulario.value.signo;
    this.nuevoZodiaco.sexo = this.formulario.value.sexo;

    if(this.indiceEdicion !== -1) {
      this.zodiacos[this.indiceEdicion] = { ...this.nuevoZodiaco };
    }

    localStorage.setItem('zodiacos', JSON.stringify(this.zodiacos));

    this.mostrarModal = false;
    this.indiceEdicion = -1;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.indiceEdicion = -1;
  }
}
