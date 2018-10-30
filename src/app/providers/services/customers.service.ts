import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CustomersService {

    constructor(
        private http: HttpClient
    ) { }

    getAll() {
        return this.http.get('assets/data/customers.json');
    }

    add(newCustomer, customerList) {
        return [...customerList, newCustomer];
    }

    update(updatedCustomer, customerList) {
        const index = customerList.findIndex(customer => customer.id === updatedCustomer.id);

        return [
            ...customerList.slice(0, index),
            updatedCustomer,
            ...customerList.slice(index + 1)
        ];
    }

    delete(customerId, customerList) {
        return customerList.filter(customer => customer.id !== customerId);
    }

}
