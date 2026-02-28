import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import { CondicionLaborService } from '../../../services/condicion-labor.service';
import { MatIcon } from "@angular/material/icon";
import { TipoSostenimientoService } from '../../../services/tipo-sostenimiento.service';
import { EspesorService } from '../../../services/espesor.service';
import { RocaService } from '../../../services/roca.service';
import { PernoSostenimientoService } from '../../../services/perno-sostenimiento.service';

@Component({
  selector: 'app-sostenimiento',
  imports: [FormsModule, CommonModule, MatIcon],
  templateUrl: './sostenimiento.component.html',
  styleUrl: './sostenimiento.component.css'
})
export class SostenimientoComponent implements OnInit {
  modalAbierto = false;
  modalContenido: any = null;
  nuevoDato: any = {}
  formularioActivo: string = 'botones';  

  editando: boolean = false;
indiceEditando: number = -1;
datoOriginal: any = null;


  constructor(
    private condicionLaborService: CondicionLaborService,
    private tiposostenimientoService: TipoSostenimientoService,
    private espesorService: EspesorService,
    private rocaService: RocaService,
    private pernoService: PernoSostenimientoService,
    public dialog: MatDialog
  ) {} // Inyecta los servicios

  ngOnInit() {
  }

  mostrarFormulario(formulario: string): void {
    this.formularioActivo = formulario;
  }

  buttonc = [
{
  nombre: 'Condiciones Labor',
  icon: 'mas.svg',
  tipo: 'Condiciones Labor',
  datos: [],
  campos: [
    { nombre: 'nombre', label: 'Nombre', tipo: 'text' }
  ]
},
{
  nombre: 'Tipos de sostenimiento',
  icon: 'mas.svg',
  tipo: 'Tipos de sostenimiento',
  datos: [],
  campos: [
    { nombre: 'nombre', label: 'Nombre', tipo: 'text' }
  ]
},
{
    nombre: 'Espesores',
    icon: 'mas.svg',
    tipo: 'Espesores',
    datos: [],
    campos: [
      {
        nombre: 'espesor',
        label: 'Espesor',
        tipo: 'number',
        step: '0.01' // permite decimales
      }
    ]
  },
  {
    nombre: 'Rocas',
    icon: 'mas.svg',
    tipo: 'Rocas',
    datos: [],
    campos: [
      { nombre: 'nombre', label: 'Nombre', tipo: 'text' }
    ]
  },
  {
    nombre: 'Pernos de sostenimiento',
    icon: 'mas.svg',
    tipo: 'Pernos de sostenimiento',
    datos: [],
    campos: [
      { nombre: 'nombre', label: 'Nombre', tipo: 'text' },
      { nombre: 'longitud', label: 'Longitud', tipo: 'text' }
    ]
  }
    
  ];  

  cerrarModal() {
    this.modalAbierto = false;
    this.modalContenido = null;
  }

  triggerFileInput() {
    // Simula el clic en el input de archivo cuando se hace clic en el botón "Importar Excel"
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }
  
  importarExcel() {
    if (this.modalContenido) {
      this.cargarExcel(this.modalContenido.nombre);
    } else {
      
    }
  }

  editarDato(dato: any, index: number) {
  this.editando = true;
  this.indiceEditando = index;
  this.datoOriginal = {...dato};
  
  // Clonamos el dato para editarlo
  this.nuevoDato = {...dato};
}

// Función para actualizar un registro
actualizarDatos() {
  if (Object.values(this.nuevoDato).some(val => val !== '')) {
    const datosActualizados = {...this.nuevoDato};
    const id = this.modalContenido.datos[this.indiceEditando].id;

    if (this.modalContenido.tipo === 'Condiciones Labor') {
      this.condicionLaborService.updateCondicionLabor(id, datosActualizados).subscribe({
        next: (data) => {
          this.modalContenido.datos[this.indiceEditando] = data;
          this.cancelarEdicion();
        },
        error: (err) => console.error('Error al actualizar:', err)
      });
    } else if (this.modalContenido.tipo === 'Tipos de sostenimiento') {
      this.tiposostenimientoService.updateTipoSostenimiento(id, datosActualizados).subscribe({
        next: (data) => {
          this.modalContenido.datos[this.indiceEditando] = data;
          this.cancelarEdicion();
        },
        error: (err) => console.error('Error al actualizar:', err)
      });
    }else if (this.modalContenido.tipo === 'Espesores') {
  this.espesorService.updateEspesor(id, datosActualizados).subscribe({
    next: (data) => {
      this.modalContenido.datos[this.indiceEditando] = data;
      this.cancelarEdicion();
    },
    error: (err) => console.error('Error al actualizar Espesor:', err)
  });
}else if (this.modalContenido.tipo === 'Rocas') {
  this.rocaService.updateRoca(id, datosActualizados).subscribe({
    next: (data) => {
      this.modalContenido.datos[this.indiceEditando] = data;
      this.cancelarEdicion();
    },
    error: (err) => console.error('Error al actualizar Roca:', err)
  });
}else if (this.modalContenido.tipo === 'Pernos de sostenimiento') {
  this.pernoService.updatePerno(id, datosActualizados).subscribe({
    next: (data) => {
      this.modalContenido.datos[this.indiceEditando] = data;
      this.cancelarEdicion();
    },
    error: (err) => console.error('Error al actualizar Perno:', err)
  });
}

  }
}


// Función para cancelar la edición
cancelarEdicion() {
  this.editando = false;
  this.indiceEditando = -1;
  this.nuevoDato = {};
  this.datoOriginal = null;
}

cargarExcel(nombre: string) {
  if (nombre === 'Condiciones Labor' || nombre === 'Toneladas') {
    this.triggerFileInput(); // Activa la selección de archivo
  } else {
    console.warn('Importación de Excel no implementada para:', nombre);
  }
}

