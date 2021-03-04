import { reportInputIssue } from './report-input-issue';
import { ns } from './ns';

describe(ns('reportInputIssue'), () => {
	it('should return correct issue report', () => {
		expect.assertions(3);

		class CustomClass {}

		const template = '%arg% | %argType%';

		expect(reportInputIssue(template)(undefined)).toMatchSnapshot();
		expect(reportInputIssue(template)(2)).toMatchSnapshot();
		expect(reportInputIssue(template)(new CustomClass())).toMatchSnapshot();
	});
});
