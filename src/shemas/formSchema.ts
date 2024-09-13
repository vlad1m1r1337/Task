import {z} from "zod";

export const formSchema = z.object({
    name: z.string()
        .min(1, { message: "Name is required" })
        .max(50, { message: "Name must be less than 50 characters" }),
    surname: z.string()
        .min(1, { message: "Surname is required" })
        .max(50, { message: "Surname must be less than 50 characters" }),
    age: z.number()
        .nonnegative({ message: "Age cannot be negative" })
        .min(1, { message: "Age is required" })
        .max(120, { message: "Age must be less than 120" }),
    email: z.string()
        .email({ message: "Invalid email address" })
        .max(100, { message: "Email must be less than 100 characters" }),
});

export type IFormInput = z.infer<typeof formSchema>;