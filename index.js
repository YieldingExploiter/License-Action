'use strict';
const core = require('@actions/core');
const github = require('@actions/github');
const lcc = require('./license-compatibility-checker');
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
      const root = path.resolve(process.cwd(), core.getInput('project-root'));
      if (!fs.existsSync(root))
        throw new Error(`Invalid Path ${root}!`);
      const pkg = path.resolve(root, 'package.json');
      if (!fs.existsSync(pkg))
        throw new Error('Cannot find package.json at %s!', pkg);
      console.log('Checking Licenses at %s...', root);
      const entries = [],
        files = readdirRecursiveSync(root).filter(file=>[
          'package.json', 'license', 'license.txt', 'license.md', 'readme.md'
        ].includes(file.toLowerCase()))
          .map(v=>path.join(v, '..'))
          // eslint-disable-next-line no-confusing-arrow
          .filter(v=>entries.includes(v) ? false : entries.push(v) ? true : true);
      lcc.check(pkg, files, (err, passed, output)=>{
        if (err)
          throw err;
        else if (passed)
          console.log(output);
        else
        {
          console.log(output);
          throw new Error('Unknown Error');
        }
      });
    } catch (error) {
      core.setFailed(error.message);
    }
  })() ?? 0;
if (returnCode !== 0)
  core.setFailed('See Log for error');
process.exit(returnCode);
