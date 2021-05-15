# Travel Log App

This is a simple app that uses the AWS Location service and DynamoDB with AWS Cognito authentication, an Express backend and a React Redux frontend to log people's travel destinations.

## TODO

- [x] Initialise Server and Client
- [x] Iniegrate ininital DynamoDB models
- [x] Add a map in with location tracking
- [x] Swap map to AWS Location map with authentication
- [] Add none logged in message
- [] Add a form for adding a new travel log destination
  - [] Form should use AWS Location geocoding so you can type in an address and get a lat long
  - [] Should be able to click the map to add a location
  - [] Also a button to add your current location to the log
- [] Public travel logs display
- [] Add a private travel logs option
- [] Add device tracking for travel history
- [] Header should show a login button to shows a login modal when you click it
  - [] If logged in the ability to add logs should show
