import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CustomersService {

    customers: any;

    constructor(
        private http: HttpClient
    ) { }

    init() {
        return this.http.get('assets/data/customers.json');
    }

    get() {
        return of(this.customers);
    }

    add(newCustomer) {
        newCustomer.id = this.customers[this.customers.length - 1].id + 1;
        newCustomer.created_at = new Date();
        newCustomer.updated_at = null;
        this.customers = [...this.customers, newCustomer];

        return of('Added successfully');
    }

    update(updatedCustomer) {
        updatedCustomer.updated_at = new Date();
        const index = this.customers.findIndex(customer => customer.id === updatedCustomer.id);

        this.customers = [
            ...this.customers.slice(0, index),
            updatedCustomer,
            ...this.customers.slice(index + 1)
        ];

        return of('Updated successfully');
    }

    delete(customerId) {
        this.customers = this.customers.filter(customer => customer.id !== customerId);

        return of('Deleted successfully');
    }

}
