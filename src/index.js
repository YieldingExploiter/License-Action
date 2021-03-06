'use strict';
const core = require('@actions/core');
const lcc = require('../license-compatibility-checker/lib');
// const updateNotifier = require('update-notifier');
// updateNotifier({ pkg }).notify();
const path = require('path'), fs = require('fs'),
  readdirRecursiveSync = (dir, maxDepth, depth)=> {
    if (depth && depth > (maxDepth || 10))
      return [];
    const list = fs.readdirSync(dir).map(v=>path.resolve(dir, v));
    let pending = list.filter(v=>fs.statSync(v).isDirectory());

    if (pending.length <= 0)
      return list.filter(v=>fs.statSync(v).isFile());
    else {
      pending.forEach(dir=>readdirRecursiveSync(dir, maxDepth || 10, depth ? depth + 1 : 1).forEach(v=>list.push(v)));
      return list.filter(v=>fs.statSync(v).isFile());
    }
  },
  returnCode = (()=>{
    try {
      let exceptions = core.getInput('ignored-deps').split('\n')
        .map(v=>v.trim())
        .filter(v=>v.startsWith('#'));
      if (exceptions.length < 1)
        exceptions = [
          'dependency-1',
          'dependency-2',
          'test-passing',
          'test-failing',
          'undefined'
        ];
      if (process.argv.includes('testing')) {
        // not used by project, not bundled
        exceptions.push('@parcel/css', '@parcel/css-win32-x64-msvc', 'caniuse-lite');
        // dependency of dependency, dead code in this project afaik
        exceptions.push('spdx-exceptions');
      }

      const root = path.resolve(process.cwd(), core.getInput('project-root'));
      if (!fs.existsSync(root))
        throw new Error(`Invalid Path ${root}!`);
      const pkg = path.resolve(root, 'package.json');
      if (!fs.existsSync(pkg))
        throw new Error('Cannot find package.json at %s!', pkg);
      console.log('Checking for Packages at %s...', root);
      const entries = [],
        files = readdirRecursiveSync(root).filter(file=>['package.json', // 'license', 'license.txt', 'license.md', 'readme.md'
        ].includes(file.split('\\').join('/')
          .split('/')
          .pop()
          .toLowerCase()))
          .filter(v=>{
            try {
              const json = JSON.parse(fs.readFileSync(v, 'utf-8'));
              return !exceptions.includes((json.name || json.displayName || 'undefined').toString());
            } catch (error) {
              console.error('Error reading JSON for', v, '\nError:\n', error);
              return false;
            }
          })
          .map(v=>path.join(v, '..'))
          .filter(v=>{v = v.split('\\').join('/')
            .split('/');return v.filter((v)=>!v.startsWith('.')).length === v.length;})
          // eslint-disable-next-line no-confusing-arrow
          .filter(v=>entries.includes(v) ? false : entries.push(v) ? true : true);
      console.log('Checking %s Direrctories...', files.length.toString());
      lcc.check(pkg, files, (err, passed, output)=>{
        if (err)
          throw err;
        else if (passed)
          console.log('Passed!\nOutput:\n', output);
        else
        {
          console.error('Did not pass!\nOutput:\n', output);
          throw new Error('Did not pass!');
        }
      });
    } catch (error) {
      core.setFailed(error.message);
      throw error;
    }
  })() ?? 0;
if (returnCode !== 0)
  core.setFailed('See Log for error');
process.exit(returnCode);
