import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CustomersService } from 'src/app/providers/services/customers.service';
import { PaginationInstance } from 'ngx-pagination';
import { AlertService } from 'ngx-alerts';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
    selector: 'app-customer-management',
    templateUrl: './customer-management.component.html',
    styleUrls: ['./customer-management.component.css']
})
export class CustomerManagementComponent implements OnInit {

    bsModalRef: BsModalRef;
    newCustomer: any;
    disableAddButton: boolean;
    searchText: string;
    customers: any;
    paginationConfig: PaginationInstance;

    constructor(
        private customersService: CustomersService,
        private modalService: BsModalService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.customersService.init()
        .subscribe((data: any) => {
            data.forEach(customer => {
                customer.created_at = new Date(customer.created_at);

                if (customer.updated_at) {
                    customer.updated_at = new Date(customer.updated_at);
                }
            });

            this.customersService.customers = this.customers = data;
        });

        this.paginationConfig = {
            itemsPerPage: 10,
            currentPage: 1
        };

        // this.customersService.customers$
        // .subscribe(customers => this.customers = customers);
    }

    getCustomers() {
        this.customersService.get()
        .subscribe(data => {
            this.customers = data;
        });
    }

    addCustomer(template: TemplateRef<any>) {
        this.newCustomer = {
            email: '',
            first_name: '',
            last_name: '',
            ip: '',
            latitude: '',
            longitude: '',
            editMode: true,
            showDetails: true,
            isNew: true
        };

        this.bsModalRef = this.modalService.show(template, { class: 'modal-lg' });
    }

    onPageChange(pageNumber: number) {
        this.paginationConfig.currentPage = pageNumber;
    }

    onEditMode(disableAddButton: boolean) {
        this.disableAddButton = disableAddButton;
    }

    onAdd(customer: any) {
        this.customersService.add(customer)
        .subscribe(() => {
            this.getCustomers();
            this.paginationConfig.currentPage = Math.ceil(this.customers.length / this.paginationConfig.itemsPerPage);
        });
    }

    onUpdate(customer: any) {
        this.customersService.update(customer)
        .subscribe(() => this.getCustomers());
    }

    onDelete(customerId: number) {
        const deletedCustomer = this.customers.find(customer => customer.id === customerId);
        this.customersService.delete(customerId)
        .subscribe(() => {
            this.getCustomers();
            // tslint:disable-next-line:max-line-length
            this.alertService.success(`${[deletedCustomer.first_name, deletedCustomer.last_name].join(' ')} has been successfully deleted.`);
        });
    }
}
