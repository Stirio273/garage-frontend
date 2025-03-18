import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MechanicCrudComponentComponent } from './mechanic-crud-component.component';

describe('MechanicCrudComponentComponent', () => {
  let component: MechanicCrudComponentComponent;
  let fixture: ComponentFixture<MechanicCrudComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MechanicCrudComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MechanicCrudComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
