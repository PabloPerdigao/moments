import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Moment } from '../../../Moment';
import { MomentService } from '../../../services/moment.service';
import {MessagesService} from '../../../services/messages.service';

@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.css'],
})
export class EditMomentComponent implements OnInit {
  // Propriedade para armazenar os dados do momento a ser editado
  moment!: Moment;
  btnText: string = 'Editar';

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private messageService: MessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtém o ID do momento a partir da rota
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Chama o serviço para buscar o momento pelo ID e atualiza a propriedade 'moment' com os dados recebidos
    this.momentService.getMoment(id).subscribe((item) => {
      this.moment = item.data;
    });
  }

  // Método para lidar com a edição do momento
  async editHandler(momentData: Moment) {
    const id = this.moment.id;
    const formData = new FormData();

    // Adiciona os dados do momento ao objeto FormData para envio ao backend
    formData.append('title', momentData.title)
    formData.append('description', momentData.description)

    if (momentData.image) {
      formData.append('image', momentData.image);
    }

    await this.momentService.updatemoment(id!, formData).subscribe();

    // Exibe uma mensagem de sucesso após a atualização do momento
    this.messageService.add(`Momento ${id} foi atualziado com sucesso!`);

    this.router.navigate(['/']);

  }
}
