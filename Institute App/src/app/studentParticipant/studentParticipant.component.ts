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
import { studentParticipantService } from './studentParticipant.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-studentparticipant',
  templateUrl: './studentParticipant.component.html',
  styleUrls: ['./studentParticipant.component.css'],
  providers: [studentParticipantService]
})
export class studentParticipantComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;

  fatherName = new FormControl('', Validators.required);
  DOB = new FormControl('', Validators.required);
  studentSecret = new FormControl('', Validators.required);
  institute = new FormControl('', Validators.required);
  id = new FormControl('', Validators.required);
  name = new FormControl('', Validators.required);
  email = new FormControl('', Validators.required);


  constructor(public servicestudentParticipant: studentParticipantService, fb: FormBuilder) {
    this.myForm = fb.group({
      fatherName: this.fatherName,
      DOB: this.DOB,
      studentSecret: this.studentSecret,
      institute: this.institute,
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
    return this.servicestudentParticipant.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      

      for(var p=0; p<tempList.length; p++)
      {
      var ins:string = tempList[p].institute.toString(); 
        var resInstitute = "";
        for (var i=0; i<ins.length; i++) {
          if(ins[i]=="#")
          {
            for (var j=i+1; j<ins.length; j++)
            {
              resInstitute+=ins[j];
              i++;
            }
          }
          tempList[p].institute = resInstitute;
      }
    }


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
      $class: 'org.decentrify.network.studentParticipant',
      'fatherName': this.fatherName.value,
      'DOB': this.DOB.value,
      'studentSecret': this.studentSecret.value,
      'institute': "resource:org.decentrify.network.instituteParticipant#"+this.institute.value,
      'id': this.id.value,
      'name': this.name.value,
      'email': this.email.value
    };

    this.myForm.setValue({
      'fatherName': null,
      'DOB': null,
      'studentSecret': null,
      'institute': null,
      'id': null,
      'name': null,
      'email': null
    });

    return this.servicestudentParticipant.addParticipant(this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'fatherName': null,
        'DOB': null,
        'studentSecret': null,
        'institute': null,
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
      $class: 'org.decentrify.network.studentParticipant',
      'fatherName': this.fatherName.value,
      'DOB': this.DOB.value,
      'studentSecret': this.studentSecret.value,
      'institute': "resource:org.decentrify.network.instituteParticipant#"+this.institute.value,
      'name': this.name.value,
      'email': this.email.value
    };

    return this.servicestudentParticipant.updateParticipant(form.get('id').value, this.participant)
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

    return this.servicestudentParticipant.deleteParticipant(this.currentId)
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

    return this.servicestudentParticipant.getparticipant(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'fatherName': null,
        'DOB': null,
        'studentSecret': null,
        'institute': null,
        'id': null,
        'name': null,
        'email': null
      };

      if (result.fatherName) {
        formObject.fatherName = result.fatherName;
      } else {
        formObject.fatherName = null;
      }

      if (result.DOB) {
        formObject.DOB = result.DOB;
      } else {
        formObject.DOB = null;
      }

      if (result.studentSecret) {
        formObject.studentSecret = result.studentSecret;
      } else {
        formObject.studentSecret = null;
      }

      if (result.institute) {
        var ins:string = result.institute.toString(); 
        var res = "";
        for (var i=0; i<ins.length; i++) {
          if(ins[i]=="#")
          {
            for (var j=i+1; j<ins.length; j++)
            {
              res+=ins[j];
              i++;
            }
          }
        }
        formObject.institute = res;
      } else {
        formObject.institute = null;
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
      'fatherName': null,
      'DOB': null,
      'studentSecret': null,
      'institute': null,
      'id': null,
      'name': null,
      'email': null
    });
  }
}
