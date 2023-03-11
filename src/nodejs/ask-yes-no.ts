import readline from 'readline';
import { getProcess } from './globals';

export default function askYesNo(question: string): Promise<boolean> {
  const { stdin, stdout } = getProcess();
  const rl = readline.createInterface({
    input: stdin,
    output: stdout,
  });
  return new Promise((resolve, rejects) => {
    rl.question(`${question} (Y/n)`, (answer) => {
      const ans = (answer || 'y').toLowerCase();
      if (['y', 'n'].indexOf(ans) === -1) {
        rl.close();
        rejects(new Error('Invalid answer'));
        return;
      }
      rl.close();
      resolve(ans === 'y');
    });
  });
}
