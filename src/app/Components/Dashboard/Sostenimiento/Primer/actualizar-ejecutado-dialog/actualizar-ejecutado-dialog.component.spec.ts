import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarEjecutadoDialogComponent } from './actualizar-ejecutado-dialog.component';

describe('ActualizarEjecutadoDialogComponent', () => {
  let component: ActualizarEjecutadoDialogComponent;
  let fixture: ComponentFixture<ActualizarEjecutadoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarEjecutadoDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarEjecutadoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
