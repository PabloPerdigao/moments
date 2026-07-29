import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { Moment } from 'src/app/Moment';

import { MomentService } from 'src/app/services/moment.service';

import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css'],
})
export class NewMomentComponent implements OnInit {
  btnText = 'Compartilhar!';

  constructor(
    private momentService: MomentService,
    private messagesService: MessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  async createHandler(moment: Moment) {
    const formData = new FormData(); // Cria um objeto FormData para enviar os dados do momento

    formData.append('title', moment.title);
    formData.append('description', moment.description);

    if (moment.image) {
      formData.append('image', moment.image);
    }

    // Chama o serviço para criar o momento e aguarda a resposta
    await this.momentService.createMoment(formData).subscribe();

    // Exibe uma mensagem de sucesso usando o serviço de mensagens
    this.messagesService.add('Momento adiconado com sucesso!');

    // Redireciona para a página inicial após 1 segundo
    this.router.navigate(['/']);
  }
}
