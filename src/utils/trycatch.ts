/**
 * Merepresentasikan kasus sukses dari tuple {@link TryCatch}.
 *
 * @typeParam R - Tipe dari hasil yang dikembalikan.
 */
type Ok<R> = [result: R, err: null];

/**
 * Merepresentasikan kasus error dari tuple {@link TryCatch}.
 */
type Err = [result: unknown, err: ThrownError];

/**
 * TryCatch merepresentasikan nilai kembalian dari utility {@link $trycatch}. Ini
 * terdiri dari tuple dimana elemen pertama adalah nilai hasil dan elemen
 * kedua adalah error yang tertangkap. Elemen hasil akan bertipe "unknown"
 * sampai ketiadaan error dipastikan dalam control flow. Type narrowing kemudian
 * akan mengungkap tipe sebenarnya dari hasil. Ini memastikan bahwa keberadaan
 * nilai selalu terikat dengan ketiadaan error, dan sebaliknya. Error yang
 * tertangkap selalu dikapsulasi dalam objek {@link ThrownError} dan tersedia
 * dalam properti "cause".
 *
 * @typeParam R - Tipe kembalian dari task.
 */
type TryCatch<R> = Ok<R> | Err;

/**
 * Membungkus task sinkron dalam blok try-catch dan mengembalikan tuple
 * {@link TryCatch} yang dihasilkan.
 *
 * @param task - Task sinkron.
 * @returns Tuple {@link TryCatch} yang dihasilkan.
 */
// TODO: Ini ada di sini hanya untuk keperluan memiliki API yang sepenuhnya typed,
// berguna ketika seseorang sedang prototyping atau testing sistem tipe library ini
// dan melewatkan fungsi yang selalu throw dan tidak pernah return. Jika ada yang
// tahu bagaimana mengintegrasikan ini ke overload utama, kita bisa menghapusnya.
// Alasan utama untuk menghapusnya adalah muncul sebagai overload ketika hover
// fungsi di IDE.
export function $trycatch(task: () => never): TryCatch<never>;

/**
 * Membungkus task asinkron dalam blok try-catch dan mengembalikan promise yang
 * resolve dengan tuple {@link TryCatch} yang dihasilkan.
 *
 * @param task - Task asinkron.
 * @returns Promise yang resolve dengan tuple {@link TryCatch} yang dihasilkan.
 * @typeParam R - Tipe kembalian dari task.
 */
export function $trycatch<R>(task: () => Promise<R>): Promise<TryCatch<R>>;

/**
 * Membungkus task fungsional sinkron dalam blok try-catch dan mengembalikan
 * {@link TryCatch}-nya.
 *
 * @param task - Task fungsional sinkron.
 * @returns {@link TryCatch} dari task.
 * @typeParam R - Tipe kembalian dari task.
 */
export function $trycatch<R>(task: () => R): TryCatch<R>;

/**
 * Menghubungkan promise task dengan then/catch dan mengembalikan promise yang
 * resolve dengan tuple {@link TryCatch} yang dihasilkan.
 *
 * @param task - Promise task.
 * @returns Promise yang resolve dengan tuple {@link TryCatch} yang dihasilkan.
 * @typeParam R - Tipe kembalian dari task.
 */
export function $trycatch<R>(task: Promise<R>): Promise<TryCatch<R>>;

/**
 * Membungkus task dalam blok try-catch, atau menghubungkan promise task dengan
 * then/catch, dan mengembalikan tuple {@link TryCatch} yang dihasilkan.
 *
 * @param task - Task untuk dibungkus dalam blok try-catch.
 * @returns Tuple {@link TryCatch} yang dihasilkan atau promise yang resolve
 * dengan tuple {@link TryCatch} yang dihasilkan.
 * @typeParam R - Tipe kembalian dari task.
 */
export function $trycatch<R>(task: (() => R) | Promise<R> | (() => Promise<R>)): Promise<TryCatch<R>> | TryCatch<R> {
  if (task instanceof Promise) {
    // Menghasilkan promise yang resolve ke tuple TryCatch.
    return task.then(ok).catch(err);
  }

  try {
    // Eksekusi task dan dapatkan hasilnya.
    const maybePromiseResult = task();
    if (maybePromiseResult instanceof Promise) {
      // Menghasilkan promise yang resolve ke hasil dari task.
      return maybePromiseResult.then(ok).catch(err);
    }

    return ok(maybePromiseResult);
  } catch (thrown) {
    return err(thrown);
  }
}

/**
 * Membuat tuple {@link Ok} dengan hasil yang diberikan.
 *
 * @param result - Hasil yang akan dibungkus.
 * @returns Tuple {@link Ok}.
 * @typeParam R - Tipe dari hasil.
 */
const ok = <R>(result: R): Ok<R> => [result, null];

/**
 * Membuat tuple {@link Err} dengan nilai thrown yang diberikan.
 *
 * @param thrown - Nilai thrown yang akan dibungkus.
 * @returns Tuple {@link Err}.
 */
const err = (thrown: unknown): Err => [null, new ThrownError(thrown)];

/**
 * Mengkapsulasi nilai thrown dalam objek error.
 */
export class ThrownError extends Error {
  /**
   * Membuat error baru dengan cause yang diberikan.
   *
   * @param cause - Penyebab dari error.
   */
  public constructor(cause: unknown) {
    super("thrown error", { cause });
    // Secara manual set cause sebagai property untuk backward compatibility.
    this.cause = cause;
    // Capture stack trace.
    if (Error.captureStackTrace) Error.captureStackTrace(this, ThrownError);
  }
}
