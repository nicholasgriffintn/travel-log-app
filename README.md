# Travel Log App

This is a simple app that uses the AWS Location service and DynamoDB with AWS Cognito authentication, an Express backend and a React Redux frontend to log people's travel destinations.

## TODO

- [x] Initialise Server and Client
- [x] Iniegrate ininital DynamoDB models
- [x] Add a map in with location tracking
- [x] Swap map to AWS Location map with authentication
- [x] Add none logged in message
- [x] Add a form for adding a new travel log destination
  - [] Form should use AWS Location geocoding so you can type in an address and get a lat long
  - [x] Should be able to click the map to add a location
  - [] Also a button to add your current location to the log
- [x] Public travel logs display (using scan because of dynamo, should move to postgres for prod really)
- [] Add a private travel logs option
- [] Add device tracking for travel history
- [] Add profile view/ edit
- [x] Add states for location tracking
  - [x] location history
  - [x] current location
- [] Add Passport social sign in that creates a COgnito login via the admin SDK, forcing social login as a verification method. https://dev.to/asim_ansari7/setting-up-social-logins-with-node-js-and-passport-js-1m16
- [] Fix issue where markers don't stay in place on scroll
