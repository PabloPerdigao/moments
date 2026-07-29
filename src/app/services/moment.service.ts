import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Moment } from '../Moment';

import { Response } from '../Response';

import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class MomentService {
  private baseApiUrl = environment.baseApiUrl; // URL base da API definida no arquivo environment.ts
  private apiUrl = `${this.baseApiUrl}api/moments`; // URL completa da API para momentos

  constructor(private http: HttpClient) {} // Injeta o serviço HttpClient para fazer requisições HTTP

  // Método para buscar todos os momentos do backend
  getMoments(): Observable<Response<Moment[]>> {
    return this.http.get<Response<Moment[]>>(this.apiUrl);
  }

  // Método para buscar um momento específico pelo ID
  getMoment(id: number): Observable<Response<Moment>> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Response<Moment>>(url);
  }

  // Método para criar um novo momento, recebendo os dados do momento em um objeto FormData
  createMoment(formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(this.apiUrl, formData);
  }

  // Método para remover um momento específico pelo ID
  removeMoment(id: number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
