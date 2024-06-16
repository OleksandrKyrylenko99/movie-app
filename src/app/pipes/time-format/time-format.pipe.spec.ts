import { TimeFormat } from './time-format.pipe';

describe('TimeFormat', () => {
  it('create an instance', () => {
    const pipe = new TimeFormat();
    expect(pipe).toBeTruthy();
  });
});
