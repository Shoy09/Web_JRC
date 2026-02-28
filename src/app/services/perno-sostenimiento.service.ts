import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { PernoSostenimiento } from '../models/perno-sostenimiento.model';

@Injectable({
  providedIn: 'root'
})
export class PernoSostenimientoService {

  private baseUrl = 'pernos-sostenimiento';

  private pernosActualizados = new BehaviorSubject<boolean>(false);

  constructor(private apiService: ApiService) {}



  // 🔹 Obtener todos
  getPernos(): Observable<PernoSostenimiento[]> {
    return this.apiService.getDatos(`${this.baseUrl}/`);
  }



  // 🔹 Obtener por ID
  getPernoById(id: number): Observable<PernoSostenimiento> {
    return this.apiService.getDatos(`${this.baseUrl}/${id}`);
  }



  // 🔹 Crear
  createPerno(perno: PernoSostenimiento): Observable<PernoSostenimiento> {
    return this.apiService.postDatos(`${this.baseUrl}/`, perno).pipe(
      tap(() => this.pernosActualizados.next(true))
    );
  }



  // 🔹 Actualizar
  updatePerno(id: number, perno: PernoSostenimiento): Observable<PernoSostenimiento> {
    return this.apiService.putDatos(`${this.baseUrl}/${id}`, perno).pipe(
      tap(() => this.pernosActualizados.next(true))
    );
  }



  // 🔹 Eliminar
  deletePerno(id: number): Observable<any> {
    return this.apiService.deleteDatos(`${this.baseUrl}/${id}`).pipe(
      tap(() => this.pernosActualizados.next(true))
    );
  }



  // 🔹 Observable para refrescar listas
  getPernosActualizados(): Observable<boolean> {
    return this.pernosActualizados.asObservable();
  }

}
