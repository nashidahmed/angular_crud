import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { faEdit, faTrashAlt, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { EmailRegex } from 'src/app/config/constants';

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

    @Input() customer: any;
    @Output() delete = new EventEmitter<number>();
    @Output() editMode = new EventEmitter<boolean>();
    @Output() update = new EventEmitter<any>();

    modalRef: BsModalRef;
    editForm: FormGroup;
    faEdit = faEdit;
    faTrashAlt = faTrashAlt;
    faCaretDown = faCaretDown;
    faCaretUp = faCaretUp;

    constructor(
        private modalService: BsModalService,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.createForm();
    }

    editCustomer() {
        this.editMode.emit(true);
        this.customer.editMode = true;
        this.customer.showDetails = true;
    }

    updateCustomer() {
        this.editMode.emit(false);
        this.customer.editMode = false;

        // If new customer is added do not set 'updated_at' timestamp
        if (this.customer.isNew) {
            // mark customer as old after first edit
            this.customer.created_at = new Date();
            this.customer.isNew = false;
        } else {
            // set 'updated_at' timestamp
            this.customer.updated_at = new Date();
        }

        this.customer = { ...this.customer, ...this.editForm.value };
        this.update.emit(this.customer);
    }

    deleteCustomer(template: TemplateRef<any>) {
        this.openModal(template);
    }

    toggleDetails() {
        this.customer.showDetails = !this.customer.showDetails;
        // Turn off edit mode when details are collapsed
        if (!this.customer.showDetails) {
            this.editMode.emit(false);
            this.customer.editMode = false;
        }
    }

    // Modal controls
    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template, { class: 'modal-md' });
    }

    confirm() {
        this.delete.emit(this.customer.id);
        this.modalRef.hide();
    }

    closeModal() {
        this.modalRef.hide();
    }

    // Form Validation for the customer form
    createForm() {
        this.editForm = this.fb.group({
            first_name: [this.customer.first_name, Validators.required],
            last_name: [this.customer.last_name, Validators.required],
            email: [this.customer.email, [
                Validators.required,
                Validators.pattern(EmailRegex),
            ]],
            ip: [this.customer.ip, Validators.required],
            latitude: [this.customer.latitude, Validators.required],
            longitude: [this.customer.longitude, Validators.required]
        });
    }

    get first_name() {
        return this.editForm.get('first_name');
    }


    get last_name() {
        return this.editForm.get('last_name');
    }

    get email() {
        return this.editForm.get('email');
    }

    get ip() {
        return this.editForm.get('ip');
    }

    get latitude() {
        return this.editForm.get('latitude');
    }

    get longitude() {
        return this.editForm.get('longitude');
    }

}
