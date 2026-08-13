# Node.js `os` Module — System Information and Monitoring

The Node.js `os` module is a built-in module that allows us to get information about the operating system and the computer on which our Node.js application is running.

Using the `os` module, we can get information such as:

- CPU information
- Number of CPU cores
- CPU architecture
- Total RAM
- Free RAM
- Used RAM
- System uptime
- Operating system name
- Platform
- Hostname
- Home directory
- Temporary directory
- Network interfaces
- User information
- System load average

You do not need to install anything to use the `os` module because it is already included with Node.js.

---

# 1. Importing the `os` Module

Since `os` is a built-in Node.js module, we can directly import it.

```js
import os from "node:os";
```

If you are using CommonJS:

```js
const os = require("node:os");
```

After importing it, we can use different methods provided by the module.

---

# 2. What is the `os` Module Used For?

Imagine that you are building a system monitoring application.

You may want to show something like:

```text
Operating System: Windows
CPU Cores: 12
CPU Usage: 18%
Total RAM: 16 GB
Free RAM: 7 GB
Used RAM: 9 GB
System Uptime: 4 hours
Hostname: My-Laptop
Architecture: x64
```

Node.js can collect most of this information using the `os` module.

This is useful for:

- System monitoring
- Server monitoring
- Performance dashboards
- CLI tools
- Debugging
- Server health checks
- Hardware information
- Resource monitoring
- Logging system information

---

# 3. `os.platform()`

The `os.platform()` method tells us which operating-system platform Node.js is running on.

```js
console.log(os.platform());
```

Example output:

```text
win32
```

On Linux:

```text
linux
```

On macOS:

```text
darwin
```

### Common values

| Value     | Operating System |
| --------- | ---------------- |
| `win32`   | Windows          |
| `linux`   | Linux            |
| `darwin`  | macOS            |
| `freebsd` | FreeBSD          |

Important:

`win32` does NOT mean that the system is 32-bit.

It is simply Node.js's platform identifier for Windows.

---

# 4. `os.type()`

`os.type()` returns the operating-system name.

```js
console.log(os.type());
```

Example:

```text
Windows_NT
```

On Linux, it can return:

```text
Linux
```

On macOS:

```text
Darwin
```

### Difference Between `platform()` and `type()`

```js
console.log(os.platform());
console.log(os.type());
```

Example:

```text
win32
Windows_NT
```

`platform()` gives a platform identifier.

`type()` gives the operating-system name.

---

# 5. `os.release()`

This method returns the operating-system release/version information.

```js
console.log(os.release());
```

Example:

```text
10.0.26200
```

The exact output depends on your operating system.

---

# 6. `os.arch()`

`os.arch()` tells us the CPU architecture used by the Node.js process.

```js
console.log(os.arch());
```

Example:

```text
x64
```

Common values:

```text
x64
arm64
arm
ia32
```

### Meaning

- `x64` → 64-bit x86 architecture
- `arm64` → 64-bit ARM architecture
- `ia32` → 32-bit x86 architecture
- `arm` → ARM architecture

For most modern laptops and desktops, you will commonly see:

```text
x64
```

---

# 7. `os.machine()`

`os.machine()` can provide the machine architecture.

```js
console.log(os.machine());
```

Example:

```text
x86_64
```

Depending on the operating system and Node.js version, the output can be different.

---

# 8. CPU Information with `os.cpus()`

One of the most important methods for system monitoring is:

```js
os.cpus();
```

It returns information about the logical CPU cores available to Node.js.

```js
const cpus = os.cpus();

console.log(cpus);
```

The result is an array.

For example:

```js
[
  {
    model: "Intel(R) Core(TM) i5",
    speed: 2500,
    times: {
      user: 12345,
      nice: 0,
      sys: 5432,
      idle: 100000,
      irq: 0,
    },
  },
];
```

Every object represents one logical CPU core.

---

# 9. Understanding `os.cpus()`

The CPU object contains mainly three important pieces of information:

```js
{
  (model, speed, times);
}
```

## `model`

```js
console.log(os.cpus()[0].model);
```

Example:

```text
Intel(R) Core(TM) i5-12450H
```

This tells us the CPU model.

---

# 10. CPU Speed

```js
console.log(os.cpus()[0].speed);
```

Example:

