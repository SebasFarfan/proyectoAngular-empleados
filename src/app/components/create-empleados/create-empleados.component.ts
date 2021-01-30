import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-create-empleados',
  templateUrl: './create-empleados.component.html',
  styleUrls: ['./create-empleados.component.css']
})
export class CreateEmpleadosComponent implements OnInit {

  createEmpleado: FormGroup;
  submitted = false;

  loading: boolean = false;
  id: string | null;
  titulo: string = "Agregar Empleado";
  nombreBoton:string = "Agregar";

  constructor(private fb: FormBuilder, private _empleadoService: EmpleadoService, private router: Router, private toastr: ToastrService, private aRoute: ActivatedRoute) {
    this.createEmpleado = fb.group({
      apellido: ['', Validators.required],
      nombre: ['', Validators.required],
      dni: ['', Validators.required],
      salario: ['', Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id);
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarEditarEmpleado() {
    this.submitted = true;
    if (this.createEmpleado.invalid) {
      return;
    }
    if (this.id === null) {
      this.agregarEmpleado();
    } else {
      this.editarEmpleado(this.id);
    }
  }
  agregarEmpleado() {
    const empleado: any = {
      apellido: this.createEmpleado.value.apellido,
      nombre: this.createEmpleado.value.nombre,
      dni: this.createEmpleado.value.dni,
      salario: this.createEmpleado.value.salario,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }

    this.loading = true;
    this._empleadoService.agregarEmpleado(empleado).then(() => {
      // console.log('Empleado registrado con exito');
      this.loading = false;
      this.toastr.success("Empleado agregado con exito!", "Empleado registrado", { positionClass: 'toast-bottom-right' });
      this.router.navigate(['/list-empleados'])
    }).catch(error => {
      console.log('error');
    })
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Empleado';
      this.nombreBoton = 'Actualizar';
      this.loading = true;
      this._empleadoService.getEmpleado(this.id).subscribe(data => {
        this.loading = false;
        console.log(data.payload.data()['apellido']);
        this.createEmpleado.setValue({
          apellido: data.payload.data()['apellido'],
          nombre: data.payload.data()['nombre'],
          dni: data.payload.data()['dni'],
          salario: data.payload.data()['salario']
        });
      })
    }
  }

  editarEmpleado(id: string) {
    const empleado: any = {
      apellido: this.createEmpleado.value.apellido,
      nombre: this.createEmpleado.value.nombre,
      dni: this.createEmpleado.value.dni,
      salario: this.createEmpleado.value.salario,
      fechaActualizacion: new Date()
    }
    this.loading = true;
    this._empleadoService.actualizarEmpleado(id, empleado).then(() => {
      this.loading = false;
      this.toastr.info('El empleado fue modificado con exito!', 'Empleado modificado', {positionClass:'toast-bottom-right'});
      this.router.navigate(['/list-empleados']);
    })

  }

}
