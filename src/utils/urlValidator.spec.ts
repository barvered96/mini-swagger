import { TestBed } from '@angular/core/testing';
import { validURL } from './urlValidator';

describe('Testing Url Validator Function', () => {
  const url1 = '';
  const url2 = 'https://';
  const url3 = 'https://cs';
  const url4 = 'https://bar.com';
  const url5 = 'http://bar.com';
  const url6 = 'http://bar.com.co.il.ga';

  it('Should return invalid urls', () => {
    expect(validURL(url1)).toBeFalsy();
    expect(validURL(url2)).toBeFalsy();
    expect(validURL(url3)).toBeFalsy();
  });

  it('Should return valid url', () => {
    expect(validURL(url4)).toBeTruthy();
    expect(validURL(url5)).toBeTruthy();
    expect(validURL(url6)).toBeTruthy();
  });
});

