import * as fs from "node:fs/promises";
import path from "node:path";

export async function listAllItems(listpath = "./") {
  const items = await fs.readdir(listpath, { withFileTypes: true });

  return items.map((item) => {
    return {
      name: item.name,
      type: item.isDirectory() ? "folder" : "file",
      path: path.join(import.meta.dirname, item.name  )
    }
  })
}

// listItems()

export async function createFile(filePath, fileName, content) {
  const fullPath = path.join(filePath, fileName);

  await fs.writeFile(fullPath, content);

  console.log("File created ✅");
}

export async function updateContent(filepath, updateContent) {
  await fs.appendFile(filepath, `${updateContent}`);
  console.log("File content Updated ✅");
}

export async function readFile(filepath) {
  const data = await fs.readFile(filepath, "utf-8");
  console.log("Fetch Data Successfully.✅");
  console.log("DATA :-", data);
}

export async function deleteFile(filepath) {
  fs.unlink(filepath);
  console.log("File Deleted.");
}

export async function createFolder(folderPath = "", folderName) {
  try {
    const fullPath = path.join(folderPath, folderName);
    await fs.mkdir(fullPath, { recursive: true });
    console.log("Folder created ✅");
  } catch (error) {
    console.log("Error in Folder Creationg", error);
  }
}

export async function deleteFolder(folderpath) {
  await fs.rm(folderpath, { recursive: true });
  console.log("Folder Deleted.");
}

export async function rewriteFileContent(filepath, content = "") {
  await fs.writeFile(filepath, content);
  console.log("Rewrite Data Successfully");
}

// rewriteFileContent("hello.txt", "I am reWriting all data!");

// deleteFolder("folder");

// createFolder("", "folder1/folder/2systemhang");

// deleteFile("hello.txt")

// readFile("hello.txt");

// updateContent("hello.txt" , "Hy I am updateContent function\n")

// createFile("", "fileFontWala.txt", "file ka content");

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
