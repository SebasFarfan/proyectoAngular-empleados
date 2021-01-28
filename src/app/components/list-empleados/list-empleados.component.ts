import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { faEdit, faPlus, faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit {

  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faPlus = faPlus;

  

  constructor() { 
    
  }

  ngOnInit(): void {
  }

}
