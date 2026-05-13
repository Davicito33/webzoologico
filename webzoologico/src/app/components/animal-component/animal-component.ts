import { ChangeDetectorRef, Component } from '@angular/core';
import { AnimalService } from '../../services/animal-service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';

@Component({
  selector: 'app-animal-component',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './animal-component.html',
  styleUrl: './animal-component.css',
})

export class AnimalComponent {

  animalForm: FormGroup | any;
  animalList: any = [];

  constructor(
    private animalService: AnimalService,
    private cd: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService

  ) { }
  idAnimal: any;
  editableAnimal: boolean = false;
  ngOnInit() {
    this.animalForm = this.formBuilder.group({
      nombre: '',
      edad: 0,
      tipo: ''
    });

    this.getAllAnimals();
  }

  getAllAnimals() {
    this.animalService.getAllAnimalsData().subscribe((data: {}) => {
      this.animalList = data;
      console.log(this.animalList);
      this.cd.detectChanges();
    });
  }

  ngOnChanges() {
    this.getAllAnimals();
  }

  newMessage(messageText: string) {
    this.toastr.success(
      'Clic aquí para actualizar la lista',
      messageText
    )
      .onTap
      .pipe(take(1))
      .subscribe(() => window.location.reload());
  }

  newAnimalEntry() {
    this.animalService.newAnimal(this.animalForm.value).subscribe(() => {
      this.router.navigate(['/inicio'])
        .then(() => {
          this.newMessage('Registro exitoso');
        });
    });
  }
  updateAnimalEntry() {
    //Removiendo valores vacios del formulario de actualización
    for (let key in this.animalForm.value) {
      if (this.animalForm.value[key] === '') {
        this.animalForm.removeControl(key);
      }
    }
    this.animalService.updateAnimal(this.idAnimal, this.animalForm.value).subscribe(
      () => {
        //Enviando mensaje de confirmación
        this.newMessage("Animal editado");
      }
    );
  }
  toggleEditAnimal(id: any) {
    this.idAnimal = id;
    console.log(this.idAnimal)
    this.animalService.getOneAnimal(id).subscribe(
      data => {
        this.animalForm.setValue({
          nombre: data.nombre,
          edad: data.edad,
          tipo: data.tipo,
        });
      }
    );
    this.editableAnimal = !this.editableAnimal;
  }
  deleteAnimalEntry(id: any) {
    console.log(id)
    this.animalService.deleteAnimal(id).subscribe(
      () => {
        //Enviando mensaje de confirmación
        this.newMessage("Animal eliminado");
      }
    );
  }

  

}