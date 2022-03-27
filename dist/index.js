var $gXNCa$process = require("process");
var $gXNCa$actionscore = require("@actions/core");
var $gXNCa$path = require("path");
var $gXNCa$fs = require("fs");
var $gXNCa$colorssafe = require("colors/safe");
var $gXNCa$os = require("os");

'use strict';


var $aa1cd37bc2b19590$exports = {};
'use strict';
var $e4f9510478b716e9$exports = {};
$e4f9510478b716e9$exports = JSON.parse("{\"Public Domain\":[\"CC0-1.0\",\"PDDL-1.0\",\"SAX-PD\",\"Unlicense\"],\"Permissive\":[\"AFL-1.1\",\"AFL-1.2\",\"AFL-2.0\",\"AFL-2.1\",\"AFL-3.0\",\"Apache-1.0\",\"Apache-1.1\",\"Apache-2.0\",\"Artistic-2.0\",\"BSD-2-Clause\",\"BSD-3-Clause\",\"BSD-3-Clause-Attribution\",\"BSD-3-Clause-Clear\",\"BSD-2-Clause-FreeBSD\",\"BSD-3-Clause-LBNL\",\"BSD-2-Clause-NetBSD\",\"BSD-3-Clause-No-Nuclear-License\",\"BSD-3-Clause-No-Nuclear-License-2014\",\"BSD-3-Clause-No-Nuclear-Warranty\",\"BSD-4-Clause\",\"BSD-4-Clause-UC\",\"DSDP\",\"ECL-2.0\",\"ISC\",\"MIT\",\"X11\",\"WTFPL\",\"OLDAP-2.2.2\",\"OLDAP-1.1\",\"OLDAP-1.2\",\"OLDAP-1.3\",\"OLDAP-1.4\",\"OLDAP-2.0\",\"OLDAP-2.0.1\",\"OLDAP-2.1\",\"OLDAP-2.2\",\"OLDAP-2.2.1\",\"OLDAP-2.3\",\"OLDAP-2.4\",\"OLDAP-2.5\",\"OLDAP-2.6\",\"OLDAP-2.7\",\"OLDAP-2.8\",\"PHP-3.0\",\"PHP-3.01\",\"Python-2.0\",\"Zlib\",\"zlib-acknowledgement\",\"XFree86-1.1\",\"W3C-20150513\",\"W3C-19980720\",\"W3C\",\"OpenSSL\",\"Naumen\",\"JasPer-2.0\",\"EFL-1.0\",\"EFL-2.0\",\"MIT-advertising\",\"MIT-enna\",\"MIT-CMU\",\"APSL-1.0\",\"Beerware\",\"CECILL-1.0\",\"CECILL-1.1\",\"CECILL-2.0\",\"CECILL-2.1\",\"CECILL-B\",\"CNRI-Jython\",\"CNRI-Python\",\"CNRI-Python-GPL-Compatible\",\"Condor-1.1\",\"MIT-feh\",\"FTL\",\"ICU\",\"Ruby\",\"Sendmail\",\"iMatix\",\"xinetd\",\"ZPL-1.1\",\"ZPL-2.0\",\"ZPL-2.1\",\"TCL\"],\"Weakly Protective\":[\"LGPL-2.0\",\"LGPL-2.1\",\"LGPL-2.1+\",\"LGPL-3.0\",\"LGPL-3.0+\",\"MPL-2.0\",\"MPL-1.0\",\"MPL-1.1\",\"MPL-2.0-no-copyleft-exception\",\"CDDL-1.0\",\"CDDL-1.1\",\"MS-PL\",\"Sleepycat\",\"ClArtistic\",\"Artistic-1.0\",\"Artistic-1.0-Perl\",\"Artistic-1.0-cl8\",\"APSL-1.1\",\"APSL-1.2\",\"APSL-2.0\",\"LPPL-1.0\",\"LPPL-1.1\",\"LPPL-1.2\",\"LPPL-1.3a\",\"LPPL-1.3c\",\"CPAL-1.0\",\"CATOSL-1.1\",\"CUA-OPL-1.0\",\"ErlPL-1.1\",\"gSOAP-1.3b\",\"IPL-1.0\",\"NASA-1.3\",\"NOSL\",\"Nokia\",\"RHeCos-1.1\",\"RSCPL\",\"SugarCRM-1.1.3\",\"SISSL\",\"SISSL-1.2\",\"SPL-1.0\",\"Zimbra-1.3\",\"Zimbra-1.4\",\"BitTorrent-1.0\",\"BitTorrent-1.1\",\"CECILL-C\",\"Motosoto\",\"MS-LRL\",\"Watcom-1.0\",\"YPL-1.0\",\"YPL-1.1\",\"Interbase-1.0\"],\"Strongly Protective\":[\"CPL-1.0\",\"GPL-1.0\",\"GPL-3.0\",\"GPL-3.0+\",\"GPL-2.0\",\"GPL-2.0+\",\"MS-RL\",\"ODbL-1.0\",\"OSL-1.0\",\"OSL-1.1\",\"OSL-2.0\",\"OSL-2.1\",\"OSL-3.0\",\"RPL-1.1\",\"RPL-1.5\",\"APL-1.0\",\"EPL-1.0\",\"EPL-2.0\",\"EUPL-1.0\",\"EUPL-1.1\",\"IPA\",\"Vim\"],\"Network Protective\":[\"AGPL-1.0\",\"AGPL-3.0\",\"AGPL-3.0-only\",\"AGPL-3.0-or-later\",\"AGPL-1.0-only\",\"AGPL-1.0-or-later\"],\"Uncategorized\":[\"0BSD\",\"AAL\",\"Abstyles\",\"Adobe-2006\",\"Adobe-Glyph\",\"ADSL\",\"Afmparse\",\"Aladdin\",\"AMDPLPA\",\"AML\",\"AMPAS\",\"ANTLR-PD\",\"APAFML\",\"Bahyph\",\"Barr\",\"Borceux\",\"BSD-Protection\",\"BSD-Source-Code\",\"BSL-1.0\",\"bzip2-1.0.5\",\"bzip2-1.0.6\",\"Caldera\",\"CC-BY-1.0\",\"CC-BY-2.0\",\"CC-BY-2.5\",\"CC-BY-3.0\",\"CC-BY-4.0\",\"CC-BY-NC-1.0\",\"CC-BY-NC-2.0\",\"CC-BY-NC-2.5\",\"CC-BY-NC-3.0\",\"CC-BY-NC-4.0\",\"CC-BY-NC-ND-1.0\",\"CC-BY-NC-ND-2.0\",\"CC-BY-NC-ND-2.5\",\"CC-BY-NC-ND-3.0\",\"CC-BY-NC-ND-4.0\",\"CC-BY-NC-SA-1.0\",\"CC-BY-NC-SA-2.0\",\"CC-BY-NC-SA-2.5\",\"CC-BY-NC-SA-3.0\",\"CC-BY-NC-SA-4.0\",\"CC-BY-ND-1.0\",\"CC-BY-ND-2.0\",\"CC-BY-ND-2.5\",\"CC-BY-ND-3.0\",\"CC-BY-ND-4.0\",\"CC-BY-SA-1.0\",\"CC-BY-SA-2.0\",\"CC-BY-SA-2.5\",\"CC-BY-SA-3.0\",\"CC-BY-SA-4.0\",\"CPOL-1.02\",\"Crossword\",\"CrystalStacker\",\"Cube\",\"curl\",\"D-FSL-1.0\",\"diffmark\",\"DOC\",\"Dotseqn\",\"dvipdfm\",\"ECL-1.0\",\"eGenix\",\"Entessa\",\"EUDatagrid\",\"Eurosym\",\"Fair\",\"Frameworx-1.0\",\"FreeImage\",\"FSFAP\",\"FSFUL\",\"FSFULLR\",\"GFDL-1.1\",\"GFDL-1.2\",\"GFDL-1.3\",\"Giftware\",\"GL2PS\",\"Glide\",\"Glulxe\",\"gnuplot\",\"HaskellReport\",\"HPND\",\"IBM-pibs\",\"IJG\",\"ImageMagick\",\"Imlib2\",\"Info-ZIP\",\"Intel\",\"Intel-ACPI\",\"JSON\",\"LAL-1.2\",\"LAL-1.3\",\"Latex2e\",\"Leptonica\",\"LGPLLR\",\"Libpng\",\"libtiff\",\"LiLiQ-P-1.1\",\"LiLiQ-R-1.1\",\"LiLiQ-Rplus-1.1\",\"LPL-1.0\",\"LPL-1.02\",\"MakeIndex\",\"MirOS\",\"MITNFA\",\"mpich2\",\"MTLL\",\"Multics\",\"Mup\",\"NBPL-1.0\",\"NCSA\",\"Net-SNMP\",\"NetCDF\",\"Newsletr\",\"NGPL\",\"NLOD-1.0\",\"NLPL\",\"Noweb\",\"NPL-1.0\",\"NPL-1.1\",\"NPOSL-3.0\",\"NRL\",\"NTP\",\"Nunit\",\"OCCT-PL\",\"OCLC-2.0\",\"OFL-1.0\",\"OFL-1.1\",\"OGTSL\",\"OML\",\"OPL-1.0\",\"OSET-PL-2.1\",\"Plexus\",\"PostgreSQL\",\"psfrag\",\"psutils\",\"Qhull\",\"QPL-1.0\",\"Rdisc\",\"RPSL-1.0\",\"RSA-MD\",\"Saxpath\",\"SCEA\",\"SGI-B-1.0\",\"SGI-B-1.1\",\"SGI-B-2.0\",\"SimPL-2.0\",\"SMLNJ\",\"SMPPL\",\"SNIA\",\"Spencer-86\",\"Spencer-94\",\"Spencer-99\",\"SWL\",\"TCP-wrappers\",\"TMate\",\"TORQUE-1.1\",\"TOSL\",\"Unicode-DFS-2015\",\"Unicode-DFS-2016\",\"Unicode-TOU\",\"UPL-1.0\",\"VOSTROM\",\"VSL-1.0\",\"Wsuipa\",\"Xerox\",\"Xnet\",\"xpp\",\"XSkat\",\"Zed\",\"Zend-2.0\"]}");






