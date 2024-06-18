import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaRegistrosComponent } from './consulta-registros.component';

describe('ConsultaRegistrosComponent', () => {
  let component: ConsultaRegistrosComponent;
  let fixture: ComponentFixture<ConsultaRegistrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaRegistrosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaRegistrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
