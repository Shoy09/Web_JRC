import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-croquis',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './croquis.component.html',
  styleUrls: ['./croquis.component.css']
})
export class CroquisComponent implements OnInit {

  dibujoUrl: string = '';
  fotoUrl: string = '';

  constructor(
    private dialogRef: MatDialogRef<CroquisComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { dibujoUrl: string, fotoUrl: string }
  ) {}

  ngOnInit() {
    // Recibir las URLs del componente padre
    if (this.data) {
      this.dibujoUrl = this.data.dibujoUrl || '';
      this.fotoUrl = this.data.fotoUrl || '';
      
      console.log('Dibujo URL recibida:', this.dibujoUrl);
      console.log('Foto URL recibida:', this.fotoUrl);
    }
  }

  cerrar() {
    this.dialogRef.close();
  }
}