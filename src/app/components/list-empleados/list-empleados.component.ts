import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { faEdit, faPlus, faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';
import { Observable } from 'rxjs';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit {

  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faPlus = faPlus;
  loading = false;

  empleados: any[] = [];

  constructor(private _empleadoService: EmpleadoService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getEmpleados();
  }

  getEmpleados() {
    this.loading = true;
    this._empleadoService.getEmpleados().subscribe(data => {
      this.empleados = [];
      data.forEach((element: any) => {
        // console.log(element.payload.doc.id);
        // console.log(element.payload.doc.data());
        this.empleados.push({
          id: element.payload.doc.id, ...element.payload.doc.data()
        });
      });
      this.loading = false;
      console.log(this.empleados);
    });
  }

  eliminarEmpleado(id:string){
    this._empleadoService.eliminarEmpleado(id).then(()=>{
      console.log('Empleado eliminado con exito');
      this.toastr.error('Empleado eliminado con exito', 'Empleado eliminado', {positionClass:'toast-bottom-right'});
    }).catch(error => {
      console.log(error);
    })
  }

}
