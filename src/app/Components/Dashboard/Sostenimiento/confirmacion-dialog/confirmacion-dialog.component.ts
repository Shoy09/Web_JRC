import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmacion-dialog',
  imports: [CommonModule, MatButtonModule],
  templateUrl: './confirmacion-dialog.component.html',
  styleUrl: './confirmacion-dialog.component.css'
})
export class ConfirmacionDialogComponent  {

  constructor(
    private dialogRef: MatDialogRef<ConfirmacionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  confirmar() {
    this.dialogRef.close(true);
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}