# SalesPredictionApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.3.
![imagen](https://github.com/user-attachments/assets/07412b23-f6cb-4e9e-91ec-68adafb6c5b9)

## Prerequisites

Node.js (v16 or higher)
npm (v8 or higher)
Angular CLI v19.2.3

## Installation

1.Clone the repository
git clone <repository-url>
cd sales-prediction-app

2.Install dependencies
npm install

3.Make sure the SQL Server backend is running and accessible at the URL configured in the environment files

## Development server

Run ng serve for a dev server. Navigate to http://localhost:4200/. The application will automatically reload if you change any of the source files.

## Build
Run ng build to build the project. The build artifacts will be stored in the dist/ directory.

## Running unit tests
Run ng test to execute the unit tests via Karma.

## Features
-Sales Date Prediction View: Displays a list of clients with their last order date and predicted next order date
-Orders View: Shows all orders for a selected client
-New Order Form: Allows creation of new orders with product details

## Implementation Notes
-The application is built with Angular 19 and Angular Material
-All components follow the requirements specified in the technical test document
-The application implements server-side filtering, sorting, and pagination
-The forms include validation for all required fields and data types

## Project Structure
src/app/models: Contains all data models
src/app/services: Contains services for API communication
src/app/components: Contains all application components

  sales-prediction: Home component displaying client predictions
  orders-view: Modal component showing client orders
  new-order-form: Modal component for creating new orders

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
