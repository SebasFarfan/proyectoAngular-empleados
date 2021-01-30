import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private firestore: AngularFirestore) { }

  agregarEmpleado(empleado: any): Promise<any> {
    return this.firestore.collection('empleados').add(empleado);
  }

  // método para listar los empleados
  getEmpleados(): Observable<any> {
    return this.firestore.collection('empleados', ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
  }

  // método para eliminar un empleado
  eliminarEmpleado(id: string): Promise<any> {
    return this.firestore.collection('empleados').doc(id).delete();
  }
  // método para obtener información de empleado
  getEmpleado(id: string): Observable<any> {
    return this.firestore.collection('empleados').doc(id).snapshotChanges();
  }

  // método para editar empleado
  actualizarEmpleado(id: string, data: any): Promise<any> {
    return this.firestore.collection('empleados').doc(id).update(data);
  }
}
