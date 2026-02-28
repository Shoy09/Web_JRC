import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CroquisComponent } from '../croquis/croquis.component';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css'],
  standalone: true,
  imports: [
    MatRadioModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule
  ]
})
export class ReporteComponent2 implements OnInit {

  registroRecibido: any;

  // URLs de las imágenes
  dibujoCroquisUrl: string = '';
  fotoCroquisUrl: string = '';
  
  // Estos ahora se llenarán dinámicamente desde los datos recibidos
  condicionesLabor: { nombre: string, valor: boolean }[] = [];
  tipoSostenimiento: { nombre: string, activo: boolean }[] = [];
  
  // Estos se mantienen igual (vienen del formulario)
  condicionesLaborM = [
    { nombre: 'Ancho (m)', control: 'ancho' },
    { nombre: 'Alto (m)', control: 'alto' },
    { nombre: 'Largo (m)', control: 'largo' }
  ];

  form!: FormGroup;

  calibradoresPerno = [
    { label: 'Calibradores (SI / NO)', control: 'calibradores' },
    { label: 'Espesor 1.5 – 2', control: 'espesor' },
    { label: 'Slump', control: 'slump' },
    { label: 'Presión', control: 'presion' },
    { label: 'Perno', control: 'perno' },
    { label: 'Long 5–6', control: 'longitud' }
  ];

  ejecutado = [
    { label: 'Shotcrete (m³)', control: 'shotcrete1' },
    { label: 'Malla (m²)', control: 'malla1' },
    { label: 'Pernos (Und.)', control: 'pernos1' },
    { label: 'Shotcrete (m³)', control: 'shotcrete2' },
    { label: 'Malla (m²)', control: 'malla2' },
    { label: 'Pernos (Und.)', control: 'pernos2' },
    { label: 'Shotcrete (m³)', control: 'shotcrete3' },
    { label: 'Malla (m²)', control: 'malla3' },
    { label: 'Pernos (Und.)', control: 'pernos3' }
  ];

  constructor(private fb: FormBuilder, private dialog: MatDialog) {}

  ngOnInit() {
    // Crear primero el formulario
    this.form = this.fb.group({
      fecha: [''],
      turno: [''],
      guardia: [''],
      nivel: [''],
      block: [''],
      roca: [''],
      labor: [''],
      empresa: [''],
      opRobot: [''],
      opRobotNum: [''],
      opMixerA: [''],
      opMixerANum: [''],
      opMixer: [''],
      opMixerNum: [''],
      supervisor: [''],
      supervisorNum: [''],
      desatado: [''],
      calibradores: [''],
      espesor: [''],
      slump: [''],
      presion: [''],
      perno: [''],
      longitud: [''],
      shotcrete1: [''],
      malla1: [''],
      pernos1: [''],
      shotcrete2: [''],
      malla2: [''],
      pernos2: [''],
      shotcrete3: [''],
      malla3: [''],
      pernos3: [''],
      ancho: [''],
      alto: [''],
      largo: ['']
    });

    // Obtener datos enviados desde el listado
    const navigation = history.state;

    if (navigation && navigation.registro) {
      this.registroRecibido = navigation.registro;
      console.log('REGISTRO RECIBIDO:', this.registroRecibido);

       // Guardar las URLs de las imágenes
      this.dibujoCroquisUrl = this.registroRecibido.dibujo_croquis_path || '';
      this.fotoCroquisUrl = this.registroRecibido.foto_croquis_path || '';
      
      // Procesar los JSONs recibidos
      this.procesarCondicionesLabor();
      this.procesarTipoSostenimiento();
      
      // Cargar datos en el formulario
      this.cargarDatosEnFormulario();
    }
  }

  /**
   * Procesa el string JSON de condiciones_labor
   * Ejemplo: "{\"gggg\":true}" → [{ nombre: 'gggg', valor: true }]
   */
  procesarCondicionesLabor() {
    try {
      if (this.registroRecibido?.condiciones_labor) {
        const condicionesObj = JSON.parse(this.registroRecibido.condiciones_labor);
        
        // Convertir objeto a array
        this.condicionesLabor = Object.keys(condicionesObj).map(key => ({
          nombre: key,
          valor: condicionesObj[key] === true // Asegurar que sea booleano
        }));
        
        console.log('Condiciones procesadas:', this.condicionesLabor);
      }
    } catch (error) {
      console.error('Error al procesar condiciones_labor:', error);
      this.condicionesLabor = [];
    }
  }

