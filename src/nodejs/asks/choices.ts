import readline from 'readline';
import { log, clear } from 'console';
import { stdin, stdout } from 'process';
import { clearTimeout, setTimeout } from 'timers';

export type KeyEventType = 'up' | 'down' | 'return';

// set up the function to render the options and the currently selected option
function renderQuestionNOptions(
  question: string,
  options: string[],
  selectedOptionIndex: number
): void {
  clear();
  log(question);
  log('* Press \u2191 or \u2193 to change your choice\n* press ENTER to decide a choice');
  options.forEach((option, index) => {
    if (index === selectedOptionIndex) {
      log(` -> ${index + 1}) ${option}`);
    } else {
      log(`    ${index + 1}) ${option}`);
    }
  });
}

export interface Config {
  timeoutSec?: number;
  startAtIndex?: number;
}

export default function choices(
  question: string,
  options: string[],
  config: Config = {
    timeoutSec: 20,
  }
): Promise<string> {
  const { startAtIndex, timeoutSec } = config;
  const timeout = timeoutSec ?? 20;
  const isInvalidStartingIndex =
    !startAtIndex || startAtIndex < 0 || startAtIndex >= options.length;
  let selectedOptionIndex$ = isInvalidStartingIndex ? 0 : startAtIndex;

  // create an instance of the readline interface
  const rl = readline.createInterface({
    input: stdin,
    output: stdout,
  });

  // render the options initially
  renderQuestionNOptions(question, options, selectedOptionIndex$);

  return new Promise((resolve, reject) => {
    const onTimeout = (): void => {
      rl.close();
      reject(new Error('Timed out'));
    };
    const timer = setTimeout(onTimeout, timeout * 1000);
    const onClose = (): void => {
      rl.close();
      clearTimeout(timer);
    };

    // handle keyboard input
    stdin.on('keypress', (_, data: { name: KeyEventType }): void => {
      timer.refresh();
      if (!data) {
        return;
      }

      if (data.name === 'up') {
        selectedOptionIndex$ =
          selectedOptionIndex$ > 0 ? selectedOptionIndex$ - 1 : options.length - 1;
        renderQuestionNOptions(question, options, selectedOptionIndex$);
        return;
      }

      if (data.name === 'down') {
        selectedOptionIndex$ =
          selectedOptionIndex$ < options.length - 1 ? selectedOptionIndex$ + 1 : 0;
        renderQuestionNOptions(question, options, selectedOptionIndex$);
        return;
      }

      if (data.name === 'return') {
        // user has made their choice, close the readline interface and show the selected option
        onClose();
        const selectedValue = options[selectedOptionIndex$];
        log(`You selected: ${selectedValue}`);
        resolve(selectedValue);
      }
    });

    stdin.on('error', (err) => {
      onClose();
      reject(err);
    });
  });
}