const /** @private */ $aa1cd37bc2b19590$var$licenseTypes = {
    'publicDomain': 'Public Domain',
    'permissive': 'Permissive',
    'weaklyProtective': 'Weakly Protective',
    'stronglyProtectivee': 'Strongly Protective',
    'networkProtective': 'Network Protective',
    'unknown': 'Unknown',
    'unlicensed': 'Unlicensed'
}, // var correct = require('spdx-correct');
/** @private */ /*
var correctedLicense = function(license) {
    return license ? correct(license) : licenseTypes.unlicensed;
};
*/ /** @private */ $aa1cd37bc2b19590$var$license_type = function(license) {
    // license = license ? license.replace('+', '') : licenseTypes.unlicensed;
    // gives false positives try MMIT
    // license = correctedLicense(license);
    if (!license) // console.log('NO license found:', license);
    return $aa1cd37bc2b19590$var$licenseTypes.unlicensed;
    else if ($e4f9510478b716e9$exports[$aa1cd37bc2b19590$var$licenseTypes.publicDomain].indexOf(license) >= 0) return $aa1cd37bc2b19590$var$licenseTypes.publicDomain;
    else if ($e4f9510478b716e9$exports[$aa1cd37bc2b19590$var$licenseTypes.permissive].indexOf(license) >= 0) return $aa1cd37bc2b19590$var$licenseTypes.permissive;
    else if ($e4f9510478b716e9$exports[$aa1cd37bc2b19590$var$licenseTypes.weaklyProtective].indexOf(license) >= 0) return $aa1cd37bc2b19590$var$licenseTypes.weaklyProtective;
    else if ($e4f9510478b716e9$exports[$aa1cd37bc2b19590$var$licenseTypes.stronglyProtectivee].indexOf(license) >= 0) return $aa1cd37bc2b19590$var$licenseTypes.stronglyProtectivee;
    else if ($e4f9510478b716e9$exports[$aa1cd37bc2b19590$var$licenseTypes.networkProtective].indexOf(license) >= 0) return $aa1cd37bc2b19590$var$licenseTypes.networkProtective;
    else // console.log('Unknown license type:', license);
    return $aa1cd37bc2b19590$var$licenseTypes.unknown;
}, /** @private */ $aa1cd37bc2b19590$var$forward_compatiblity = function(pkgLicenseType, moduleLicenseType) {
    switch(moduleLicenseType){
        case $aa1cd37bc2b19590$var$licenseTypes.unlicensed:
            return false;
        case $aa1cd37bc2b19590$var$licenseTypes.unknown:
            return false;
        case $aa1cd37bc2b19590$var$licenseTypes.publicDomain:
            return [
                $aa1cd37bc2b19590$var$licenseTypes.unlicensed,
                $aa1cd37bc2b19590$var$licenseTypes.unknown,
                $aa1cd37bc2b19590$var$licenseTypes.publicDomain,
                $aa1cd37bc2b19590$var$licenseTypes.permissive,
                $aa1cd37bc2b19590$var$licenseTypes.weaklyProtective,
                $aa1cd37bc2b19590$var$licenseTypes.stronglyProtectivee,
                $aa1cd37bc2b19590$var$licenseTypes.networkProtective
            ].indexOf(pkgLicenseType) >= 0;
        case $aa1cd37bc2b19590$var$licenseTypes.permissive:
            return [
                $aa1cd37bc2b19590$var$licenseTypes.unlicensed,
                $aa1cd37bc2b19590$var$licenseTypes.permissive,
                $aa1cd37bc2b19590$var$licenseTypes.weaklyProtective,
                $aa1cd37bc2b19590$var$licenseTypes.stronglyProtectivee,
                $aa1cd37bc2b19590$var$licenseTypes.networkProtective
            ].indexOf(pkgLicenseType) >= 0;
        case $aa1cd37bc2b19590$var$licenseTypes.weaklyProtective:
            return [
                $aa1cd37bc2b19590$var$licenseTypes.unlicensed,
                $aa1cd37bc2b19590$var$licenseTypes.weaklyProtective,
                $aa1cd37bc2b19590$var$licenseTypes.stronglyProtectivee,
                $aa1cd37bc2b19590$var$licenseTypes.networkProtective
            ].indexOf(pkgLicenseType) >= 0;
        case $aa1cd37bc2b19590$var$licenseTypes.stronglyProtectivee:
            return [
                $aa1cd37bc2b19590$var$licenseTypes.unlicensed,
                $aa1cd37bc2b19590$var$licenseTypes.stronglyProtectivee,
                $aa1cd37bc2b19590$var$licenseTypes.networkProtective
            ].indexOf(pkgLicenseType) >= 0;
        case $aa1cd37bc2b19590$var$licenseTypes.networkProtective:
            return [
                $aa1cd37bc2b19590$var$licenseTypes.unlicensed,
                $aa1cd37bc2b19590$var$licenseTypes.networkProtective
            ].indexOf(pkgLicenseType) >= 0;
        default:
            // console.log('Unknown license',module_license,'('+moduleLicenseType+')');
            return false;
    }
};
/*
var https = require('https');

function getLicenses(callback) {
    return https.get({
        host: 'spdx.org',
        path: '/licenses/licenses.json'
    }, function(response) {
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
            // Data reception is done, do whatever with it!
            var parsed = JSON.parse(body);
            callback(parsed.licenses);
        });
    });
}
*/ /** @private */ /*
function compareLicenses(to) {
    getLicenses(function(licenses) {
        licenses.forEach(function(element, index, array) {
            if (!element.isDeprecatedLicenseId)
                console.log(element.licenseId + ' => ' + element.name, ' compatible: ', forward_compatiblity(to, element.licenseId));
            else
                console.log('DEPRECATED!', element.licenseId + ' -> ' + element.name, ' compatible:', forward_compatiblity(to, element.licenseId));
        });
    });
}
*/ // compareLicenses(pkg.license);
/**
 * Callback for license check.
 *
 * @callback licenseCheckCallback
 * @param {String} err - Information about the error.
 * @param {Boolean} passed - True if there were no license issues, otherwise false.
 * @param {string} output - Output to be printed to Console (including colors).
 */ /** @private */ function $aa1cd37bc2b19590$var$checkProgress(progress, total, incompat, output, cb) {
    progress++;
    if (progress === total) {
        if (incompat) {
            output.push('');
            output.push($gXNCa$colorssafe.red('License issues found'));
            output.push('');
            // console.log(output.join(os.EOL));
            cb(null, false, output.join($gXNCa$os.EOL));
        } else {
            output.push('');
            output.push($gXNCa$colorssafe.green('No license issues found'));
            output.push('');
            // console.log(output.join(os.EOL));
            cb(null, true, output.join($gXNCa$os.EOL));
        }
    }
    return progress;
}
/**
 * @public
 * @function check
 * @description Check for licenses issues of the given project.json compared (flat) to a folder of node_modules
 * @param {string} pathOfPackageJson - The path of the package.json to check against
 * @param {string} dirs - List of node module directories
 * @param {licenseCheckCallback} cb - Callback for license check.
 * @example
 * var lcc = require('license-compatibility-checker');
 * var path = require('path');
 * lcc.check(path.join(process.cwd(),'package.json'), path.join(process.cwd(),"node_modules"), function(err, passed, output){
 *   if (err) console.log(err);
 *   else if (passed)
 *   {
 * 	   //No license issues found
 * 	   console.log(output);
 *   } else
 *   {
 * 	   //License issues found
 * 	   console.log(output);
 * 	   //process.exit(1);
 * 	   //or
 * 	   //throw new Error('License issues found');
 *   }
 * });
 */ function $aa1cd37bc2b19590$var$check(pathOfPackageJson, dirs, cb) {
    let incompat = false, pkg = JSON.parse($gXNCa$fs.readFileSync(pathOfPackageJson, 'utf-8')), output = [], noLicenseStr = $gXNCa$colorssafe.red('No license'), pkgLicense = pkg.license ? typeof pkg.license === 'string' || pkg.license instanceof String ? pkg.license : pkg.license.type || pkgLicense : pkgLicense;
    pkgLicense = pkgLicense ? pkgLicense : pkg.licenses && pkg.licenses[0] && pkg.licenses[0].type ? typeof pkg.licenses[0].type === 'string' || pkg.licenses[0].type instanceof String ? pkg.licenses[0].type : pkg.licenses.type || pkgLicense : pkgLicense;
    let pkgLicenseType = $aa1cd37bc2b19590$var$license_type(pkgLicense);
    output.push($gXNCa$colorssafe.yellow('Checking', $gXNCa$colorssafe.blue(pkgLicense ? pkgLicense : noLicenseStr), `(${pkgLicenseType})`, 'of', `${pkg.name}@${pkg.version}`, $gXNCa$os.EOL, 'in', $gXNCa$colorssafe.blue($gXNCa$path.resolve(pathOfPackageJson)), $gXNCa$os.EOL, 'against', `${$gXNCa$colorssafe.blue($gXNCa$path.resolve(pathOfPackageJson, '..'))}'s modules:`));
    output.push('');
    let pkgCompatiblityString;
    if (pkgLicenseType === $aa1cd37bc2b19590$var$licenseTypes.unknown || pkgLicenseType === $aa1cd37bc2b19590$var$licenseTypes.unlicensed) // incompat = true;
    pkgCompatiblityString = 'possibly incompatible';
    else pkgCompatiblityString = 'incompatible';
    let progress = 0, total = dirs.length;
    dirs.forEach((dir)=>{
        let packageJsonFile = $gXNCa$path.join(dir, 'package.json');
        try {
            $gXNCa$fs.accessSync(packageJsonFile);
            const data = $gXNCa$fs.readFileSync(packageJsonFile);
            console.log('Checking', `${packageJsonFile}; file`, progress + 1, 'of', total);
            let modulePkg = JSON.parse(data), moduleLicense = modulePkg.license ? typeof modulePkg.license === 'string' || modulePkg.license instanceof String ? modulePkg.license : modulePkg.license.type || null : null;
            moduleLicense = moduleLicense ? moduleLicense : modulePkg.licenses && modulePkg.licenses[0] && modulePkg.licenses[0].type ? typeof modulePkg.licenses[0].type === 'string' || modulePkg.licenses[0].type instanceof String ? modulePkg.licenses[0].type : pkg.licenses.type || moduleLicense : moduleLicense;
            let moduleLicenseType = $aa1cd37bc2b19590$var$license_type(moduleLicense);
            if (moduleLicenseType === $aa1cd37bc2b19590$var$licenseTypes.unknown || moduleLicenseType === $aa1cd37bc2b19590$var$licenseTypes.unlicensed) // incompat = true;
            output.push(`${modulePkg.name}@${modulePkg.version} ${$gXNCa$colorssafe.red(moduleLicense ? moduleLicense : noLicenseStr)} ${$gXNCa$colorssafe.yellow(`(${moduleLicenseType}) - ${$gXNCa$colorssafe.red('possibly incompatible')} with ${$gXNCa$colorssafe.blue(pkgLicense ? pkgLicense : noLicenseStr)} (${pkgLicenseType})`)}`);
            else if (!$aa1cd37bc2b19590$var$forward_compatiblity(pkgLicenseType, moduleLicenseType)) {
                incompat = true;
                output.push(`${modulePkg.name}@${modulePkg.version} ${$gXNCa$colorssafe.red(moduleLicense)} ${$gXNCa$colorssafe.yellow(`(${moduleLicenseType}) - ${$gXNCa$colorssafe.red(pkgCompatiblityString)} with ${$gXNCa$colorssafe.blue(pkgLicense ? pkgLicense : noLicenseStr)} (${pkgLicenseType})`)}`);
            } else output.push(`${modulePkg.name}@${modulePkg.version} ${$gXNCa$colorssafe.green(moduleLicense)} ${$gXNCa$colorssafe.yellow(`(${moduleLicenseType}) -`, `${$gXNCa$colorssafe.green('compatible')} with ${$gXNCa$colorssafe.blue(pkgLicense ? pkgLicense : noLicenseStr)} (${pkgLicenseType})`)}`);
            progress = $aa1cd37bc2b19590$var$checkProgress(progress, total, incompat, output, cb);
        } catch (err) {
            console.log(err);
            progress = $aa1cd37bc2b19590$var$checkProgress(progress, total, incompat, output, cb);
        }
    });
}
/*
 * @class LicenseCheck
 * @type {Object}
 * @property {Error} err - the Error object if any.
 * @property {Boolean} passed - ture if there were no license issues, flase otherwise.
 * @property {string} output - The resulting output (including colors) to be printed with console.log.
 * @param {Error} err - the Error object.
 * @param {Boolean} passed - ture if there were no license issues, flase otherwise.
 * @param {string} output - The resulting output (including colors) to be printed with console.log.
 */ /*
function LicenseCheck(err, passed, output) {
  return {
        err: err,
		passed: passed,
		output: output
    };
}
*/ /**
 * @typedef licenseCheck
 * @type {Object}
 * @property {Error} err - the Error object if any.
 * @property {Boolean} passed - ture if there were no license issues, flase otherwise.
 * @property {string} output - The resulting output (including colors) to be printed with console.log.
*/ /**
 * @public
 * @function checkSync
 * @description Check for licenses issues of the given project.json compared (flat) to a folder of node_modules. Synchronous version.
 * @param  {string} pathOfPackageJson - The path of the package.json to check against
 * @param  {string} modules - List of module directories
 * @returns {licenseCheck} Returns a custom Object
 * @example
 * var lcc = require('license-compatibility-checker');
 * var path = require('path');
 * var output = lcc.checkSync(path.join(process.cwd(),'package.json'), path.join(process.cwd(),"node_modules"));
 * if (output) console.log(output);
 */ function $aa1cd37bc2b19590$var$checkSync(pathOfPackageJson, modules) {
    let x = function(err, passed, output) {
        // return new LicenseCheck(err, passed, output);
        return {
            'err': err,
            'passed': passed,
            'output': output
        };
    };
    $aa1cd37bc2b19590$var$check(pathOfPackageJson, modules, x);
    return x;
}
$aa1cd37bc2b19590$exports = {
    /* Check for licenses issues of the given project.json compared (flat) to a folder of node_modules. */ 'check': $aa1cd37bc2b19590$var$check,
    /* Check for licenses issues of the given project.json compared (flat) to a folder of node_modules. Synchronous version. */ 'checkSync': $aa1cd37bc2b19590$var$checkSync
};




