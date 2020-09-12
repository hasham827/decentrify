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

import { AngularTestPage } from './app.po';
import { ExpectedConditions, browser, element, by } from 'protractor';
import {} from 'jasmine';


describe('Starting tests for decentrify-angular-app', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be decentrify-angular-app', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('decentrify-angular-app');
    })
  });

  it('network-name should be decentrify@0.0.1',() => {
    element(by.css('.network-name')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('decentrify@0.0.1.bna');
    });
  });

  it('navbar-brand should be decentrify-angular-app',() => {
    element(by.css('.navbar-brand')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('decentrify-angular-app');
    });
  });

  
    it('degreeAsset component should be loadable',() => {
      page.navigateTo('/degreeAsset');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('degreeAsset');
      });
    });

    it('degreeAsset table should have 9 columns',() => {
      page.navigateTo('/degreeAsset');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(9); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('visitorParticipant component should be loadable',() => {
      page.navigateTo('/visitorParticipant');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('visitorParticipant');
      });
    });

    it('visitorParticipant table should have 4 columns',() => {
      page.navigateTo('/visitorParticipant');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });
  
    it('networkRegulatorParticipant component should be loadable',() => {
      page.navigateTo('/networkRegulatorParticipant');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('networkRegulatorParticipant');
      });
    });

    it('networkRegulatorParticipant table should have 4 columns',() => {
      page.navigateTo('/networkRegulatorParticipant');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });
  
    it('instituteParticipant component should be loadable',() => {
      page.navigateTo('/instituteParticipant');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('instituteParticipant');
      });
    });

    it('instituteParticipant table should have 6 columns',() => {
      page.navigateTo('/instituteParticipant');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });
  
    it('employerParticipant component should be loadable',() => {
      page.navigateTo('/employerParticipant');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('employerParticipant');
      });
    });

    it('employerParticipant table should have 8 columns',() => {
      page.navigateTo('/employerParticipant');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(8); // Addition of 1 for 'Action' column
      });
    });
  
    it('studentParticipant component should be loadable',() => {
      page.navigateTo('/studentParticipant');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('studentParticipant');
      });
    });

    it('studentParticipant table should have 8 columns',() => {
      page.navigateTo('/studentParticipant');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(8); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('invokeAccess component should be loadable',() => {
      page.navigateTo('/invokeAccess');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('invokeAccess');
      });
    });
  
    it('viewDegree component should be loadable',() => {
      page.navigateTo('/viewDegree');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('viewDegree');
      });
    });
  
    it('revokeAccess component should be loadable',() => {
      page.navigateTo('/revokeAccess');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('revokeAccess');
      });
    });
  

});