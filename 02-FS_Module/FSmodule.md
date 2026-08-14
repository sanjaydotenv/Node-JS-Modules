# Node.js File System (FS) Module

The Node.js `fs` module is used to work with files and folders from Node.js.

Using the `fs` module, we can:

* Create files
* Read files
* Update file content
* Delete files
* Create folders
* Delete folders
* Read folder contents
* Work with files asynchronously and synchronously

---

## 1. Importing the FS Module

Node.js provides different versions of the File System module.

### Normal FS Module

```js
import * as fs from "node:fs";
```

This module provides both synchronous and callback-based asynchronous methods.

### FS Promises Module

```js
import * as fs from "node:fs/promises";
```

This version provides Promise-based methods, so we can use `async/await`.

---

# 2. Synchronous vs Asynchronous

This is one of the most important concepts in Node.js.

## Synchronous

Synchronous operations block the program until the operation is completed.

Example:

```js
import * as fs from "node:fs";

fs.writeFileSync("./hello.txt", "Hello NodeJS!");

console.log("File Created");
```

The next line runs only after the file has been created.

### Important

```text
Sync = Wait until the operation finishes
```

Synchronous methods usually have `Sync` at the end:

```text
writeFileSync()
readFileSync()
appendFileSync()
mkdirSync()
unlinkSync()
```

---

# 3. Asynchronous File Operations

Asynchronous operations do not block the main program.

Example:

```js
import * as fs from "node:fs";

fs.writeFile("./hello.txt", "Hello NodeJS!", (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log("File Created");
});

console.log("This can run before the file operation finishes");
```

Here Node.js starts the file operation and continues executing other code.

### Important

```text
Async = Start the operation and continue the program
```

---

# 4. Creating a File

We can use `writeFile()` or `writeFileSync()` to create a file.

### Async

```js
fs.writeFile("./hello.txt", "Hello NodeJS!", (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log("File Created");
});
```

### Sync

```js
fs.writeFileSync("./hello.txt", "Hello NodeJS!");
```

If the file already exists, `writeFile` normally replaces its existing content.

---

# 5. Appending Content

To add new content without removing the old content, we use `appendFile()`.

```js
fs.appendFile("./hello.txt", "Hello JavaScript!", (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log("Content Added");
});
```

Synchronous version:

```js
fs.appendFileSync("./hello.txt", "Hello JavaScript!");
```

### Difference

```text
writeFile  -> creates/replaces content
appendFile -> adds content at the end
```

---

# 6. Reading a File

We can use `readFile()` to read file content.

```js
fs.readFile("./hello.txt", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(data);
});
```

The `"utf-8"` option tells Node.js to return the file content as normal text.

Without it, Node.js can return the data as a Buffer.

---

# 7. FS Promises

The `node:fs/promises` module is useful when working with `async/await`.

```js
import * as fs from "node:fs/promises";

async function createFile() {
  try {
    await fs.writeFile("./hello.txt", "Hello NodeJS!");
    console.log("File Created");
  } catch (error) {
    console.log(error);
  }
}

createFile();
```

This style is easier to manage when we have multiple file operations.

For example:

```js
await fs.writeFile("./hello.txt", "Hello NodeJS!");
await fs.appendFile("./hello.txt", "Hello JavaScript!");
```

The second operation starts after the first one finishes.

---

# 8. Updating File Content

In your file manager, you used:

```js
export async function updateContent(filepath, updateContent) {
  await fs.appendFile(filepath, updateContent);
  console.log("File content Updated");
}
```

This function adds new content to the existing file.

Example:

```js
await updateContent("./hello.txt", "\nNew Content");
```

If the file contains:

```text
Hello NodeJS!
```

After updating:

```text
Hello NodeJS!
New Content
```

---

# 9. Rewriting a File

If we want to completely replace the old content, we can use `writeFile()`.

```js
export async function rewriteFileContent(filepath, content = "") {
  await fs.writeFile(filepath, content);
}
```

Example:

```js
await rewriteFileContent("./hello.txt", "New Content");
```

The old content will be removed.

### Difference

```text
appendFile() -> adds content
writeFile()  -> replaces content
```

---

# 10. Deleting a File

For deleting a file, we can use `unlink()`.

```js
await fs.unlink("./hello.txt");

console.log("File Deleted");
```

This permanently removes the file.

---

# 11. Creating a Folder

We can create a folder using `mkdir()`.

```js
await fs.mkdir("./myFolder");
```

In your code:

```js
export async function createFolder(folderPath = "", folderName) {
  const fullPath = path.join(folderPath, folderName);

  await fs.mkdir(fullPath, {
    recursive: true
  });

  console.log("Folder created");
}
```

### `recursive: true`

This allows Node.js to create nested folders.

Example:

```js
await fs.mkdir("./folder1/folder2/folder3", {
  recursive: true
});
```

