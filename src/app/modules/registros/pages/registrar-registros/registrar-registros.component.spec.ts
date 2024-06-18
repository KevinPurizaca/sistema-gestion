import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarRegistrosComponent } from './registrar-registros.component';

describe('RegistrarRegistrosComponent', () => {
  let component: RegistrarRegistrosComponent;
  let fixture: ComponentFixture<RegistrarRegistrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarRegistrosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarRegistrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
