import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerInputComponent } from './customer-input.component';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

describe('CustomerInputComponent', () => {
    let component: CustomerInputComponent;
    let fixture: ComponentFixture<CustomerInputComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule
            ],
            declarations: [CustomerInputComponent]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CustomerInputComponent);
        component = fixture.componentInstance;
        component.customer = {
            id: 1,
            email: 'nashid.ahmed@people10.com',
            first_name: 'Nashid',
            last_name: 'Shah',
            ip: '123.564.23.467',
            latitude: '12.435313',
            longitude: '56.234343'
        };
        component.control = new FormControl();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
