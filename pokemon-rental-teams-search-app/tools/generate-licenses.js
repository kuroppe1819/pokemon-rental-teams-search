const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const stdout = execSync("pnpm licenses list --long --prod");

fs.writeFileSync(
  path.join(process.cwd(), "/public/licenses.txt"),
  stdout.toString()
);
