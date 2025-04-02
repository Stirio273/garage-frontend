import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionClientComponent } from './reception-client.component';

describe('ReceptionClientComponent', () => {
  let component: ReceptionClientComponent;
  let fixture: ComponentFixture<ReceptionClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceptionClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceptionClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
