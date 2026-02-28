import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Espesor } from '../models/espesor.model';

@Injectable({
  providedIn: 'root'
})
export class EspesorService {

  private baseUrl = 'espesores';
  private espesoresActualizados = new BehaviorSubject<boolean>(false);

  constructor(private apiService: ApiService) {}

  getEspesores(): Observable<Espesor[]> {
    return this.apiService.getDatos(`${this.baseUrl}/`);
  }

  getEspesorById(id: number): Observable<Espesor> {
    return this.apiService.getDatos(`${this.baseUrl}/${id}`);
  }

  createEspesor(espesor: Espesor): Observable<Espesor> {
    return this.apiService.postDatos(`${this.baseUrl}/`, espesor).pipe(
      tap(() => this.espesoresActualizados.next(true))
    );
  }

  updateEspesor(id: number, espesor: Espesor): Observable<Espesor> {
    return this.apiService.putDatos(`${this.baseUrl}/${id}`, espesor).pipe(
      tap(() => this.espesoresActualizados.next(true))
    );
  }

  deleteEspesor(id: number): Observable<any> {
    return this.apiService.deleteDatos(`${this.baseUrl}/${id}`).pipe(
      tap(() => this.espesoresActualizados.next(true))
    );
  }

  getEspesoresActualizados(): Observable<boolean> {
    return this.espesoresActualizados.asObservable();
  }
}
