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
import { degreeAssetService } from './degreeAsset.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-degreeasset',
  templateUrl: './degreeAsset.component.html',
  styleUrls: ['./degreeAsset.component.css'],
  providers: [degreeAssetService]
})
export class degreeAssetComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  degreeId = new FormControl('', Validators.required);
  student = new FormControl('', Validators.required);
  institute = new FormControl('', Validators.required);
  degreeName = new FormControl('', Validators.required);
  degreeDuration = new FormControl('', Validators.required);
  passingYear = new FormControl('', Validators.required);
  cgpa = new FormControl('', Validators.required);
  allowedViews = new FormControl('', Validators.required);

  constructor(public servicedegreeAsset: degreeAssetService, fb: FormBuilder) {
    this.myForm = fb.group({
      degreeId: this.degreeId,
      student: this.student,
      institute: this.institute,
      degreeName: this.degreeName,
      degreeDuration: this.degreeDuration,
      passingYear: this.passingYear,
      cgpa: this.cgpa,
      allowedViews: this.allowedViews
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.servicedegreeAsset.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
/* code for form load conversion */
/* code for form load conversion */
/* code for form load conversion */
/* code for form load conversion */


      for(var p=0; p<tempList.length; p++)
      {
        var ins:string = tempList[p].student.toString(); 
        var resStudent = "";
        for (var i=0; i<ins.length; i++) {
          if(ins[i]=="#")
          {
            for (var j=i+1; j<ins.length; j++)
            {
              resStudent+=ins[j];
              i++;
            }
          }
          tempList[p].student = resStudent;
        }

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


      this.allAssets = tempList;
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

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
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
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.decentrify.network.degreeAsset',
      'degreeId': this.degreeId.value,
      'student': "resource:org.decentrify.network.studentParticipant#"+this.student.value,
      'institute': "resource:org.decentrify.network.instituteParticipant#"+this.institute.value,
      'degreeName': this.degreeName.value,
      'degreeDuration': this.degreeDuration.value,
      'passingYear': this.passingYear.value,
      'cgpa': this.cgpa.value,
      'allowedViews': this.allowedViews.value
    };

    this.myForm.setValue({
      'degreeId': null,
      'student': null,
      'institute': null,
      'degreeName': null,
      'degreeDuration': null,
      'passingYear': null,
      'cgpa': null,
      'allowedViews': null
    });

    return this.servicedegreeAsset.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'degreeId': null,
        'student': null,
        'institute': null,
        'degreeName': null,
        'degreeDuration': null,
        'passingYear': null,
        'cgpa': null,
        'allowedViews': null
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


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.decentrify.network.degreeAsset',
      'student': "resource:org.decentrify.network.studentParticipant#"+this.student.value,
      'institute': "resource:org.decentrify.network.instituteParticipant#"+this.institute.value,
      'degreeName': this.degreeName.value,
      'degreeDuration': this.degreeDuration.value,
      'passingYear': this.passingYear.value,
      'cgpa': this.cgpa.value,
      'allowedViews': this.allowedViews.value
    };

    return this.servicedegreeAsset.updateAsset(form.get('degreeId').value, this.asset)
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


  deleteAsset(): Promise<any> {

    return this.servicedegreeAsset.deleteAsset(this.currentId)
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

    return this.servicedegreeAsset.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'degreeId': null,
        'student': null,
        'institute': null,
        'degreeName': null,
        'degreeDuration': null,
        'passingYear': null,
        'cgpa': null,
        'allowedViews': null
      };

      if (result.degreeId) {
        formObject.degreeId = result.degreeId;
      } else {
        formObject.degreeId = null;
      }

      if (result.student) {
        var ins:string = result.student.toString(); 
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
        formObject.student = res;
      } else {
        formObject.student = null;
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

      if (result.degreeName) {
        formObject.degreeName = result.degreeName;
      } else {
        formObject.degreeName = null;
      }

      if (result.degreeDuration) {
        formObject.degreeDuration = result.degreeDuration;
      } else {
        formObject.degreeDuration = null;
      }

      if (result.passingYear) {
        formObject.passingYear = result.passingYear;
      } else {
        formObject.passingYear = null;
      }

      if (result.cgpa) {
        formObject.cgpa = result.cgpa;
      } else {
        formObject.cgpa = null;
      }

      if (result.allowedViews) {
        formObject.allowedViews = result.allowedViews;
      } else {
        formObject.allowedViews = null;
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
      'degreeId': null,
      'student': null,
      'institute': null,
      'degreeName': null,
      'degreeDuration': null,
      'passingYear': null,
      'cgpa': null,
      'allowedViews': null
      });
  }

}