```text
2500
```

The value is generally represented in MHz.

So:

```text
2500 MHz ≈ 2.5 GHz
```

Important:

This value should not be treated as the exact current clock speed of the CPU. It is information reported by the operating system and may not represent real-time CPU frequency.

---

# 11. Number of CPU Cores

We can find the number of logical CPUs using:

```js
console.log(os.cpus().length);
```

Example:

```text
12
```

This means Node.js can see 12 logical CPU processors.

These may be:

- Physical cores
- Hyper-threaded/logical processors

So `os.cpus().length` is better understood as:

> Number of logical CPU processors visible to Node.js.

---

# 12. Physical Cores vs Logical Cores

This is important.

Suppose your CPU has:

```text
6 physical cores
12 logical processors
```

Then:

```js
os.cpus().length;
```

may return:

```text
12
```

It does NOT necessarily mean that your CPU physically has 12 cores.

It means the operating system exposes 12 logical processors.

---

# 13. Understanding CPU Times

Each CPU has a `times` object.

Example:

```js
{
  user: 10000,
  nice: 0,
  sys: 5000,
  idle: 80000,
  irq: 0
}
```

These values represent CPU time spent in different states.

### `user`

Time spent running normal user processes.

Examples:

- Chrome
- VS Code
- Node.js
- Games
- Other applications

---

### `system`

In Node.js this property is called:

```js
sys;
```

It represents time spent handling operating-system/kernel work.

Examples:

- File operations
- Hardware operations
- System calls

---

### `idle`

Time during which the CPU was idle.

For example:

```text
CPU is not doing useful work
```

---

### `nice`

Mostly relevant to Unix-like systems.

It represents time spent on processes with adjusted scheduling priority.

On Windows, this value is generally not useful and is usually `0`.

---

### `irq`

Time spent handling hardware interrupts.

Again, this is more relevant to Unix-like systems.

---

# 14. Important: `os.cpus()` Does NOT Directly Give CPU Usage Percentage

A common beginner mistake is:

```js
console.log(os.cpus());
```

and thinking that the `times` values are CPU percentages.

They are not.

They are cumulative CPU time values.

For example:

```text
user: 100000
sys: 20000
idle: 300000
```

To calculate CPU usage over time, we need to take two CPU measurements and compare them.

---

# 15. Calculating CPU Usage

CPU usage is normally calculated using two snapshots.

First snapshot:

```js
const oldCpus = os.cpus();
```

Wait for some time.

Then:

```js
const newCpus = os.cpus();
```

Now we compare the two snapshots.

---

# 16. CPU Usage Formula

For a CPU core:

```text
Total CPU Time = user + nice + sys + idle + irq
```

Then:

```text
Idle Difference = newIdle - oldIdle

Total Difference = newTotal - oldTotal
```

CPU usage:

```text
CPU Usage =
1 - (Idle Difference / Total Difference)
```

Finally:

```text
CPU Usage Percentage =
CPU Usage × 100
```

---

# 17. Simple CPU Usage Example

```js
import os from "node:os";

const Monitoring = () => {
  const oldCpus = os.cpus();

  setTimeout(() => {
    const newCpus = os.cpus();

    const usage = newCpus.map((cpu, idx) => {
      return {
        core: idx,
        usage: calculateUsage(oldCpus[idx], newCpus[idx]) + "%",
      };
    });
    console.clear();
    console.table(usage);

    const usedMemory = (os.totalmem() - os.freemem()) / (1024 * 1024 * 1024);
    console.log(
      `Memory Used ${usedMemory.toFixed(2)}GB / ${(os.totalmem() / (1024 * 1024 * 1024)).toFixed(2)}GB `,
    );
  }, 1000);
};

const calculateUsage = (oldCpu, newCpu) => {
  const oldTotal = Object.values(oldCpu.times).reduce((a, v) => a + v);
  const newTotal = Object.values(newCpu.times).reduce((a, v) => a + v);

  const idel = newCpu.times.idle - oldCpu.times.idle;

  const total = newTotal - oldTotal;

  const used = total - idel;

  return ((100 * used) / total).toFixed();
};

setInterval(Monitoring, 1000);
```

Example output:

```text
CPU Usage: 17.42%
```

The important thing to understand is that CPU usage is calculated by comparing CPU activity over a period of time.

