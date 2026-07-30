import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import {Comment} from '../Comment';
import { Response } from '../Response';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  // URL base da API definida no arquivo environment.ts
  private baseApiUrl = environment.baseApiUrl
  private apiUrl = `${this.baseApiUrl}api/moments`;


  constructor(private http: HttpClient) {}
  
  // Método para criar um novo comentário, recebendo os dados do comentário em um objeto Comment
  createComment(data: Comment): Observable<Response<Comment>> {
    const url = `${this.apiUrl}/${data.moment_id}/comments`; // URL completa da API para criar comentários
    return this.http.post<Response<Comment>>(url, data);
  }
}
