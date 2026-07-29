import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MomentService } from '../../../services/moment.service';
import { MessagesService } from '../../../services/messages.service';
import { Moment } from '../../../Moment';


import { environment } from 'src/environments/environment';

import { faTimes, faEdit} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css'],
})
export class MomentComponent implements OnInit {
  moment?: Moment;
  baseApiUrl = environment.baseApiUrl; // URL base da API definida no arquivo environment.ts

  faEdit = faEdit;
  faTimes = faTimes;

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); // Obtém o ID do momento a partir da rota

    // Chama o serviço para buscar o momento pelo ID e atualiza a propriedade 'moment' com os dados recebidos
    this.momentService
      .getMoment(id)
      .subscribe((item) => (this.moment = item.data));
  }

  // Método para remover um momento específico pelo ID
  async removeHandler(id:number) {
    // Chama o serviço para remover o momento pelo ID e exibe uma mensagem de sucesso
    await this.momentService.removeMoment(id).subscribe();
    this.messagesService.add("Momento excluído com sucesso!");

    this.router.navigate(['/']);
  }
}
