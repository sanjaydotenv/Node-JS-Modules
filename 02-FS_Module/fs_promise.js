import * as fs from "node:fs/promises";

const createFolder = (pathname) => {
  fs.mkdir(pathname, { recursive: true });
};

createFolder("./nodeSystem");

// async function createFiles(pathname) {
//   try {
//     await fs.writeFile(pathname, "Hello NodeJS!\n");
//     await fs.appendFile(pathname, "Hello JavaScript!");
//   } catch (error) {
//     console.log(`Error while creating a file ${error}`);
//   }

//   console.log("File created");
// }

// createFiles("./hello3.txt");
