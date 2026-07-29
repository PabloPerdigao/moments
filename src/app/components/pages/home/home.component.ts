import { Component, OnInit } from '@angular/core';

import { MomentService } from '../../../services/moment.service';

import { Moment } from '../../../Moment';

import { environment } from '../../../../environments/environment';

import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  allMoments: Moment[] = []; // pegar todos os momentos do backend
  moments: Moment[] = []; // moments filtrados
  baseApiUrl = environment.baseApiUrl;

  faSearch = faSearch; // ícone de pesquisa
  searchTerm: string = ''; // termo de pesquisa

  constructor(private momentService: MomentService) {}

  ngOnInit(): void {
    // Chamada do serviço para buscar todos os momentos do backend
    this.momentService.getMomments().subscribe((items) => {
      const data = items.data;

      // Formata a data de criação de cada momento para o formato local 'pt-BR'
      data.map((item) => {
        item.created_at = new Date(item.created_at!).toLocaleDateString(
          'pt-BR',
        );
      });

      // Atribui os momentos formatados às variáveis
      this.allMoments = data;
      this.moments = data;
    });
  }

  // Função de pesquisa 
  search(e: Event): void {
    const target = e.target as HTMLInputElement // Converte o evento para um elemento de entrada HTML
    const value = target.value; // Obtém o valor do campo de entrada

    // Filtra os momentos com base no termo de pesquisa, ignorando maiúsculas e minúsculas
    this.moments = this.allMoments.filter(moment => {
      return moment.title.toLowerCase().includes(value);
    });
  } 

  
}
