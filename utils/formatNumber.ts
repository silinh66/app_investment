/**
 * Format về "Tỷ" (10^9), mặc định 1 chữ số thập phân.
 * Hỗ trợ number | bigint | string, xử lý cả số rất lớn.
 */
export function formatToTy(
  input: number | bigint | string,
  fractionDigits: 1 | 2 | 3 = 1
): string {
  // Chuẩn hóa đầu vào
  const isBigInt = typeof input === 'bigint';
  if (isBigInt) return formatBigIntToTy(input as bigint, fractionDigits);

  let n: number;
  if (typeof input === 'number') {
    n = input;
  } else {
    // Loại bỏ dấu phẩy/ngăn cách nếu có trong string
    const cleaned = (input as string).replace(/,/g, '').trim();
    n = Number(cleaned);
  }
  if (!Number.isFinite(n)) throw new Error('Giá trị không hợp lệ');

  const valueInTy = n / 1e9;
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits
  }).format(valueInTy);

  return `${formatted} Tỷ`;
}

function formatBigIntToTy(n: bigint, fractionDigits: 1 | 2 | 3): string {
  const billion = 1_000_000_000n;
  const ten = 10n;

  const negative = n < 0n;
  if (negative) n = -n;

  // Phần nguyên theo "Tỷ"
  let integer = n / billion;
  let remainder = n % billion;

  // Làm tròn theo số chữ số thập phân yêu cầu (mặc định 1)
  // Công thức: digit = floor((remainder * 10^d + 0.5 * 10^(9)) / 10^9)
  // Triển khai dạng bigint:
  const pow10d = 10n ** BigInt(fractionDigits);
  // Hệ số làm tròn half-up:
  const rounder = 5n * (10n ** (9n - 1n)); // 0.5 * 10^9 = 500,000,000
  let frac = (remainder * pow10d + rounder) / billion; // 0..(10^d)
  // Nếu tràn (vd 9.95 làm tròn thành 10.0) thì cộng vào phần nguyên
  const threshold = pow10d;
  if (frac >= threshold) {
    integer += 1n;
    frac -= threshold;
  }

  // Thêm dấu phẩy hàng nghìn cho phần nguyên (bigint an toàn)
  const intStr = addCommas(integer.toString());
  // Bổ sung số 0 ở đầu phần thập phân nếu cần
  const fracStr =
    fractionDigits > 0
      ? `.${frac.toString().padStart(fractionDigits, '0')}`
      : '';

  return `${negative ? '-' : ''}${intStr}${fracStr} Tỷ`;
}

function addCommas(s: string): string {
  return s.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Format số theo kiểu en-US: 1,234.56
 * - input: number | bigint | string (chuỗi có thể chứa thập phân)
 * - fraction:
 *    + 'preserve' (mặc định): nếu input là string, giữ nguyên số chữ số thập phân trong chuỗi.
 *    + số cụ thể (0..20): ép về đúng số chữ số thập phân đó.
 */
export function formatThousands(
  input: number | bigint | string,
  fraction: number | 'preserve' = 'preserve'
): string {
  if (typeof input === 'bigint') {
    return addCommas(input.toString());
  }

  let n: number;
  let minFrac = 0;
  let maxFrac = 2; // mặc định cho kiểu number

  if (typeof input === 'string') {
    const cleaned = input.replace(/,/g, '').trim();
    const m = cleaned.match(/^\s*-?\d+(?:\.(\d+))?\s*$/);
    if (!m) throw new Error('Giá trị không hợp lệ');

    if (fraction === 'preserve') {
      const decLen = m[1]?.length ?? 0;
      minFrac = decLen;
      maxFrac = decLen;
    } else {
      minFrac = fraction;
      maxFrac = fraction;
    }
    n = Number(cleaned);
  } else {
    n = input;
    if (!Number.isFinite(n)) throw new Error('Giá trị không hợp lệ');
    if (typeof fraction === 'number') {
      minFrac = fraction;
      maxFrac = fraction;
    }
  }

  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: minFrac,
    maximumFractionDigits: maxFrac
  }).format(n);
}