  procesarArchivoExcel(event: any) {
  const file = event.target.files[0];
  if (!file) return;

  // Determinar qué función de procesamiento usar basado en el contenido del modal
  if (this.modalContenido) {
    // switch (this.modalContenido.nombre) {
    //   case 'Condiciones Labor':
    //     this.procesarExcelCondiciones Labor(event);
    //     break;
    //   default:
    //     console.warn('No hay procesador definido para:', this.modalContenido.nombre);
    //     break;
    // }
  }

  // Limpiar el input file para permitir subir el mismo archivo otra vez
  event.target.value = '';
}

private buscarHojaExcel(workbook: any, nombresPosibles: string[]): string {
  // Buscar por nombres exactos primero
  for (const nombre of nombresPosibles) {
    if (workbook.SheetNames.includes(nombre)) {
      return nombre;
    }
  }
  
  // Buscar por nombres que contengan las palabras (case insensitive)
  const nombresDisponibles = workbook.SheetNames;
  for (const nombreBuscado of nombresPosibles) {
    const hojaEncontrada = nombresDisponibles.find((nombreHoja: string) => 
      nombreHoja.toLowerCase().includes(nombreBuscado.toLowerCase())
    );
    if (hojaEncontrada) {
      return hojaEncontrada;
    }
  }
  
  // Si no encuentra ninguna, devolver la primera hoja como fallback
  console.warn('No se encontró ninguna hoja con los nombres:', nombresPosibles, 'usando primera hoja');
  return workbook.SheetNames[0];
}

  
  abrirModal(button: any) {
    this.modalAbierto = true;
    this.modalContenido = button;
  
    if (button.tipo === 'Condiciones Labor') {
      this.condicionLaborService.getCondicionesLabor().subscribe({
        next: (data) => {
          this.modalContenido.datos = data; // Asigna los datos recibidos
          
        },
        error: (err) => console.error('Error al cargar Condiciones Labor:', err)
      });
    } else if (button.tipo === 'Tipos de sostenimiento') {
      this.tiposostenimientoService.getTipoSostenimiento().subscribe({
        next: (data) => {
          this.modalContenido.datos = data; // Asigna los datos recibidos
          
        },
        error: (err) => console.error('Error al cargar Condiciones Labor:', err)
      });
    } else if (button.tipo === 'Espesores') {
  this.espesorService.getEspesores().subscribe({
    next: (data) => {
      this.modalContenido.datos = data;
    },
    error: (err) => console.error('Error al cargar Espesores:', err)
  });
}else if (button.tipo === 'Rocas') {
  this.rocaService.getRocas().subscribe({
    next: (data) => {
      this.modalContenido.datos = data;
    },
    error: (err) => console.error('Error al cargar Rocas:', err)
  });
}else if (button.tipo === 'Pernos de sostenimiento') {
  this.pernoService.getPernos().subscribe({
    next: (data) => {
      this.modalContenido.datos = data;
    },
    error: (err) => console.error('Error al cargar Pernos:', err)
  });
}


  }

  onCampoChange(nombreCampo: string) {
  // Solo actuamos si el campo modificado es 'proceso'
  // if (nombreCampo === 'proceso' && this.modalContenido.tipo === 'Acero') {
  //   const procesoSeleccionado = this.nuevoDato['proceso'];

  //   // Filtrar tipos de acero que pertenecen a ese proceso
  //   const tiposFiltrados = this.tiposAceroData
  //     .filter(t => t.proceso === procesoSeleccionado)
  //     .map(t => t.tipo_acero);

  //   // Actualizar dinámicamente el select de tipo_acero
  //   const campoTipoAcero = this.modalContenido.campos.find((c: { nombre: string; }) => c.nombre === 'tipo_acero');
  //   if (campoTipoAcero) {
  //     campoTipoAcero.opciones = tiposFiltrados;
  //   }

  //   // Limpiar selección previa
  //   this.nuevoDato['tipo_acero'] = '';
  // }
}


