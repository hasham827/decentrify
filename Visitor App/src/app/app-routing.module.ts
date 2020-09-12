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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { degreeAssetComponent } from './degreeAsset/degreeAsset.component';

import { visitorParticipantComponent } from './visitorParticipant/visitorParticipant.component';
import { networkRegulatorParticipantComponent } from './networkRegulatorParticipant/networkRegulatorParticipant.component';
import { instituteParticipantComponent } from './instituteParticipant/instituteParticipant.component';
import { employerParticipantComponent } from './employerParticipant/employerParticipant.component';
import { studentParticipantComponent } from './studentParticipant/studentParticipant.component';

import { invokeAccessComponent } from './invokeAccess/invokeAccess.component';
import { viewDegreeComponent } from './viewDegree/viewDegree.component';
import { revokeAccessComponent } from './revokeAccess/revokeAccess.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'degreeAsset', component: degreeAssetComponent },
  { path: 'visitorParticipant', component: visitorParticipantComponent },
  { path: 'networkRegulatorParticipant', component: networkRegulatorParticipantComponent },
  { path: 'instituteParticipant', component: instituteParticipantComponent },
  { path: 'employerParticipant', component: employerParticipantComponent },
  { path: 'studentParticipant', component: studentParticipantComponent },
  { path: 'invokeAccess', component: invokeAccessComponent },
  { path: 'viewDegree', component: viewDegreeComponent },
  { path: 'revokeAccess', component: revokeAccessComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
