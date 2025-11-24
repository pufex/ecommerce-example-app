import {z} from "zod"

export const registerSchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string()
})

export const loginSchema = z.object({
    email: z.email(),
    password: z.string(),
})

export const detailsSchema = z.object({
    emailAddress: z.union([z.email(), z.null()]),
    phoneNumber: z.union([z.string(), z.null()]),
    name: z.union([z.string(), z.null()]),
    surname: z.union([z.string(), z.null()]),
    country: z.union([z.string(), z.null()]),
    state: z.union([z.string(), z.null()]),
    city: z.union([z.string(), z.null()]),
    zipCode: z.union([z.string(), z.null()]),
    street: z.union([z.string(), z.null()]),
    houseNumber: z.union([z.string(), z.null()]),
    roomNumber: z.union([z.string(), z.null()]),
})