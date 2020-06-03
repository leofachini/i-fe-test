import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getHeaderText() {
    return element(by.tagName('header')).getText() as Promise<string>;
  }
}
