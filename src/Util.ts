type Recordable = number | string;

export function capitalize(s: string): string {
    let strings = s.split(" ");

    for (let i = 0;i < strings.length;i++) {
        const s = strings[i];
        strings[i] = s ? s[0].toUpperCase() + s.substring(1) : "";
    }
    return strings.join(" ");
}

export function sample<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function swapObj<K extends Recordable, V extends Recordable>(obj: Record<K, V>): Record<V, K> {
    let result: Record<Recordable, Recordable> = {};
    for (const k in obj) result[obj[k]] = k;
    return <Record<V, K>>result;
}

export function reduce(numerator: number, denominator: number): [ number, number ] {
    var a = numerator;
    var b = denominator;
    var c;
    while (b) {
        c = a % b; a = b; b = c;
    }
    return [numerator / a, denominator / a];
}