---

# 18. `os.totalmem()`

This method returns the total amount of system memory (RAM).

```js
console.log(os.totalmem());
```

The value is returned in bytes.

Example:

```text
17077522432
```

This is difficult for humans to read.

So we usually convert it to GB.

---

# 19. Convert Bytes to GB

```js
const totalMemory = os.totalmem();

const totalGB = totalMemory / 1024 ** 3;

console.log(`${totalGB.toFixed(2)} GB`);
```

Example:

```text
15.90 GB
```

---

# 20. Why Do We Divide by `1024 ** 3`?

Computer memory is commonly measured using powers of 1024.

```text
1 KB = 1024 bytes

1 MB = 1024 KB

1 GB = 1024 MB
```

Therefore:

```js
1024 ** 3;
```

means:

```text
1024 × 1024 × 1024
```

which converts bytes to GiB-style units.

For simple system monitoring, people commonly display this as GB.

---

# 21. `os.freemem()`

This method returns the amount of free system memory.

```js
console.log(os.freemem());
```

Again, the value is returned in bytes.

Convert it:

```js
const freeMemory = os.freemem() / 1024 ** 3;

console.log(`Free Memory: ${freeMemory.toFixed(2)} GB`);
```

Example:

```text
Free Memory: 7.25 GB
```

---

# 22. Calculating Used Memory

Node.js does not provide a direct:

```js
os.usedmem();
```

method.

But we can calculate it.

Formula:

```text
Used Memory =
Total Memory - Free Memory
```

Example:

```js
const total = os.totalmem();
const free = os.freemem();

const used = total - free;

console.log(`Used Memory: ${(used / 1024 ** 3).toFixed(2)} GB`);
```

---

# 23. Calculating Memory Usage Percentage

Formula:

```text
Memory Usage =
((Total - Free) / Total) × 100
```

Code:

```js
const total = os.totalmem();
const free = os.freemem();

const usage = ((total - free) / total) * 100;

console.log(`Memory Usage: ${usage.toFixed(2)}%`);
```

Example:

```text
Memory Usage: 54.32%
```

---

# 24. Important Difference: System RAM vs Node.js Memory

This is extremely important.

These are two different things:

```js
os.totalmem();
os.freemem();
```

and:

```js
process.memoryUsage();
```

`os.totalmem()` and `os.freemem()` are about the entire computer's RAM.

Example:

```text
Laptop RAM:
16 GB

Used by entire system:
9 GB

Free:
7 GB
```

But:

```js
process.memoryUsage();
```

tells us how much memory the Node.js process itself is using.

For example:

```text
Node.js process:
80 MB
```

So:

```text
os.totalmem()
```

→ Entire system RAM

```text
process.memoryUsage()
```

→ Memory used by your Node.js application/process

---

# 25. `process.memoryUsage()`

Although this method belongs to the `process` object and not the `os` module, it is extremely important when creating a system-monitoring application.

```js
console.log(process.memoryUsage());
```

Example:

```js
{
  rss: 45000000,
  heapTotal: 8000000,
  heapUsed: 5000000,
  external: 1000000,
  arrayBuffers: 100000
}
```

---

# 26. Meaning of `rss`

`rss` means:

```text
Resident Set Size
```

It represents the amount of memory currently held in RAM by the Node.js process.

This can include:

- JavaScript heap
- Native memory
- Node.js runtime memory
- Buffers
- Other process-related memory

Example:

```js
console.log(process.memoryUsage().rss);
```

---

# 27. Meaning of `heapUsed`

`heapUsed` represents the JavaScript heap memory currently being used.

Example:

```js
console.log(process.memoryUsage().heapUsed);
```

This is useful when debugging memory usage in Node.js applications.

---

# 28. Meaning of `heapTotal`

`heapTotal` represents the total heap memory currently allocated by V8 for JavaScript objects.

```js
console.log(process.memoryUsage().heapTotal);
```

You may see:

```text
heapTotal: 10000000
heapUsed: 7000000
```

This means V8 has allocated around 10 MB of heap and around 7 MB is currently being used.

---

# 29. `external`

`external` represents memory used by objects managed by Node.js that are allocated outside the V8 JavaScript heap.

This can include memory associated with:

