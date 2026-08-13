import * as fs from "node:fs";

function creatingFiles(pathname) {
  fs.writeFileSync(pathname, "Hello NodeJS!\n");
  fs.appendFileSync(pathname, "Hello JavaScript!");

  console.log("File Created Successfully!");
}

creatingFiles("./hello.txt");
