import { z } from 'zod'


const userSchema = z.object({
    // TO BE DISCUSSED
    user_id: z.string().min(10, { message: "user_id is required" }), // user_id must be a non-empty string
    username: z.string().min(5, { message: "username is required" }), // username must be a non-empty string
    avatar: z.string().url({ message: "avatar must be a valid URL" }).optional(), // avatar must be a valid URL (optional)
    bio: z.string().optional(), // bio is optional with no max length
});

import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';


// Middleware to validate user data
const validateUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        // Validate the request body against the userSchema
        userSchema.parse(req.body);
        next(); // Proceed to the next middleware if validation passes
    } catch (error) {
        if (error instanceof ZodError) {
            // If validation fails, return a 400 response with validation error details
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: error.errors, // Return the specific validation errors from Zod
            });
        }
        // In case of any other error, pass it to the error handling middleware
        next(error);
    } 
};

export { validateUser };
