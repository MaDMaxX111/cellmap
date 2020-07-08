//возращает буквенное представление числа
//1 - A, 26 - Z, 27 - AA
export const mapAlphabet = (n: number) : string => {
    const ordA = 'a'.charCodeAt(0);
    const ordZ = 'z'.charCodeAt(0);
    const len = ordZ - ordA + 1;

    let s = '';
    while (n >= 0) {
        s = String.fromCharCode(n % len + ordA) + s;
        n = Math.floor(n / len) - 1;
    }
    return s.toLocaleUpperCase();
}
