import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SostenimientoComponent } from './sostenimiento.component';

describe('SostenimientoComponent', () => {
  let component: SostenimientoComponent;
  let fixture: ComponentFixture<SostenimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SostenimientoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SostenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