- Buffers
- Native Node.js objects
- External resources

---

# 30. `arrayBuffers`

This represents memory allocated for `ArrayBuffer` and related objects.

It is useful when working with:

- Binary data
- Buffers
- Files
- Streams
- Network data

---

# 31. `os.uptime()`

`os.uptime()` returns how long the operating system has been running.

```js
console.log(os.uptime());
```

The value is returned in seconds.

Example:

```text
14400
```

This means:

```text
14400 seconds
```

which is:

```text
4 hours
```

---

# 32. Converting Uptime

```js
const uptime = os.uptime();

const hours = Math.floor(uptime / 3600);

const minutes = Math.floor((uptime % 3600) / 60);

console.log(`Uptime: ${hours}h ${minutes}m`);
```

Example:

```text
Uptime: 4h 23m
```

---

# 33. `os.hostname()`

This returns the computer's hostname.

```js
console.log(os.hostname());
```

Example:

```text
DESKTOP-ABC123
```

The hostname is basically the name by which the computer identifies itself on the network/system.

---

# 34. `os.homedir()`

This returns the current user's home directory.

```js
console.log(os.homedir());
```

Example:

```text
C:\Users\Mayur
```

On Linux it may look like:

```text
/home/mayur
```

This is useful when working with user-specific files and directories.

---

# 35. `os.tmpdir()`

This returns the operating system's temporary directory.

```js
console.log(os.tmpdir());
```

Example:

```text
C:\Users\Mayur\AppData\Local\Temp
```

Temporary files can be stored here when appropriate.

---

# 36. `os.EOL`

`os.EOL` gives the correct end-of-line character for the current operating system.

```js
console.log(JSON.stringify(os.EOL));
```

On Windows:

```text
"\r\n"
```

On Linux/macOS:

```text
"\n"
```

This can be useful when creating cross-platform text files.

---

# 37. `os.endianness()`

This tells us the byte order used by the CPU.

```js
console.log(os.endianness());
```

Typical output:

```text
LE
```

`LE` means:

```text
Little Endian
```

This is generally not something you need in normal web development, but it is part of the OS module.

---

# 38. `os.devNull`

Node.js also provides the operating system's null device path.

```js
console.log(os.devNull);
```

Example on Windows:

```text
\\.\nul
```

On Linux:

```text
/dev/null
```

It can be useful when you want to discard output.

---

# 39. `os.userInfo()`

This method returns information about the current user.

```js
console.log(os.userInfo());
```

Example:

```js
{
  uid: -1,
  gid: -1,
  username: "Mayur",
  homedir: "C:\\Users\\Mayur",
  shell: null
}
```

The exact values depend on the operating system.

Important:

`uid` and `gid` are mainly meaningful on Unix-like systems.

---

# 40. `os.loadavg()`

`os.loadavg()` returns the system load average.

```js
console.log(os.loadavg());
```

Example on Linux/macOS:

```text
[0.52, 0.44, 0.39]
```

These represent approximately:

```text
1-minute load
5-minute load
15-minute load
```

### Important Windows Difference

On Windows, `os.loadavg()` returns:

```text
[0, 0, 0]
```

So do not use `os.loadavg()` as your main CPU usage metric on Windows.

For Windows CPU usage, comparing `os.cpus()` snapshots is more useful.

---

# 41. Understanding Load Average

Load average is NOT exactly the same thing as CPU usage percentage.

For example:

```text
Load Average:
1.2
```

does not directly mean:

```text
CPU Usage = 1.2%
```

Load average is mainly a Unix/Linux concept that represents the amount of work waiting for or using CPU resources.

It should be interpreted relative to the number of CPU cores.

---

# 42. `os.networkInterfaces()`

This method gives information about network interfaces available on the system.

```js
console.log(os.networkInterfaces());
```

Example:

```js
{
  Ethernet: [
    {
      address: "192.168.1.10",
      netmask: "255.255.255.0",
      family: "IPv4",
      mac: "XX:XX:XX:XX:XX:XX",
      internal: false,
    },
  ];
}
```

Depending on the machine, you may see:

- Wi-Fi
- Ethernet
- Loopback
- VPN
- Virtual network adapters

---

# 43. Understanding Network Interface Properties

A network interface entry can contain:

### `address`

The IP address.

Example:

