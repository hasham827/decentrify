/**
 * sets value for allowed employer views by the student
 * @param {org.decentrify.network.invokeAccess} invokeAccess
 * @transaction
 */
async function invokeAccess(tx) {
    
  // checks if secrets are correct
  if(tx.studentSecret != tx.degree.student.studentSecret) {
      throw new Error("SORRY! Incorrect Student-Secret OR Degree-ID.");
  }

  // update the allowed employer views with the new value
  tx.degree.allowedViews=(tx.degree.allowedViews+tx.allowedViews);

  // get the asset registry for the asset
  let degreeRegistry = await getAssetRegistry('org.decentrify.network.degreeAsset');
  
  // update the degree in the degree registry
  await degreeRegistry.update(tx.degree);
}

/**
* decrements view everytime employer views the degree
* @param {org.decentrify.network.viewDegree} viewDegree
* @transaction
*/
async function viewDegree(tx) {

  // checks if secrets are correct
  if(tx.employerSecret != tx.employer.employerSecret) {
      throw new Error("SORRY! Incorrect Employer-Secret OR Degree-ID.");
  }

  // checks if employer is authorized or not
  else if(tx.employer.allowedViews == 0 || tx.degree.allowedViews == 0  || tx.employer.allowedViews>tx.degree.allowedViews) {
      throw new Error("SORRY! No rights to view degree.");
  }

  else {
  // update the asset with the new value, decrements on every view
  tx.degree.allowedViews=(tx.degree.allowedViews-1);
  tx.employer.allowedViews=(tx.employer.allowedViews-1);

  // get the resource registry for respective resource
  let degreeRegistry = await getAssetRegistry('org.decentrify.network.degreeAsset');
  let participantRegistry = await getParticipantRegistry('org.decentrify.network.employerParticipant');
    
  // update the resources in the resource registry
  await degreeRegistry.update(tx.degree);
  await participantRegistry.update(tx.employer);
  }
}

/**
* when student revokes degree view access
* @param {org.decentrify.network.revokeAccess} revokeAccess
* @transaction
*/
async function revokeAccess(tx) {

  // checks if secret is correct
  if(tx.studentSecret!=tx.degree.student.studentSecret) {
      throw new Error("SORRY! Incorrect Student-Secret OR Degree-ID.");
  }

  else {
  // update the asset with the new value, decrements on every view
  tx.degree.allowedViews=(tx.degree.allowedViews-tx.employer.allowedViews);
  tx.employer.allowedViews=0;

  // get the resource registry for respective resource
  let degreeRegistry = await getAssetRegistry('org.decentrify.network.degreeAsset');
  let participantRegistry = await getParticipantRegistry('org.decentrify.network.employerParticipant');
    
  // update the resources in the resource registry
  await degreeRegistry.update(tx.degree);
  await participantRegistry.update(tx.employer);
  }
}
