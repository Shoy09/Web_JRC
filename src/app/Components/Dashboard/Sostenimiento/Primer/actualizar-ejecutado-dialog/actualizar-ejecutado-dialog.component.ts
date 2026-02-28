import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogActions, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmacionDialogComponent } from '../../confirmacion-dialog/confirmacion-dialog.component';

@Component({
  selector: 'app-actualizar-ejecutado-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogActions
],
  templateUrl: './actualizar-ejecutado-dialog.component.html',
  styleUrls: ['./actualizar-ejecutado-dialog.component.css']
})
export class ActualizarEjecutadoDialogComponent1 {

  form!: FormGroup;

  ejecutado = [
    { label: 'Shotcrete 1', control: 'shotcrete1' },
    { label: 'Malla 1', control: 'malla1' },
    { label: 'Pernos 1', control: 'pernos1' },
    { label: 'Shotcrete 2', control: 'shotcrete2' },
    { label: 'Malla 2', control: 'malla2' },
    { label: 'Pernos 2', control: 'pernos2' },
    { label: 'Shotcrete 3', control: 'shotcrete3' },
    { label: 'Malla 3', control: 'malla3' },
    { label: 'Pernos 3', control: 'pernos3' }
  ];

  constructor(
    private fb: FormBuilder,
  private dialogRef: MatDialogRef<ActualizarEjecutadoDialogComponent1>,
  private dialog: MatDialog,
  @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.form = this.fb.group({
      shotcrete1: [data.ejecutado.shotcrete1],
      malla1: [data.ejecutado.malla1],
      pernos1: [data.ejecutado.pernos1],
      shotcrete2: [data.ejecutado.shotcrete2],
      malla2: [data.ejecutado.malla2],
      pernos2: [data.ejecutado.pernos2],
      shotcrete3: [data.ejecutado.shotcrete3],
      malla3: [data.ejecutado.malla3],
      pernos3: [data.ejecutado.pernos3],

      // 🔥 Nueva observación (NO la anterior)
      observacionNueva: ['']
    });
  }

  confirmar() {

  const confirmRef = this.dialog.open(ConfirmacionDialogComponent, {
    width: '400px',
    disableClose: true
  });

  confirmRef.afterClosed().subscribe(result => {

    if (!result) return;

    const payload = {
      registroId: this.data.registroId,
      ejecutado: {
        shotcrete1: this.form.value.shotcrete1,
        malla1: this.form.value.malla1,
        pernos1: this.form.value.pernos1,
        shotcrete2: this.form.value.shotcrete2,
        malla2: this.form.value.malla2,
        pernos2: this.form.value.pernos2,
        shotcrete3: this.form.value.shotcrete3,
        malla3: this.form.value.malla3,
        pernos3: this.form.value.pernos3
      },
      observacion: this.form.value.observacionNueva
    };

    this.dialogRef.close(payload);
  });
}
  cancelar() {
    this.dialogRef.close();
  }
}