import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
} from '@angular/forms';

import { MomentService } from '../../../services/moment.service';
import { MessagesService } from '../../../services/messages.service';
import { CommentService } from '../../../services/comment.service';

import { Moment } from '../../../Moment';

import { Comment } from '../../../Comment';

import { environment } from 'src/environments/environment';

import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css'],
})
export class MomentComponent implements OnInit {
  moment?: Moment;
  baseApiUrl = environment.baseApiUrl; // URL base da API definida no arquivo environment.ts

  faTimes = faTimes;
  faEdit = faEdit;

  commentForm!: FormGroup;

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); // Obtém o ID do momento a partir da rota

    // Chama o serviço para buscar o momento pelo ID e atualiza a propriedade 'moment' com os dados recebidos
    this.momentService
      .getMoment(id)
      .subscribe((item) => (this.moment = item.data));

    // Inicializa o formulário de comentários com validação para os campos 'text' e 'username'
    this.commentForm = new FormGroup({
      text: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required])
    });
  }

  // Método para enviar um comentário
  get text() {
    return this.commentForm.get('text')!;
  }

  // Método para enviar um comentário
  get username() {
    return this.commentForm.get('username')!;
  }

  // Método para remover um momento específico pelo ID
  async removeHandler(id: number) {
    // Chama o serviço para remover o momento pelo ID e exibe uma mensagem de sucesso
    await this.momentService.removeMoment(id).subscribe();
    this.messagesService.add('Momento excluído com sucesso!');

    this.router.navigate(['/']);
  }

  // Método para enviar um comentário
  async onSubmit(formDirective: FormGroupDirective) {
    if (this.commentForm.invalid) {
      return;
    }

    const data: Comment = this.commentForm.value; // Obtém os dados do formulário de comentário

    data.moment_id = Number(this.moment!.id);

    // Chama o serviço para criar um novo comentário e adiciona o comentário à lista de comentários do momento
    await this.commentService
      .createComment(data)
      .subscribe((comment) => this.moment!.comments!.push(comment.data));
    
        this.messagesService.add('Comentário adicionado!')

        this.commentForm.reset();

        formDirective.resetForm();
    }
}
