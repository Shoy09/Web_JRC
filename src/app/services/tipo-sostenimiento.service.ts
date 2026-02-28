import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { TipoSostenimiento } from '../models/tipo-sostenimiento.model';

@Injectable({
  providedIn: 'root'
})
export class TipoSostenimientoService {

  private baseUrl = 'tipo-sotenimiento';
  private TipoSostenimientoActualizadas = new BehaviorSubject<boolean>(false);

  constructor(private apiService: ApiService) {}

  getTipoSostenimiento(): Observable<TipoSostenimiento[]> {
    return this.apiService.getDatos(`${this.baseUrl}/`);
  }

  getTipoSostenimientoById(id: number): Observable<TipoSostenimiento> {
    return this.apiService.getDatos(`${this.baseUrl}/${id}`);
  }

  createTipoSostenimiento(condicion: TipoSostenimiento): Observable<TipoSostenimiento> {
    return this.apiService.postDatos(`${this.baseUrl}/`, condicion).pipe(
      tap(() => this.TipoSostenimientoActualizadas.next(true))
    );
  }

  updateTipoSostenimiento(id: number, condicion: TipoSostenimiento): Observable<TipoSostenimiento> {
    return this.apiService.putDatos(`${this.baseUrl}/${id}`, condicion).pipe(
      tap(() => this.TipoSostenimientoActualizadas.next(true))
    );
  }

  deleteTipoSostenimiento(id: number): Observable<any> {
    return this.apiService.deleteDatos(`${this.baseUrl}/${id}`).pipe(
      tap(() => this.TipoSostenimientoActualizadas.next(true))
    );
  }

  getTipoSostenimientoActualizadas(): Observable<boolean> {
    return this.TipoSostenimientoActualizadas.asObservable();
  }
}
