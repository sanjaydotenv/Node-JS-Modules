import * as fs from "node:fs";

function createFiles(pathname) {
  fs.writeFile(pathname, "Hello NodeJS!\n", (err) => {
    if (err) {
      console.log("Something went wrong while creating a file");
    }

    fs.appendFile(pathname, "Hello JavaScript!", (err) => {
      if (err) {
        console.log("Something went wrong while creating a file");
      }

      console.log("File has been Updateing Asynchronously.");
    });

    console.log("File has been creating Asynchronously.");
  });

  console.log("Fill Created Successfully");
}

createFiles("./hello2.txt");
