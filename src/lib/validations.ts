import { z } from "zod";

export const registerSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  businessName: z.string().min(2, "Business name is required"),
  mobile: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"),
  email: z.string().email("Valid email required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  businessCategory: z.string().default("Street Food"),
  preferredLanguage: z.enum(["en", "hi", "kn"]).default("en"),
});

export const transactionVerifySchema = z.object({
  utr: z.string().min(10, "Valid UPI reference (UTR) required"),
  amount: z.number().positive("Amount must be greater than 0"),
  vendorId: z.string().default("VEN-RAMESH-01"),
});

export const simulationGenerateSchema = z.object({
  amount: z.number().positive(),
  status: z.enum(["SUCCESSFUL", "PENDING", "FAILED"]),
  source: z.enum(["GOOGLE_PAY", "PHONEPE", "PAYTM", "BHIM", "CRED", "OTHER_UPI"]).default("PHONEPE"),
  payerName: z.string().optional(),
  networkCondition: z.enum(["ONLINE", "SLOW", "HIGH_LATENCY", "OFFLINE"]).default("ONLINE"),
  isFakeScreenshotAttempt: z.boolean().default(false),
  reportedAmountMismatch: z.boolean().default(false),
});

export const orderCreateSchema = z.object({
  items: z.array(
    z.object({
      name: z.string(),
      quantity: z.number().int().positive(),
      price: z.number().positive(),
    })
  ).min(1, "At least one item is required"),
  customerName: z.string().optional(),
  tableOrToken: z.string().optional(),
});

export const webhookPayloadSchema = z.object({
  event: z.string(),
  utr: z.string(),
  amount: z.number(),
  currency: z.literal("INR").default("INR"),
  sender_vpa: z.string(),
  status: z.enum(["SUCCESS", "FAILURE", "PENDING"]),
  timestamp: z.string().optional(),
  signature: z.string().optional(),
});
