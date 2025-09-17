import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_BACKEND_URL: z
    .url({
      message: "NEXT_PUBLIC_BACKEND_URL harus berupa URL yang valid",
    })
    .default("http://localhost:3000/api"),
  NEXT_PUBLIC_TIMEOUT_SECOND: z
    .string()
    .default("60")
    .transform((val) => parseInt(val, 10))
    .refine((val) => val > 0, {
      message: "NEXT_PUBLIC_TIMEOUT_SECOND harus berupa angka positif",
    }),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  const issues = parsedEnv.error.issues.map((issue) => {
    return `- ${issue.path.join(".")}: ${issue.message}`;
  });

  console.error("❌ Invalid or missing environment variables:\n" + issues.join("\n"));
  throw new Error("Invalid environment variables.");
}

export const env = parsedEnv.data;
