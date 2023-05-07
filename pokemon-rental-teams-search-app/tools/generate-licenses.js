const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const stdout = execSync(
  "npx license-checker-rseidelsohn --production --excludePrivatePackages --json"
);

const licenses = Object.entries(JSON.parse(stdout)).map(([key, value]) => {
  const licenseText = fs.readFileSync(value.licenseFile).toString();
  const text =
    key +
    "\n" +
    `repository: ${value.repository}` +
    "\n" +
    `license: ${value.licenses}` +
    "\n" +
    licenseText;
  return text;
});

fs.writeFileSync(
  path.join(process.cwd(), "/public/licenses.txt"),
  licenses.join("\n\n")
);
