import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-customer-input',
  templateUrl: './customer-input.component.html',
  styleUrls: ['./customer-input.component.css']
})
export class CustomerInputComponent implements OnInit {

  @Input() customer: any;
  @Input() title: string;
  @Input() control: FormControl;
  @Input() input: string;
  @Input() showTitle: boolean;

  constructor() { }

  ngOnInit() {
  }

}
