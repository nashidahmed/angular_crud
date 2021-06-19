import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerManagementComponent } from './customer-management.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchPipe } from 'src/app/providers/pipes/search.pipe';
import { CustomerComponent } from 'src/app/components/customer/customer.component';
import { MockComponent } from 'ng-mocks';
import { CustomersService } from 'src/app/providers/services/customers.service';
import { of } from 'rxjs';
import { BsModalService, ModalModule } from 'ngx-bootstrap';
import { AlertModule } from 'ngx-alerts';

export const TestCustomers = [
    {
        id: 1,
        email: 'nashid.ahmed@test.com',
        first_name: 'Nashid',
        last_name: 'Shah',
        ip: '112.123.54.184',
        latitude: 12.234223,
        longitude: 45.345112,
        created_at: '2018-10-27 13:43:37',
        updated_at: null
    },
    {
        id: 2,
        email: 'bijin.balakrishnan@test.com',
        first_name: 'Bijin',
        last_name: 'Balakrishnan',
        ip: '32.43.65.235',
        latitude: 34.54354,
        longitude: 67.453345,
        created_at: '2018-10-28 13:43:37',
        updated_at: null
    },
    {
        id: 3,
        email: 'ravi.ubana@gmail.com',
        first_name: 'Ravi',
        last_name: 'Ubana',
        ip: '87.254.252.43',
        latitude: 97.345252,
        longitude: 47.433452,
        created_at: '2018-10-28 17:43:37',
        updated_at: null
    },
    {
        id: 4,
        email: 'anoop.md@gmail.com',
        first_name: 'Anoop',
        last_name: 'MD',
        ip: '57.224.221.52',
        latitude: 35.125611,
        longitude: 89.325223,
        created_at: '2018-09-28 17:43:37',
        updated_at: null
    }
];

describe('CustomerManagementComponent', () => {
    let component: CustomerManagementComponent;
    let fixture: ComponentFixture<CustomerManagementComponent>;
    let initSpy, getSpy, addSpy, updateSpy, deleteSpy, customersService;
    const testCustomers = TestCustomers;
    const newCustomer = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@test.com',
        ip: '25.65.34.234',
        latitude: 12.3242234,
        longitude: -32.2323423
    };

    const updatedCustomer = {
        id: 1,
        email: 'nashid.ahmed@gmail.com',
        first_name: 'Nashid',
        last_name: 'Ahmed',
        ip: '112.123.54.184',
        latitude: 12.234223,
        longitude: 45.345112,
        created_at: '2018-10-27 13:43:37',
        updated_at: null
    };

    const deletedCustomerId = 2;

    beforeEach(async(() => {
        // Create a fake CustomersService object with a `get()` spy
        customersService = jasmine.createSpyObj('CustomersService', ['init', 'get', 'add', 'update', 'delete']);
        // Make the spy return a synchronous Observable with the test data
        initSpy = customersService.init.and.returnValue(of(testCustomers));
        addSpy = customersService.add.and.returnValue(of('Added successfully'));
        updateSpy = customersService.update.and.returnValue(of('Updated successfully'));
        deleteSpy = customersService.delete.and.returnValue(of('Deleted successfully'));
        customersService.customers = testCustomers;

        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                NgxPaginationModule,
                AlertModule.forRoot(),
                ModalModule.forRoot()
            ],
            declarations: [
                CustomerManagementComponent,
                SearchPipe,
                MockComponent(CustomerComponent)
            ],
            providers: [
                { provide: CustomersService, useValue: customersService },
                BsModalService
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CustomerManagementComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('.init()', () => {
        it('should initialize customers object', () => {
            expect(initSpy.calls.any()).toBe(true, 'get called');
            expect(component.customers).toEqual(testCustomers);
        });
    });

    describe('.get()', () => {
        it('should get all the customers', () => {
            getSpy = customersService.get.and.returnValue(of(testCustomers));
            component.getCustomers();

            expect(getSpy.calls.any()).toBe(true, 'get called');
            expect(component.customers).toEqual(testCustomers);
        });
    });

    describe('.onAdd()', () => {
        it('should exist', () => {
            expect(component.onAdd).toBeDefined();
        });

        it('should add a new customer', () => {
            getSpy = customersService.get.and.returnValue(of([...testCustomers, newCustomer]));
            component.customers = testCustomers;
            component.onAdd(newCustomer);

            expect(component.customers.length).toEqual(testCustomers.length + 1);
            expect(component.customers).toContain(jasmine.objectContaining(newCustomer));
        });
    });

    describe('.onUpdate()', () => {
        it('should exist', () => {
            expect(component.onUpdate).toBeDefined();
        });

        it('should update an existing customer', () => {
            getSpy = customersService.get.and.returnValue(of([updatedCustomer, ...testCustomers.slice(1)]));
            component.customers = testCustomers;
            component.onUpdate(updatedCustomer);

            expect(component.customers.length).toEqual(testCustomers.length);
            expect(component.customers).toContain(jasmine.objectContaining(updatedCustomer));
        });
    });

    describe('.onDelete()', () => {
        const deletedCustomer = {
            id: 2,
            email: 'bijin.balakrishnan@test.com',
            first_name: 'Bijin',
            last_name: 'Balakrishnan',
            ip: '32.43.65.235',
            latitude: 34.54354,
            longitude: 67.453345,
            created_at: '2018-10-28 13:43:37',
            updated_at: null
        };

        it('should exist', () => {
            expect(component.onDelete).toBeDefined();
        });

        it('should delete an existing customer', () => {
            getSpy = customersService.get.and.returnValue(of(testCustomers.filter(customer => customer.id !== deletedCustomerId)));
            component.customers = testCustomers;
            component.onDelete(deletedCustomerId);

            expect(component.customers.length).toEqual(testCustomers.length - 1);
            expect(component.customers).not.toContain(jasmine.objectContaining(deletedCustomer));
        });
    });

});
