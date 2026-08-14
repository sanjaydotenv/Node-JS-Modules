import * as readline from "node:readline/promises";
import { stdin, stdout } from "node:process";

import chalk from "chalk";
import {
  createFile,
  createFolder,
  updateContent,
  readFile,
  deleteFile,
  deleteFolder,
  listAllItems,
} from "./fs_promise.js";

const rl = readline.createInterface({
  input: stdin,
  output: stdout,
});

async function listItems() {
  console.log(chalk.blue("\n📂 File Manager\n"));

  let options = [
    "Create File",
    "Create Folder",
    "Update File Content",
    "Show Me File Content",
    "Delete File",
    "Delete Folder",
    "List Items",
    "Exit",
  ];

  options.forEach((item, idx) => {
    console.log(`${idx + 1}. ${item}`);
  });

  const answer = await rl.question(chalk.cyan("\nSelect Option: "));

  switch (answer) {
    case "1":
      const filePath = await rl.question(
        chalk.cyan("File Path - default (Current): "),
      );
      const filename = await rl.question(chalk.cyan("Enter a File Name: "));
      const fileContent = await rl.question(
        chalk.cyan("Initial Content (Optional): "),
      );
      await createFile(filePath, filename, fileContent);
      break;

    case "2":
      const folderPath = await rl.question(
        chalk.cyan("Folder Path - default (Current): "),
      );
      const folderName = await rl.question(chalk.cyan("Folder Name: "));
      await createFolder(folderPath, folderName);
      break;

    case "3":
      const filePathForUpdating = await rl.question(chalk.cyan("File Path: "));
      const updateFileContent = await rl.question(chalk.cyan("Content: "));

      await updateContent(filePathForUpdating, `\n${updateFileContent}`);
      break;

    case "4":
      const filePathForReadContent = await rl.question(
        chalk.cyan("File Path: "),
      );
      await readFile(filePathForReadContent);
      break;

    case "5":
      const filePathForDelete = await rl.question(chalk.cyan("File Path: "));
      await deleteFile(filePathForDelete);
      break;

    case "6":
      const folderPathForDelete = await rl.question(chalk.cyan("File Path: "));
      await deleteFolder(folderPathForDelete);
      break;

    case "7":
      const pathForList = await rl.question(
        chalk.cyan("Folder Path (Enter for current)"),
      );
      const items = await listAllItems(pathForList || "./");

      console.log(chalk.cyan("\nContent: "));

      items.forEach((item) => {
        const icon = item.type === "folder" ? "📂" : "🗃️";
        console.log(`${icon} ${chalk.yellow(item.name)}`);
      });
      break;
  }
}

listItems()