```text
192.168.1.10
```

---

### `netmask`

Defines which part of the IP address represents the network.

Example:

```text
255.255.255.0
```

---

### `family`

Usually:

```text
IPv4
```

or:

```text
IPv6
```

---

### `mac`

The network interface's MAC address.

Example:

```text
XX:XX:XX:XX:XX:XX
```

---

### `internal`

This tells whether the interface is internal/loopback.

For example:

```text
127.0.0.1
```

is a loopback address.

---

# 44. Complete Basic System Information Program

We can combine many methods together.

```js
import os from "node:os";

const totalMemory = os.totalmem();
const freeMemory = os.freemem();
const usedMemory = totalMemory - freeMemory;

console.log("===== SYSTEM INFORMATION =====");

console.log("Operating System:", os.type());
console.log("Platform:", os.platform());
console.log("Release:", os.release());
console.log("Architecture:", os.arch());
console.log("Machine:", os.machine());

console.log("Hostname:", os.hostname());

console.log("CPU Cores:", os.cpus().length);

console.log("CPU Model:", os.cpus()[0].model);

console.log("Total RAM:", `${(totalMemory / 1024 ** 3).toFixed(2)} GB`);

console.log("Used RAM:", `${(usedMemory / 1024 ** 3).toFixed(2)} GB`);

console.log("Free RAM:", `${(freeMemory / 1024 ** 3).toFixed(2)} GB`);

console.log(
  "Memory Usage:",
  `${((usedMemory / totalMemory) * 100).toFixed(2)}%`,
);

console.log("System Uptime:", `${(os.uptime() / 3600).toFixed(2)} hours`);
```

Example output:

```text
===== SYSTEM INFORMATION =====

Operating System: Windows_NT
Platform: win32
Release: 10.0.26200
Architecture: x64
Machine: x86_64

Hostname: DESKTOP-ABC123

CPU Cores: 12
CPU Model: Intel(R) Core(TM) i5-12450H

Total RAM: 15.68 GB
Used RAM: 8.42 GB
Free RAM: 7.26 GB

Memory Usage: 53.70%

System Uptime: 5.32 hours
```

---

# 45. Building a Simple System Monitor

We can create a monitor that continuously displays system information.

```js
import os from "node:os";

function getMemoryInfo() {
  const total = os.totalmem();
  const free = os.freemem();
  const used = total - free;

  return {
    total,
    free,
    used,
    percentage: (used / total) * 100,
  };
}

function displayMemory() {
  const memory = getMemoryInfo();

  console.clear();

  console.log("===== SYSTEM MONITOR =====");

  console.log(`Total RAM: ${(memory.total / 1024 ** 3).toFixed(2)} GB`);

  console.log(`Used RAM: ${(memory.used / 1024 ** 3).toFixed(2)} GB`);

  console.log(`Free RAM: ${(memory.free / 1024 ** 3).toFixed(2)} GB`);

  console.log(`RAM Usage: ${memory.percentage.toFixed(2)}%`);
}

setInterval(displayMemory, 1000);
```

This updates the memory information every second.

---

# 46. Why Use `setInterval()`?

The operating system information changes continuously.

For example:

```text
10:00:01 → RAM Usage: 42%
10:00:02 → RAM Usage: 45%
10:00:03 → RAM Usage: 48%
10:00:04 → RAM Usage: 44%
```

So instead of checking once, we can check repeatedly.

```js
setInterval(() => {
  // Get system information
}, 1000);
```

The `1000` means:

```text
1000 milliseconds = 1 second
```

---

# 47. CPU Usage Monitoring

For CPU usage, we need two snapshots.

```text
Snapshot 1
     ↓
Wait 1 second
     ↓
Snapshot 2
     ↓
Compare
     ↓
CPU Usage %
```

Why?

Because:

```js
os.cpus();
```

does not directly return:

```text
CPU Usage = 25%
```

Instead, it gives cumulative CPU time.

We calculate the change between two points in time.

---

# 48. CPU Usage Per Core

We can also calculate usage for each logical CPU.

Conceptually:

```text
CPU 1 → 12%
CPU 2 → 18%
CPU 3 → 7%
CPU 4 → 25%
CPU 5 → 10%
...
```

This is useful for finding whether a particular logical processor is heavily loaded.

