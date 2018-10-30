import { Component, OnInit, TemplateRef } from '@angular/core';
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

    modalRef: BsModalRef;
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
        this.customersService.getAll()
        .subscribe(data => {
            this.customers = data;

            this.customers.forEach(customer => {
                customer.created_at = new Date(customer.created_at);

                if (customer.updated_at) {
                    customer.updated_at = new Date(customer.updated_at);
                }
            });
        });

        this.paginationConfig = {
            itemsPerPage: 10,
            currentPage: 1
        };
    }

    onPageChange(pageNumber: number) {
        this.paginationConfig.currentPage = pageNumber;
    }

    addCustomer(template: TemplateRef<any>) {
        this.newCustomer = {
            id: this.customers[this.customers.length - 1].id + 1,
            email: '',
            first_name: '',
            last_name: '',
            ip: '',
            latitude: '',
            longitude: '',
            updated_at: null,
            editMode: true,
            showDetails: true,
            isNew: true
        };

        this.openModal(template);
    }

    onEditMode(disableAddButton: boolean) {
        this.disableAddButton = disableAddButton;
    }

    onAdd(customer: any) {
        this.customers = this.customersService.add(customer, this.customers);
        this.paginationConfig.currentPage = Math.ceil(this.customers.length / this.paginationConfig.itemsPerPage);
    }

    onUpdate(customer: any) {
        this.customers = this.customersService.update(customer, this.customers);
    }

    onDelete(customerId: number) {
        const deletedCustomer = this.customers.find(customer => customer.id === customerId);
        this.customers = this.customersService.delete(customerId, this.customers);
        this.alertService.success(deletedCustomer.first_name + ' ' + deletedCustomer.last_name + ' has been successfully deleted.');
    }

    // Modal controls
    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
    }

    closeModal() {
        this.modalRef.hide();
    }

}
