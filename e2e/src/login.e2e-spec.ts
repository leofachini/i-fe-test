import { LoginPage } from './login.po';
import { browser, logging, protractor } from 'protractor';

describe('App login view', () => {
  let page: LoginPage;

  beforeEach(() => {
    page = new LoginPage();
  });

  it('should have a tag header with \'Enter in MyFlix\' text', () => {
    page.navigateTo();
    expect(browser.getCurrentUrl()).toContain('login');
    expect(page.getHeaderText()).toEqual('Enter in MyFlix');
  });

  it('it should redirect to dashboard route \'/\' after login', () => {
    page.navigateTo();
    expect(browser.getCurrentUrl()).toContain('login');
    page.login();

    const EC = protractor.ExpectedConditions;

    browser.wait(EC.urlContains('/'), 5000).then(function(result) {
      expect(result).toEqual(true);
    });

  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
