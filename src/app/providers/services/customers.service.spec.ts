import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CustomersService } from './customers.service';
import { TestCustomers } from 'src/app/pages/customer-management/customer-management.component.spec';

describe('CustomersService', () => {
    let customersService: CustomersService;

    const customerList = TestCustomers;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CustomersService]
        });

        customersService = TestBed.get(CustomersService);
        customersService.customers = [...customerList];
    });

    it('should be created', () => {
        expect(customersService).toBeTruthy();
    });

    describe('.get()', () => {
        it('should exist', () => {
            expect(customersService.get).toBeDefined();
        });

        it('should get all the customers', () => {
            customersService.get()
            .subscribe(customers => {
                expect(customers).toEqual(customerList, 'expected customers');
            });
        });
    });

    describe('.add()', () => {
        const newCustomer = {
            first_name: 'John',
            last_name: 'Doe',
            email: 'john.doe@test.com',
            ip: '25.65.34.234',
            latitude: 12.3242234,
            longitude: -32.2323423
        };

        it('should exist', () => {
            expect(customersService.add).toBeDefined();
        });

        it('should add a new customer', () => {
            const newCustomerList = [...customerList, newCustomer];

            customersService.add(newCustomer)
            .subscribe(() => {
                customersService.get()
                .subscribe((customers: any) => {
                    expect(customers.length).toEqual(newCustomerList.length);
                    expect(customers).toContain(jasmine.objectContaining(newCustomer));
                });
            });
        });
    });

    describe('.update()', () => {
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

        it('should exist', () => {
            expect(customersService.update).toBeDefined();
        });

        it('should update an existing customer', () => {
            const index = customerList.findIndex(customer => customer.id === updatedCustomer.id);
            const newCustomerList = [
                ...customerList.slice(0, index),
                updatedCustomer,
                ...customerList.slice(index + 1)
            ];

            customersService.update(updatedCustomer)
            .subscribe(() => {
                customersService.get()
                .subscribe((customers: any) => {
                    expect(customers.length).toEqual(newCustomerList.length);
                    expect(customers).toContain(jasmine.objectContaining(updatedCustomer));
                });
            });
        });
    });

    describe('.delete()', () => {
        const deletedCustomerId = 2;
        const deletedCustomer = {
            id: 2,
            email: 'bijin.balakrishnan@people10.com',
            first_name: 'Bijin',
            last_name: 'Balakrishnan',
            ip: '32.43.65.235',
            latitude: 34.54354,
            longitude: 67.453345,
            created_at: '2018-10-28 13:43:37',
            updated_at: null
        };

        it('should exist', () => {
            expect(customersService.delete).toBeDefined();
        });

        it('should delete an existing customer', () => {
            const newCustomerList = customerList.filter(customer => customer.id !== deletedCustomerId);

            customersService.delete(deletedCustomerId)
            .subscribe(() => {
                customersService.get()
                .subscribe((customers: any) => {
                    expect(customers.length).toEqual(newCustomerList.length);
                    expect(customers).not.toContain(jasmine.objectContaining(deletedCustomer));
                });
            });
        });
    });
});
