import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { OrigenDestino } from '../models/origen-destino.model';

@Injectable({
  providedIn: 'root'
})
export class OrigenDestinoService {

  private baseUrl = 'origen-destino';
  private origenDestinoActualizados = new BehaviorSubject<boolean>(false);

  constructor(private apiService: ApiService) {}

  getOrigenDestino(): Observable<OrigenDestino[]> {
    return this.apiService.getDatos(`${this.baseUrl}/`);
  }

  getOrigenDestinoById(id: number): Observable<OrigenDestino> {
    return this.apiService.getDatos(`${this.baseUrl}/${id}`);
  }

  createOrigenDestino(data: OrigenDestino): Observable<OrigenDestino> {
    return this.apiService.postDatos(`${this.baseUrl}/`, data).pipe(
      tap(() => this.origenDestinoActualizados.next(true))
    );
  }

  updateOrigenDestino(id: number, data: OrigenDestino): Observable<OrigenDestino> {
    return this.apiService.putDatos(`${this.baseUrl}/${id}`, data).pipe(
      tap(() => this.origenDestinoActualizados.next(true))
    );
  }

  deleteOrigenDestino(id: number): Observable<any> {
    return this.apiService.deleteDatos(`${this.baseUrl}/${id}`).pipe(
      tap(() => this.origenDestinoActualizados.next(true))
    );
  }

  getOrigenDestinoActualizados(): Observable<boolean> {
    return this.origenDestinoActualizados.asObservable();
  }
}
