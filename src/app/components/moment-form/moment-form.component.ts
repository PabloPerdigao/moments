import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Moment } from 'src/app/Moment';
@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.css']
})
export class MomentFormComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<Moment>();
  @Input() btnText!: string;

  momentForm !: FormGroup;

  constructor() { }

  // inicializa o formulário com os campos necessários
  ngOnInit(): void { 
    this.momentForm = new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl('')
    });
  }

  // retorna o valor do campo title do formulário
  get title() {
    return this.momentForm.get('title')!;
  }
  // retorna o valor do campo description do formulário
  get description() {
    return this.momentForm.get('description')!;
  }

  onFileSelected(event:any) {
    const file: File = event.target.files[0];
    this.momentForm.patchValue({image: file});
  }

  submit() {
    if(this.momentForm.invalid) {
      return;
    }
    console.log(this.momentForm.value);

    this.onSubmit.emit(this.momentForm.value);
  }

}
