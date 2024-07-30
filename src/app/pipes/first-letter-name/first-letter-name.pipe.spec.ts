import { FirstLetterNamePipe } from './first-letter-name.pipe';

describe('FirstLetterPipe', () => {
  it('create an instance', () => {
    const pipe = new FirstLetterNamePipe();
    expect(pipe).toBeTruthy();
  });
});
