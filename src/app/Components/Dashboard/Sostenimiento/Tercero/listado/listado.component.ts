import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegistroLaborService } from '../../../../../services/registro-labor.service';
import { RegistroLabor } from '../../../../../models/registro-labor.model';

@Component({
  selector: 'app-listado',
  imports: [CommonModule, FormsModule],
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css'
})
export class ListadoComponent3 implements OnInit {

  registros: RegistroLabor[] = [];
  loading = true;

  constructor(
    private registroService: RegistroLaborService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarRegistros();
  }

  cargarRegistros(): void {
    this.loading = true;

    this.registroService.getPorEtapa(3).subscribe({
      next: (data) => {
        this.registros = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar etapa 3:', err);
        this.loading = false;
      }
    });
  }

  verDetalle(item: RegistroLabor): void {
    this.router.navigate(
      ['/Dashboard/sostenimiento-formulario-3'],
      { state: { registro: item } }
    );
  }
}