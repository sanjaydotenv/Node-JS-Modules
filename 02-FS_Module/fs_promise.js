import * as fs from "node:fs/promises";

async function createFile(filepath, content = "") {
  await fs.writeFile(filepath, content);
  console.log("File created");
}

async function updateContent(filepath, updateContent) {
  await fs.appendFile(filepath, updateContent);
  console.log("File content Updated");
}

async function readFile(filepath) {
  const data = await fs.readFile(filepath, "utf-8");
  console.log("Fetch Data Successfully.✅");
  console.log("DATA :-", data);
}

async function deleteFile(filepath) {
  fs.unlink(filepath);
  console.log("File Deleted.");
}

async function createFolder(folderpath) {
  await fs.mkdir(folderpath, { recursive: true });
  console.log("Folder created");
}

async function deleteFolder(folderpath) {
  await fs.rm(folderpath, { recursive: true });
  console.log("Folder Deleted.");
}

async function rewriteFileContent(filepath, content = "") {
  await fs.writeFile(filepath, content);
  console.log("Rewrite Data Successfully");
}

// rewriteFileContent("hello.txt", "I am reWriting all data!");

// deleteFolder("folder");

// createFolder("folder/innerfolder/deepfolder");

// deleteFile("hello.txt")

// readFile("hello.txt");

// updateContent("hello.txt" , "Hy I am updateContent function\n")

// createFile("./FSmodule.md");

// ===============================================================

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