  /**
   * Procesa el string JSON de tipo_sostenimiento
   * Ejemplo: "{\"trrrr\":true,\"yyttttyy\":true}" → array de objetos con activo
   */
  procesarTipoSostenimiento() {
    try {
      if (this.registroRecibido?.tipo_sostenimiento) {
        const sostenimientoObj = JSON.parse(this.registroRecibido.tipo_sostenimiento);
        
        // Convertir objeto a array
        this.tipoSostenimiento = Object.keys(sostenimientoObj).map(key => ({
          nombre: key,
          activo: sostenimientoObj[key] === true
        }));
        
        console.log('Tipo sostenimiento procesado:', this.tipoSostenimiento);
      }
    } catch (error) {
      console.error('Error al procesar tipo_sostenimiento:', error);
      this.tipoSostenimiento = [];
    }
  }

  /**
   * Obtiene el valor de una condición específica para el radio button
   */
  getCondicionValor(nombre: string): string {
    const condicion = this.condicionesLabor.find(c => c.nombre === nombre);
    return condicion?.valor ? 'si' : 'no';
  }

  /**
   * Actualiza el valor de una condición cuando cambia el radio button
   */
  onCondicionChange(nombre: string, valor: string) {
    const condicion = this.condicionesLabor.find(c => c.nombre === nombre);
    if (condicion) {
      condicion.valor = valor === 'si';
    }
  }

  cargarDatosEnFormulario() {
    if (!this.registroRecibido) return;

    this.form.patchValue({
      // Fecha - ahora como string directamente (sin convertir a Date)
      fecha: this.registroRecibido.fecha || '',

      // Selects
      turno: this.registroRecibido.turno,
      guardia: this.registroRecibido.guardia,
      nivel: this.registroRecibido.nivel,
      block: this.registroRecibido.block,
      roca: this.registroRecibido.roca,
      labor: this.registroRecibido.labor,
      empresa: this.registroRecibido.empresa,

      // Personal
      opRobot: this.registroRecibido.op_robot_bolter_nombre,
      opRobotNum: this.registroRecibido.op_robot_bolter_numero,
      opMixerA: this.registroRecibido.op_mixer_ayudante_nombre,
      opMixerANum: this.registroRecibido.op_mixer_ayudante_numero,
      opMixer: this.registroRecibido.op_mixer_nombre,
      opMixerNum: this.registroRecibido.op_mixer_numero,
      supervisor: this.registroRecibido.supervisor_nombre,
      supervisorNum: this.registroRecibido.supervisor_numero,

      // Dimensiones
      ancho: this.registroRecibido.ancho,
      alto: this.registroRecibido.alto,
      largo: this.registroRecibido.longitud,

      // Calibradores
      calibradores: this.registroRecibido.calibradores_si_no,
      espesor: this.registroRecibido.espesor,
      slump: this.registroRecibido.slump,
      presion: this.registroRecibido.presion,
      perno: this.registroRecibido.perno,
      longitud: this.registroRecibido.long_perno,

      // Ejecutado
      shotcrete1: this.registroRecibido.ejecutado_shotcrete1,
      malla1: this.registroRecibido.ejecutado_malla1,
      pernos1: this.registroRecibido.ejecutado_pernos1,
      shotcrete2: this.registroRecibido.ejecutado_shotcrete2,
      malla2: this.registroRecibido.ejecutado_malla2,
      pernos2: this.registroRecibido.ejecutado_pernos2,
      shotcrete3: this.registroRecibido.ejecutado_shotcrete3,
      malla3: this.registroRecibido.ejecutado_malla3,
      pernos3: this.registroRecibido.ejecutado_pernos3,
    });

    this.form.disable();
this.habilitarSoloEjecutado();

    console.log("FORM DESPUÉS DEL PATCH:", this.form.value);
  }

  habilitarSoloEjecutado() {
  const controlesEjecutado = [
    'shotcrete1','malla1','pernos1',
    'shotcrete2','malla2','pernos2',
    'shotcrete3','malla3','pernos3'
  ];

  controlesEjecutado.forEach(control => {
    this.form.get(control)?.enable();
  });
}

  abrirCroquis() {
    this.dialog.open(CroquisComponent, {
      width: '900px',
      height: '650px',
      maxWidth: '95vw',
      data: {
        dibujoUrl: this.dibujoCroquisUrl,
        fotoUrl: this.fotoCroquisUrl
      }
    });
  }
}