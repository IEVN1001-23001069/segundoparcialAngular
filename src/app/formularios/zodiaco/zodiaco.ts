import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { IZodiaco } from './izodiaco';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-zodiaco',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './zodiaco.html',
  styleUrl: './zodiaco.css'
})
export class Zodiaco implements OnInit {
  formulario!: FormGroup;
  indiceEdicion:number=-1

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
  sexo: string = '';
  imagenSigno: string = '';
  mostrarResultado: boolean = false;

  ngOnInit(): void {
    this.cargarZodiaco()
    this.formulario = new FormGroup({
      nombre: new FormControl(''),
      apPaterno: new FormControl(''),
      apMaterno: new FormControl(''),
      dia: new FormControl(''),
      mes: new FormControl(''),
      anio: new FormControl(''),
      sexo: new FormControl('Masculino'),
    });
  }

  agregarZodiaco():void { 

    const datosGuardados = localStorage.getItem('zodiacos');
    let listaActualizada: IZodiaco[] = datosGuardados ? JSON.parse(datosGuardados) : [];

    if(this.indiceEdicion !== -1){
      listaActualizada[this.indiceEdicion]={
        ...this.nuevoZodiaco
      }
    }else{
      listaActualizada.push({...this.nuevoZodiaco}) //... se conoce como split o metodos de propagación, le dice al script que van a insertarse todas las propiedades que contenga el objeto, para eso primero debemos cargar el local storage ya que quqeremos agregar elementos a la lista, vemos si existe la lista en el local storage y se la insertamos a este elemento
    }
    
    localStorage.setItem(
      'zodiacos',
      JSON.stringify(listaActualizada)
    )
  }

  imprimir(): void {
    if (this.formulario.invalid) {
      return;
    }

    let valores = this.formulario.value;

    if(
      !valores.nombre || 
      !valores.apPaterno || 
      !valores.apMaterno || 
      !valores.dia || 
      !valores.mes || 
      !valores.anio || 
      !valores.sexo
    ){
      alert('Todos los campos son obligatorios');
      return;
    }

    this.nombreCompleto = `${valores.nombre} ${valores.apPaterno} ${valores.apMaterno}`;

    let hoy = new Date();
    let anioNacimiento = Number(valores.anio);
    let mesNacimiento = Number(valores.mes);
    let diaNacimiento = Number(valores.dia);

    let calculoEdad = hoy.getFullYear() - anioNacimiento;
    let mesActual = hoy.getMonth() + 1;
    let diaActual = hoy.getDate();

    if (mesActual < mesNacimiento || (mesActual === mesNacimiento && diaActual < diaNacimiento)) {
      calculoEdad--;
    }
    this.edad = calculoEdad;

    let sexo = valores.sexo
    this.sexo = sexo

    let ciclo = (anioNacimiento - 1900) % 12;

    switch (ciclo) {
      case 0:
        this.signo = 'rata';
        this.imagenSigno = 'https://i.pinimg.com/736x/68/e5/9a/68e59a1c468535b290f4c04deb13f022.jpg';
        break;
      case 1:
        this.signo = 'buey';
        this.imagenSigno = 'https://i.pinimg.com/736x/c4/e7/c5/c4e7c5d604becc1bfd2326ec1eb95f0e.jpg';
        break;
      case 2:
        this.signo = 'tigre';
        this.imagenSigno = 'https://i.pinimg.com/736x/75/3d/58/753d5868916a9843e657bbe5b750b80f.jpg';
        break;
      case 3:
        this.signo = 'conejo';
        this.imagenSigno = 'https://i.pinimg.com/736x/d0/e9/0e/d0e90e6c39ee80604ab1bb8a6be232e8.jpg';
        break;
      case 4:
        this.signo = 'dragón';
        this.imagenSigno = 'https://i.pinimg.com/736x/a8/c9/7b/a8c97b91b8872f3d60dacf78eecd22e9.jpg';
        break;
      case 5:
        this.signo = 'serpiente';
        this.imagenSigno = 'https://i.pinimg.com/736x/8b/89/41/8b8941155ae9c9bdfaf71cf60bd33eae.jpg';
        break;
      case 6:
        this.signo = 'caballo';
        this.imagenSigno = 'https://i.pinimg.com/736x/b1/c1/0f/b1c10f679f76d3b4dadd7c7674fd7fc0.jpg';
        break;
      case 7:
        this.signo = 'cabra';
        this.imagenSigno = 'https://i.pinimg.com/736x/94/5a/ac/945aacf720f048f5c5c38cc58681b145.jpg';
        break;
      case 8:
        this.signo = 'mono';
        this.imagenSigno = 'https://i.pinimg.com/736x/c7/68/c3/c768c35917ae0aec54a39caa50ff6a54.jpg';
        break;
      case 9:
        this.signo = 'gallo';
        this.imagenSigno = 'https://i.pinimg.com/736x/07/7b/36/077b36e4d1ae97929ab8bd970e864466.jpg';
        break;
      case 10:
        this.signo = 'perro';
        this.imagenSigno = 'https://i.pinimg.com/736x/a1/2c/f2/a12cf227a56ac11174c03f2415408cd0.jpg';
        break;
      case 11:
        this.signo = 'cerdo';
        this.imagenSigno = 'https://i.pinimg.com/736x/c1/63/b2/c163b28ed602fe488afd74ad0977505e.jpg';
        break;
      default:
        this.signo = '';
        this.imagenSigno = '';
    }

    this.mostrarResultado = true;


    this.nuevoZodiaco.nombreCompleto = this.nombreCompleto;
    this.nuevoZodiaco.edad = this.edad;
    this.nuevoZodiaco.signo = this.signo;
    this.nuevoZodiaco.sexo = valores.sexo;
    
    this.agregarZodiaco()
    this.limpiarCampos()
  }


  cargarZodiaco(): void{
    const datos = localStorage.getItem('zodiacos'); //Cargamos los elementos a la lista que encontramos en el localStorage

    if(datos){
      this.zodiacos = JSON.parse(datos) //Transforma los datos 
    }
  }


  limpiarCampos():void{
    this.formulario.reset();
    this.nuevoZodiaco = {
      nombreCompleto: '',
      edad: 0,
      signo: '',
      sexo: ''
    }
    this.indiceEdicion=-1
  }
}