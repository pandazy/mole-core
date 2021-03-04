import { Lambda1 } from '../types';
import { reportInputIssue } from './report-input-issue';
import { replaceAllBy } from '../string/replace-all';

function buildInputFailureMessage(
	context: string,
	failureCause: string,
	template: string,
): string {
	return replaceAllBy({
		'%context%': context,
		'%failureCause%': failureCause,
	})(template);
}

const InputFailureErrorTemplate = `
[context]: %context%
[failure cause]: %failureCause%
[actual value]: %arg%
[actual value type]: %argType%`;

export function assertValue<TInput>(rule: {
	isValid: Lambda1<TInput, boolean>;
	failureCause: string;
}) {
	return (context: string) => (inputValue: TInput) => {
		const message = buildInputFailureMessage(
			context,
			rule.failureCause,
			InputFailureErrorTemplate,
		);
		if (!rule.isValid(inputValue)) {
			throw new Error(reportInputIssue(message)(inputValue));
		}
	};
}
