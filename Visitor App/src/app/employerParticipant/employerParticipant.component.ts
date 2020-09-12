/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { employerParticipantService } from './employerParticipant.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-employerparticipant',
  templateUrl: './employerParticipant.component.html',
  styleUrls: ['./employerParticipant.component.css'],
  providers: [employerParticipantService]
})
export class employerParticipantComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;

  address = new FormControl('', Validators.required);
  phone = new FormControl('', Validators.required);
  allowedViews = new FormControl('', Validators.required);
  employerSecret = new FormControl('', Validators.required);
  id = new FormControl('', Validators.required);
  name = new FormControl('', Validators.required);
  email = new FormControl('', Validators.required);


  constructor(public serviceemployerParticipant: employerParticipantService, fb: FormBuilder) {
    this.myForm = fb.group({
      address: this.address,
      phone: this.phone,
      allowedViews: this.allowedViews,
      employerSecret: this.employerSecret,
      id: this.id,
      name: this.name,
      email: this.email
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceemployerParticipant.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      this.allParticipants = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the participant field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.decentrify.network.employerParticipant',
      'address': this.address.value,
      'phone': this.phone.value,
      'allowedViews': this.allowedViews.value,
      'employerSecret': this.employerSecret.value,
      'id': this.id.value,
      'name': this.name.value,
      'email': this.email.value
    };

    this.myForm.setValue({
      'address': null,
      'phone': null,
      'allowedViews': null,
      'employerSecret': null,
      'id': null,
      'name': null,
      'email': null
    });

    return this.serviceemployerParticipant.addParticipant(this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'address': null,
        'phone': null,
        'allowedViews': null,
        'employerSecret': null,
        'id': null,
        'name': null,
        'email': null
      });
      this.loadAll(); 
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }


   updateParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.decentrify.network.employerParticipant',
      'address': this.address.value,
      'phone': this.phone.value,
      'allowedViews': this.allowedViews.value,
      'employerSecret': this.employerSecret.value,
      'name': this.name.value,
      'email': this.email.value
    };

    return this.serviceemployerParticipant.updateParticipant(form.get('id').value, this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteParticipant(): Promise<any> {

    return this.serviceemployerParticipant.deleteParticipant(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceemployerParticipant.getparticipant(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'address': null,
        'phone': null,
        'allowedViews': null,
        'employerSecret': null,
        'id': null,
        'name': null,
        'email': null
      };

      if (result.address) {
        formObject.address = result.address;
      } else {
        formObject.address = null;
      }

      if (result.phone) {
        formObject.phone = result.phone;
      } else {
        formObject.phone = null;
      }

      if (result.allowedViews) {
        formObject.allowedViews = result.allowedViews;
      } else {
        formObject.allowedViews = null;
      }

      if (result.employerSecret) {
        formObject.employerSecret = result.employerSecret;
      } else {
        formObject.employerSecret = null;
      }

      if (result.id) {
        formObject.id = result.id;
      } else {
        formObject.id = null;
      }

      if (result.name) {
        formObject.name = result.name;
      } else {
        formObject.name = null;
      }

      if (result.email) {
        formObject.email = result.email;
      } else {
        formObject.email = null;
      }

      this.myForm.setValue(formObject);
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });

  }

  resetForm(): void {
    this.myForm.setValue({
      'address': null,
      'phone': null,
      'allowedViews': null,
      'employerSecret': null,
      'id': null,
      'name': null,
      'email': null
    });
  }
}
