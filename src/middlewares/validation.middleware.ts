import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodIssue } from 'zod';

const formatZodIssue = (issue: ZodIssue): string => {
  const { path, message } = issue;
  const pathString = path.join('.');


  return `${pathString}: ${message}`;
};

const formatZodError = (error: unknown) => {
  const { issues } = error as typeof error & { issues: ZodIssue[] };

  if (issues.length) {
    const currentIssue = issues[0];

    return formatZodIssue(currentIssue);
  }
};
export const validateDTO = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
	try {
		
		// console.log(req.body);
		
		
		
		await schema.parseAsync({
			body: req.body,
			query: req.query,
			params: req.params,
		});
		return next();
	} catch (error) {
		
		
		return res.status(400).json({
			message: `Validation Error : ${formatZodError(error)}`,
			status: 400,
			success: false,
		});
  	}
};

