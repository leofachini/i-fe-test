# Ilegra Front-End Enginner Test Case

## **General info**

Techinical requirements:

- Docker `19.03.8`
- Docker-Compose `1.25.5`
- Git `2.16.3`
- Node.js `12.13.0`
- Npm `6.14.5`

Once you have all these thing set you can run a `npm ci` in app root folder to install all project's dependencies. Then go to the `Development server` or `Docker compose` section to run the application.

You can log into this application with one of the following credentials (user / password):

1. **bob** / **dylan**
2. **kate** / **moss**
3. **quentin** / **tarantino**

### Docker compose

Run `docker-compose up` in the application root directory, then access the application into `http://localhost`.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
PS: Remember that you must install your dependencies with `npm ci` before trying to serve the application.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build or set `NODE_ENV=production` environment variable.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
Also, worth notice that it will generate a code coverage report into `./coverage/` folder.

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Running lint

Run `ng lint` to execute the linter in the project.

### Generate documentation

Run `npm run doc:gen` to generate project documentation.

### Generate documentation

Run `npm run doc:serve` to serve the generated project documentation.

### Further help

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.20.

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## **Pain points**

1. Found problems with style of inner elements inside `ng-content`, reggarding ng-deep
2. Decide about where to declare components in a SharedModule or to repeat some of them in each modules
3. Documentation

   Undetailed documentation definition of what need to be done, such as: Definition of what is "Top priority" regarding movies order.

   Found mismatching or outdated directions in documentation, in keep in mind section: "So we will login with 1 user post some stuff, login with user 2 post more stuff and we will login with user 1 again and we hope see user 2 posts on user 1 timeline. I'm sure you all know have a social network works or should work". We aren't suposed to create any post nothing on each oder timeline in this MyFlix chalenge.

## **Good things**

1. Unit-test helped me to avoid errors in an refactoring that I've done
2. End-To-End tests also helped me to avoid the break of the login functionality
3. Typescript type really improve our capability of having miss type matchings (if used properly)
4. Angular Material Components helped me to keep consistency in the UI

## **Further enhancements**

1. Add support to multiple languages (i18n)
2. Add ghost elements for components that are doing back-end requests and blocking the UI from rendering
3. Add destructuring to Model constructors
4. Add header in named route to avoid handle ng-if there.
5. Move header to a component instead of keep it in the app component.
6. Set app routes in a constant variable
