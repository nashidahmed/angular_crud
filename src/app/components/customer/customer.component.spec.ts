import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerComponent } from './customer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MockModule, MockComponent } from 'ng-mocks';
import { ModalModule } from 'ngx-bootstrap';
import { CustomerInputComponent } from '../customer-input/customer-input.component';

describe('CustomerComponent', () => {
    let component: CustomerComponent;
    let fixture: ComponentFixture<CustomerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                FontAwesomeModule,
                ModalModule.forRoot()
            ],
            declarations: [
                CustomerComponent,
                MockComponent(CustomerInputComponent)
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CustomerComponent);
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
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
