import readline from 'readline';
import { stdin, stdout } from 'process';

export default function yesNo(question: string): Promise<boolean> {
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