  guardarDatos() {
  if (Object.values(this.nuevoDato).some(val => val !== '')) {

    const nuevoRegistro = { ...this.nuevoDato };

    // 👇 AQUÍ ves lo que se envía
    

    if (this.modalContenido.tipo === 'Condiciones Labor') {
      this.condicionLaborService.createCondicionLabor(nuevoRegistro).subscribe({
        next: (data) => {
          console.log('📤 Enviando a backend:', nuevoRegistro);
          this.modalContenido.datos.push(data);
          console.log('✅ Respuesta del backend:', data);
        },
        error: (err) => {
          console.error('❌ Error al guardar Condiciones Labor:', err);
          console.error('❌ Payload enviado:', nuevoRegistro);
        }
      });
    } else if(this.modalContenido.tipo === 'Tipos de sostenimiento') {
      this.tiposostenimientoService.createTipoSostenimiento(nuevoRegistro).subscribe({
        next: (data) => {
          console.log('📤 Enviando a backend:', nuevoRegistro);
          this.modalContenido.datos.push(data);
          console.log('✅ Respuesta del backend:', data);
        },
        error: (err) => {
          console.error('❌ Error al guardar Condiciones Labor:', err);
          console.error('❌ Payload enviado:', nuevoRegistro);
        }
      });
    }else if (this.modalContenido.tipo === 'Espesores') {
  this.espesorService.createEspesor(nuevoRegistro).subscribe({
    next: (data) => {
      console.log('📤 Enviando a backend:', nuevoRegistro);
      this.modalContenido.datos.push(data);
      console.log('✅ Respuesta del backend:', data);
    },
    error: (err) => {
      console.error('❌ Error al guardar Espesor:', err);
      console.error('❌ Payload enviado:', nuevoRegistro);
    }
  });
}else if (this.modalContenido.tipo === 'Rocas') {
  this.rocaService.createRoca(nuevoRegistro).subscribe({
    next: (data) => {
      console.log('📤 Enviando a backend:', nuevoRegistro);
      this.modalContenido.datos.push(data);
      console.log('✅ Respuesta del backend:', data);
    },
    error: (err) => {
      console.error('❌ Error al guardar Roca:', err);
      console.error('❌ Payload enviado:', nuevoRegistro);
    }
  });
}else if (this.modalContenido.tipo === 'Pernos de sostenimiento') {
  this.pernoService.createPerno(nuevoRegistro).subscribe({
    next: (data) => {
      console.log('📤 Enviando a backend:', nuevoRegistro);
      this.modalContenido.datos.push(data);
      console.log('✅ Respuesta del backend:', data);
    },
    error: (err) => {
      console.error('❌ Error al guardar Perno:', err);
      console.error('❌ Payload enviado:', nuevoRegistro);
    }
  });
}




    this.nuevoDato = {};
  }
}


  eliminar(item: any): void {
    if (!item || !this.modalContenido) return;
  
    if (this.modalContenido.tipo === 'Condiciones Labor') {
      this.condicionLaborService.deleteCondicionLabor(item.id).subscribe({
        next: () => {
          this.modalContenido.datos = this.modalContenido.datos.filter((dato: any) => dato.id !== item.id);
          
        },
        error: (err) => console.error('Error al eliminar Condiciones Labor:', err)
      });
    } else if (this.modalContenido.tipo === 'Tipos de sostenimiento') {
      this.tiposostenimientoService.deleteTipoSostenimiento(item.id).subscribe({
        next: () => {
          this.modalContenido.datos = this.modalContenido.datos.filter((dato: any) => dato.id !== item.id);
          
        },
        error: (err) => console.error('Error al eliminar Condiciones Labor:', err)
      });
    } else if (this.modalContenido.tipo === 'Espesores') {
  this.espesorService.deleteEspesor(item.id).subscribe({
    next: () => {
      this.modalContenido.datos =
        this.modalContenido.datos.filter((dato: any) => dato.id !== item.id);
    },
    error: (err) => console.error('Error al eliminar Espesor:', err)
  });
}else if (this.modalContenido.tipo === 'Rocas') {
  this.rocaService.deleteRoca(item.id).subscribe({
    next: () => {
      this.modalContenido.datos =
        this.modalContenido.datos.filter((dato: any) => dato.id !== item.id);
    },
    error: (err) => console.error('Error al eliminar Roca:', err)
  });
}else if (this.modalContenido.tipo === 'Pernos de sostenimiento') {
  this.pernoService.deletePerno(item.id).subscribe({
    next: () => {
      this.modalContenido.datos =
        this.modalContenido.datos.filter((dato: any) => dato.id !== item.id);
    },
    error: (err) => console.error('Error al eliminar Perno:', err)
  });
}

  }

  descargar(item: any): void {}
}