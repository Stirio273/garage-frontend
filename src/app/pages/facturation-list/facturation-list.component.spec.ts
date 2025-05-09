import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturationListComponent } from './facturation-list.component';

describe('FacturationListComponent', () => {
  let component: FacturationListComponent;
  let fixture: ComponentFixture<FacturationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacturationListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
