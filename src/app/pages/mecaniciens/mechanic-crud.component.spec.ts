import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MechanicCrudComponent } from './mechanic-crud.component';

describe('MechanicCrudComponent', () => {
    let component: MechanicCrudComponent;
    let fixture: ComponentFixture<MechanicCrudComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MechanicCrudComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(MechanicCrudComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
