import os from "node:os";
import chalk from "chalk";

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
    console.log(chalk.blue("======System Stats======"));
    console.table(usage);

    const usedMemory = (os.totalmem() - os.freemem()) / (1024 * 1024 * 1024);

    usedMemory > 12
      ? console.log(
          chalk.red(
            `Memory Used ${usedMemory.toFixed(2)}GB / ${Math.ceil(os.totalmem() / (1024 * 1024 * 1024))}GB `,
          ),
        )
      : console.log(
          chalk.green(
            `Memory Used ${usedMemory.toFixed(2)}GB / ${Math.ceil(os.totalmem() / (1024 * 1024 * 1024))}GB `,
          ),
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
