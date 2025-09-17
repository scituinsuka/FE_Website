import { z } from "zod";

/**
 * Schema validasi untuk environment variables yang dibutuhkan aplikasi
 *
 * Schema ini menggunakan Zod untuk memvalidasi dan mentransformasi
 * environment variables dengan aturan sebagai berikut:
 * - NEXT_PUBLIC_BACKEND_URL: Harus berupa URL yang valid
 * - NEXT_PUBLIC_TIMEOUT_SECOND: Harus berupa string angka positif yang akan dikonversi ke integer
 * - NODE_ENV: Harus berupa salah satu dari 'development', 'production', atau 'test'
 *
 * @constant {z.ZodObject} envSchema - Schema validasi Zod untuk environment variables
 */
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

/**
 * Hasil parsing dan validasi environment variables
 *
 * Melakukan validasi terhadap process.env menggunakan envSchema.
 * Jika validasi gagal, akan menampilkan error yang jelas dan menghentikan aplikasi.
 *
 * @constant {z.SafeParseReturnType} parsedEnv - Hasil parsing environment variables
 */
const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  const issues = parsedEnv.error.issues.map((issue) => {
    return `- ${issue.path.join(".")}: ${issue.message}`;
  });

  console.error("❌ Invalid or missing environment variables:\n" + issues.join("\n"));
  throw new Error("Invalid environment variables.");
}

/**
 * Environment variables yang sudah divalidasi dan siap digunakan
 *
 * Object ini berisi environment variables yang sudah melalui proses validasi
 * dan transformasi sesuai dengan schema yang didefinisikan. Semua nilai
 * dijamin aman dan sesuai dengan tipe data yang diharapkan.
 *
 * @constant {Object} env - Environment variables yang sudah divalidasi
 * @property {string} NEXT_PUBLIC_BACKEND_URL - URL backend API
 * @property {number} NEXT_PUBLIC_TIMEOUT_SECOND - Timeout dalam detik untuk request API
 * @property {'development'|'production'|'test'} NODE_ENV - Environment mode aplikasi
 *
 * @example
 * ```typescript
 * // Menggunakan URL backend
 * const apiUrl = env.NEXT_PUBLIC_BACKEND_URL;
 *
 * // Menggunakan timeout setting
 * const timeout = env.NEXT_PUBLIC_TIMEOUT_SECOND * 1000; // convert to milliseconds
 *
 * // Mengecek environment mode
 * if (env.NODE_ENV === 'development') {
 *   console.log('Running in development mode');
 * }
 * ```
 */
export const env = parsedEnv.data;
