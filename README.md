# TDD-gather-4-project

Although the full-stack web applications you will build in this program are written in JavaScript, the applications have some non-JavaScript system dependencies.

On Windows, you can use npm in powershell to download the tools you need to build and run programs on your computer.

Open powershell as an administrator — you can find powershell by searching for it in your Windows taskbar.
Enter the following lines of code to install Windows build tools from the internet:
$ npm install --global --production windows-build-tools
$ npm install --global node-gyp
Once your computer is finished installing, run the following command to check if they were installed properly:
$ node-gyp --version
You should see v3.x.x, where x represents a number.

Once this has been done, install dependencies with npm install. Start mongo with mongod --dbpath ~/data/db. Seed the database with npm run seed-db. Run the app with npm start. Test with npm test.