It can create the complete folder structure if the parent folders do not exist.

---

# 12. Deleting a Folder

We can use `rm()` to remove a folder.

```js
await fs.rm("./myFolder", {
  recursive: true
});
```

### Why `recursive: true`?

Because the folder may contain files or other folders.

It allows Node.js to remove the complete folder structure.

---

# 13. Reading Folder Contents

The `readdir()` method is used to get the contents of a folder.

```js
const items = await fs.readdir("./");
console.log(items);
```

It returns the names of files and folders.

Example result:

```text
[
  "hello.txt",
  "index.js",
  "folder"
]
```

---

# 14. `withFileTypes: true`

In your file manager you used:

```js
const items = await fs.readdir(listpath, {
  withFileTypes: true
});
```

This is useful because Node.js gives us `Dirent` objects instead of only names.

We can check whether an item is a file or folder.

```js
item.isDirectory()
```

Example:

```js
const items = await fs.readdir("./", {
  withFileTypes: true
});

items.forEach((item) => {
  console.log(item.name);

  if (item.isDirectory()) {
    console.log("This is a folder");
  } else {
    console.log("This is a file");
  }
});
```

---

# 15. `path` Module

You also used:

```js
import path from "node:path";
```

The `path` module helps us safely create and work with file paths.

For example:

```js
const fullPath = path.join(folderPath, folderName);
```

Instead of manually doing:

```js
folderPath + "/" + folderName
```

we use:

```js
path.join(folderPath, folderName);
```

This is safer and works correctly with the operating system's path format.

---

# 16. Your `listAllItems()` Function

Your function:

```js
export async function listAllItems(listpath = "./") {
  const items = await fs.readdir(listpath, {
    withFileTypes: true
  });

  return items.map((item) => {
    return {
      name: item.name,
      type: item.isDirectory() ? "folder" : "file"
    };
  });
}
```

This function does three main things:

### Step 1

Reads the folder:

```js
fs.readdir()
```

### Step 2

Checks every item:

```js
item.isDirectory()
```

### Step 3

Creates a useful object:

```js
{
  name: "hello.txt",
  type: "file"
}
```

or:

```js
{
  name: "documents",
  type: "folder"
}
```

This makes it easier for your File Manager to display the items.

---

# 17. Node.js File Manager

You used all these FS operations together to create a CLI File Manager.

Your menu contains:

```text
1. Create File
2. Create Folder
3. Update File Content
4. Show File Content
5. Delete File
6. Delete Folder
7. List Items
8. Exit
```

Each option calls a different function from your `fs_promise.js` file.

For example:

```js
await createFile(filePath, filename, fileContent);
```

creates a file.

```js
await createFolder(folderPath, folderName);
```

creates a folder.

```js
await readFile(filePath);
```

reads file content.

```js
await deleteFile(filePath);
```

deletes a file.

```js
await deleteFolder(folderPath);
```

deletes a folder.

---

# 18. Important FS Methods

| Method             | Purpose                              |
| ------------------ | ------------------------------------ |
| `writeFile()`      | Create or replace file content       |
| `writeFileSync()`  | Synchronous version of `writeFile()` |
| `readFile()`       | Read file content                    |
| `appendFile()`     | Add content to a file                |
| `appendFileSync()` | Synchronous append                   |
| `unlink()`         | Delete a file                        |
| `mkdir()`          | Create a folder                      |
| `rm()`             | Remove a file/folder                 |
| `readdir()`        | Read folder contents                 |
| `stat()`           | Get information about a file/folder  |

---

# 19. Important Concepts to Remember

### `writeFile`

Creates a file or replaces existing content.

### `appendFile`

Adds new content to the existing content.

### `readFile`

Reads the content of a file.

### `unlink`

Deletes a file.

### `mkdir`

Creates a folder.

### `rm`

Deletes a folder or file.

### `readdir`

Gets the contents of a folder.

### `path.join`

Safely creates file/folder paths.

### `isDirectory()`

Checks whether an item is a directory.

---

# 20. Sync vs Async Quick Comparison

```text
Synchronous
------------
writeFileSync()
readFileSync()
appendFileSync()

Program waits for the operation to finish.
Simple but can block Node.js.


Asynchronous
------------
writeFile()
readFile()
appendFile()

Program does not have to wait.
Better for Node.js applications.


FS Promises
------------
fs/promises

Uses Promise + async/await.
Usually easier to write and manage.
```

---

# Conclusion

The Node.js `fs` module is used to interact with the computer's file system.

With it, we can build applications such as:

* File Managers
* Log systems
* Configuration managers
* File upload systems
* Backup tools
* CLI tools
* Local storage utilities

The most important methods to remember are:

```text
writeFile()
readFile()
appendFile()
unlink()
mkdir()
rm()
readdir()
```

And when using modern Node.js with `async/await`, the `node:fs/promises` module is very useful.
