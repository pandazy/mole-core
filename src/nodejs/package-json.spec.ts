import { readUserFile } from './files';
import { readUserPackageJSON } from './package-json';

jest.mock('./files', () => ({
  readUserFile: jest.fn().mockReturnValue('{"scripts": {"foo": "bar", "baz": "qux"}}'),
}));

describe('nodejs.packageJson', () => {
  it('should read user package.json', () => {
    expect(readUserPackageJSON()).toStrictEqual({
      scripts: {
        foo: 'bar',
        baz: 'qux',
      },
    });
    expect(readUserFile).toHaveBeenCalledWith('package.json');
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
