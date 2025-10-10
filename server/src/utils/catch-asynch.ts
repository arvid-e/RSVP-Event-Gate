import { NextFunction, Request, RequestHandler, Response } from 'express';

// Define a type for asynchronous handler functions (e.g. controller functions)
type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

/**
 * A higher-order function to wrap asynchronous Express route handlers.
 * It catches any errors from the async function
 * and passes them to Express's next() middleware, ensuring they are
 * caught by the global error handler.
 *
 * @param fn The asynchronous Express route handler function (your controller function).
 * @returns An Express RequestHandler that ensures errors are passed to 'next()'.
 */
export const catchAsync = (fn: AsyncHandler): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