---

# 49. `os.cpus()` Structure

A CPU object generally looks like:

```js
{
  model: "CPU MODEL",
  speed: 2500,
  times: {
    user: 10000,
    nice: 0,
    sys: 5000,
    idle: 50000,
    irq: 0
  }
}
```

Remember:

```text
model → CPU model

speed → reported CPU speed

user → user-process CPU time

nice → adjusted-priority process time

sys → system/kernel CPU time

idle → idle CPU time

irq → interrupt CPU time
```

---

# 50. OS Information vs Node.js Process Information

There are two different levels of monitoring.

## System-level information

Provided mainly by:

```js
os;
```

Examples:

```js
os.totalmem();
os.freemem();
os.cpus();
os.uptime();
os.networkInterfaces();
```

This tells us about the entire operating system.

---

## Application-level information

Provided by:

```js
process;
```

Examples:

```js
process.memoryUsage();
process.cpuUsage();
process.pid;
process.uptime();
```

This tells us about the Node.js application/process.

---

# 51. `process.cpuUsage()`

Another useful method is:

```js
process.cpuUsage();
```

Example:

```js
console.log(process.cpuUsage());
```

It returns CPU time used by the current Node.js process.

Example:

```js
{
  user: 120000,
  system: 30000
}
```

This is different from:

```js
os.cpus();
```

because `os.cpus()` is about the system's CPUs, while `process.cpuUsage()` is about your Node.js process.

---

# 52. `process.pid`

Every running process has a Process ID.

```js
console.log(process.pid);
```

Example:

```text
15432
```

This identifies the Node.js process to the operating system.

---

# 53. `process.uptime()`

This tells us how long the Node.js process has been running.

```js
console.log(process.uptime());
```

Example:

```text
125.42
```

This means the Node.js application has been running for approximately 125 seconds.

Do not confuse this with:

```js
os.uptime();
```

### Difference

```text
os.uptime()
→ How long the operating system has been running

process.uptime()
→ How long the Node.js application has been running
```

---

# 54. Very Important Difference Between Common Metrics

| Metric                   | Represents                          |
| ------------------------ | ----------------------------------- |
| `os.totalmem()`          | Total RAM of the computer           |
| `os.freemem()`           | Currently available/free system RAM |
| `os.cpus()`              | Logical CPU information             |
| `os.cpus().length`       | Number of logical CPU processors    |
| `os.uptime()`            | System uptime                       |
| `process.memoryUsage()`  | Memory used by Node.js process      |
| `process.cpuUsage()`     | CPU time used by Node.js process    |
| `process.uptime()`       | Node.js process uptime              |
| `os.hostname()`          | Computer hostname                   |
| `os.platform()`          | Platform identifier                 |
| `os.arch()`              | CPU architecture                    |
| `os.networkInterfaces()` | Network interface information       |

---

# 55. Complete System Monitor Concept

A basic monitoring application can show:

```text
================================
        SYSTEM MONITOR
================================

OS
--------------------------------
Platform: Windows
Architecture: x64
Hostname: My-Laptop

CPU
--------------------------------
CPU Model: Intel Core i5
Logical CPUs: 12
CPU Usage: 21.45%

MEMORY
--------------------------------
Total RAM: 15.68 GB
Used RAM: 8.41 GB
Free RAM: 7.27 GB
Memory Usage: 53.64%

SYSTEM
--------------------------------
Uptime: 5h 32m

NODE.JS PROCESS
--------------------------------
PID: 15432
Process Memory: 82 MB
Process Uptime: 12m
```

This is basically the foundation of a simple system-monitoring application.

---

# 56. Important `os` Module Methods Cheat Sheet

```text
os.platform()
    → Operating system platform

os.type()
    → Operating system name

os.release()
    → OS release/version

os.arch()
    → CPU architecture

os.machine()
    → Machine architecture

os.cpus()
    → CPU information

os.totalmem()
    → Total system RAM

os.freemem()
    → Free system RAM

os.uptime()
    → System uptime

os.hostname()
    → Computer hostname

os.homedir()
    → User home directory

os.tmpdir()
    → Temporary directory

os.userInfo()
    → Current user information

os.networkInterfaces()
    → Network interfaces

os.loadavg()
    → System load average

os.endianness()
    → CPU byte order

os.EOL
    → OS-specific line ending

os.devNull
    → OS null device
```

