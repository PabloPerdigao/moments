import { Component, Input, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.css']
})
export class MomentFormComponent implements OnInit {

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

  submit() {
    if(this.momentForm.invalid) {
      return;
    }
    console.log('submit');
  }

}