// const updateNotifier = require('update-notifier');
// updateNotifier({ pkg }).notify();
const $4fa36e821943b400$var$readdirRecursiveSync = (dir1, maxDepth, depth)=>{
    if (depth && depth > (maxDepth || 10)) return [];
    const list = $gXNCa$fs.readdirSync(dir1).map((v)=>$gXNCa$path.resolve(dir1, v)
    );
    let pending = list.filter((v)=>$gXNCa$fs.statSync(v).isDirectory()
    );
    if (pending.length <= 0) return list.filter((v)=>$gXNCa$fs.statSync(v).isFile()
    );
    else {
        pending.forEach((dir)=>$4fa36e821943b400$var$readdirRecursiveSync(dir, maxDepth || 10, depth ? depth + 1 : 1).forEach((v)=>list.push(v)
            )
        );
        return list.filter((v)=>$gXNCa$fs.statSync(v).isFile()
        );
    }
}, $4fa36e821943b400$var$returnCode = (()=>{
    try {
        const root = $gXNCa$path.resolve($gXNCa$process.cwd(), $gXNCa$actionscore.getInput('project-root'));
        if (!$gXNCa$fs.existsSync(root)) throw new Error(`Invalid Path ${root}!`);
        const pkg = $gXNCa$path.resolve(root, 'package.json');
        if (!$gXNCa$fs.existsSync(pkg)) throw new Error('Cannot find package.json at %s!', pkg);
        console.log('Checking for Packages at %s...', root);
        const entries = [], files = $4fa36e821943b400$var$readdirRecursiveSync(root).filter((file)=>[
                'package.json'
            ].includes(file.split('\\').join('/').split('/').pop().toLowerCase())
        ).map((v)=>$gXNCa$path.join(v, '..')
        ).filter((v1)=>{
            v1 = v1.split('\\').join('/').split('/');
            return v1.filter((v)=>!v.startsWith('.')
            ).length === v1.length;
        })// eslint-disable-next-line no-confusing-arrow
        .filter((v)=>entries.includes(v) ? false : entries.push(v) ? true : true
        );
        console.log('Checking %s Direrctories...', files.length.toString());
        $aa1cd37bc2b19590$exports.check(pkg, files, (err, passed, output)=>{
            console.log(err, passed, output);
            if (err) throw err;
            else if (passed) console.log('Passed!\nOutput:\n', output);
            else {
                console.error('Did not pass!\nOutput:\n', output);
                throw new Error('Unknown Error');
            }
        });
    } catch (error) {
        $gXNCa$actionscore.setFailed(error.message);
        throw error;
    }
})() ?? 0;
if ($4fa36e821943b400$var$returnCode !== 0) $gXNCa$actionscore.setFailed('See Log for error');
$gXNCa$process.exit($4fa36e821943b400$var$returnCode);


//# sourceMappingURL=index.js.map
