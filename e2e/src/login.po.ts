import { browser, by, element } from 'protractor';

export class LoginPage {
  navigateTo() {
    return browser.get('/login') as Promise<any>;
  }

  getLoginFormComponent() {
    return element(by.tagName('login-form'));
  }

  getHeaderText() {
    return element(by.tagName('h1')).getText();
  }

  insertUser(user: string) {
    element(by.id('username')).sendKeys(user);
  }

  insertPassword(password: string) {
    element(by.id('password')).sendKeys(password);
  }

  submitForm() {
    element(by.id('loginButton')).click();
  }

  login() {
    this.insertUser('bob');
    this.insertPassword('dylan');
    this.submitForm();
  }

}