---

# 57. Which Methods Are Most Important for Beginners?

You do not need to memorize every method.

Start with these:

```js
os.platform();
os.type();
os.arch();
os.cpus();
os.totalmem();
os.freemem();
os.uptime();
os.hostname();
os.homedir();
os.networkInterfaces();
```

Then learn:

```js
process.memoryUsage();
process.cpuUsage();
process.uptime();
process.pid;
```

These are enough to build a basic system-monitoring application.

---

# 58. Common Mistakes

## Mistake 1 — Thinking `os.cpus()` gives CPU percentage

Wrong:

```js
os.cpus()[0].times.user;
```

does not mean:

```text
CPU Usage = 20%
```

It is cumulative CPU time.

To calculate CPU percentage, compare two snapshots.

---

## Mistake 2 — Thinking `os.freemem()` is RAM used by Node.js

Wrong.

```js
os.freemem();
```

is about the entire system.

For Node.js memory:

```js
process.memoryUsage();
```

---

## Mistake 3 — Forgetting that memory values are bytes

This:

```js
os.totalmem();
```

does not return:

```text
16 GB
```

It returns bytes.

Convert it:

```js
os.totalmem() / 1024 ** 3;
```

---

## Mistake 4 — Treating logical CPUs as physical cores

```js
os.cpus().length;
```

returns logical processors visible to Node.js.

It does not necessarily equal physical core count.

---

## Mistake 5 — Using `os.loadavg()` on Windows

On Windows:

```js
os.loadavg();
```

normally returns:

```text
[0, 0, 0]
```

So for Windows CPU monitoring, use CPU-time comparison instead.

---

# 59. A Good Learning Order

If you are learning Node.js and want to understand system monitoring, learn in this order:

```text
1. Import os module
        ↓
2. os.platform()
        ↓
3. os.type()
        ↓
4. os.arch()
        ↓
5. os.cpus()
        ↓
6. os.cpus().length
        ↓
7. os.totalmem()
        ↓
8. os.freemem()
        ↓
9. Calculate used RAM
        ↓
10. Calculate RAM percentage
        ↓
11. os.uptime()
        ↓
12. os.hostname()
        ↓
13. os.networkInterfaces()
        ↓
14. process.memoryUsage()
        ↓
15. process.cpuUsage()
        ↓
16. Calculate real-time CPU usage
        ↓
17. Build System Monitor
```

---

# 60. Final Concept

The main idea is simple.

Node.js gives us built-in APIs to communicate with the operating system.

The `os` module mainly tells us about the **computer/system**.

For example:

```js
os.totalmem();
```

means:

> How much RAM does the whole computer have?

```js
os.freemem();
```

means:

> How much system memory is currently free?

```js
os.cpus();
```

means:

> What CPU information does the operating system expose?

```js
os.uptime();
```

means:

> How long has the operating system been running?

```js
os.networkInterfaces();
```

means:

> What network interfaces are available on the computer?

And the `process` object gives information about the **Node.js application itself**.

For example:

```js
process.memoryUsage();
```

means:

> How much memory is my Node.js process using?

```js
process.cpuUsage();
```

means:

> How much CPU time has my Node.js process consumed?

```js
process.uptime();
```

means:

> How long has my Node.js application been running?

So remember this simple rule:

```text
             SYSTEM
                │
                ▼
              os
                │
      ┌─────────┼──────────┐
      ▼         ▼          ▼
     CPU       RAM       Network
      │         │          │
   os.cpus   totalmem   networkInterfaces
              freemem


             NODE.JS APP
                  │
                  ▼
               process
                  │
          ┌───────┼────────┐
          ▼       ▼        ▼
       Memory    CPU     Uptime
       Usage    Usage
```

The `os` module is therefore a very useful module when building Node.js applications that need information about the machine on which they are running.

It is especially useful for:

- System monitoring tools
- Server monitoring
- CLI applications
- Performance dashboards
- Resource monitoring
- Debugging
- Server health checks
- Developer utilities

Once you understand `os.cpus()`, `os.totalmem()`, `os.freemem()`, and `process.memoryUsage()`, you already have the core knowledge needed to start building a basic Node.js system-monitoring tool.
