import { readUserFile } from './files';
import { extractForUserScripts, readUserPackageJSON } from './package-json';

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

  it("should convert a package.json's package to new settings", () => {
    const packageJSON = {
      scripts: {
        foo: 'bar',
        baz: 'qux',
      },
    };

    expect(extractForUserScripts(packageJSON, { excludes: new Set(['baz']) })).toStrictEqual({
      foo: 'bar',
    });

    expect(
      extractForUserScripts(packageJSON, { specials: { foo: (val) => `new-${val}` } })
    ).toStrictEqual({
      foo: 'new-bar',
      baz: 'qux',
    });
  });
});
