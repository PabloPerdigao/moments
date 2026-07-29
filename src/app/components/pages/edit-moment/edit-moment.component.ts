import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Moment } from '../../../Moment';
import { MomentService } from '../../../services/moment.service';

@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.css'],
})
export class EditMomentComponent implements OnInit {
  moment!: Moment;
  btnText: string = 'Editar';

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Obtém o ID do momento a partir da rota
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Chama o serviço para buscar o momento pelo ID e atualiza a propriedade 'moment' com os dados recebidos
    this.momentService.getMoment(id).subscribe((item) => {
      this.moment = item.data;
    });
  }
}
