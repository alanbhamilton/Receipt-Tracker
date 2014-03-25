# Receipt Tracker

Keeping it all together.

## Requirements

node 0.10+ (and npm) - visit nodejs.org
mongodb - easiest via homebrew (OSX)

    $ sudo npm install -g grunt-cli
    $ npm install
    $ grunt init:dev

`Grunt init:dev` only needs to be run the first time to prepare the vendor.js
files.

## Running the App:

Start the server in DEV mode, with nodemon watching the app for a relaunch,
watchers on scripts and less files for rebuild.

    $ grunt server

### Front-end Tests/TDD:

Requires PhantomJS to be installed globally:

    $ sudo npm install -g phantomjs

To run tests in TDD watch mode:

    $ grunt tdd

To run tests once:

    $ grunt test:client

### Server Tests:

Server tests have been added using Mocha, Chai, and Proxyquire. To run the
tests:

    $ grunt test:server

To run all tests - both server and client:

    $ grunt test
