import fs from 'fs';
import path from 'path';

const cssFile = path.join(__dirname, 'advanced.css');
let buff = fs.readFileSync(cssFile);
const string = buff.toString();

const hexadecimalValueMap = {
    "0": 0,
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "a": 10,
    "b": 11,
    "c": 12,
    "d": 13,
    "e": 14,
    "f": 15,
}

const hexStringToRGB = (_hex: string) => {
    const hex = _hex.toLocaleLowerCase()
    const values: number[] = [];
    for (let index = 1; index < 7; index += 2) {
        const [a, b] = [hexadecimalValueMap[hex[index]], hexadecimalValueMap[hex[index + 1]]];
        values.push(a * 16 + b)
    }

    if (hex.length > 7) {
        const [a, b] = [hexadecimalValueMap[hex[7]], hexadecimalValueMap[hex[8]]];
        const val = (a * 16 + b)
        const percent = (val / 255).toFixed(5)
        return `rbg(${values.join(' ')} / ${percent})`
    } else {
        return `rbg(${values.join(' ')})`
    }
}

console.log(hexStringToRGB("#fe030a"), "should be ", "rgb(254 3 10)")
console.log(hexStringToRGB("#0000FFC0"), "should be ", "rgb(0 0 255 / 0.75294)")

// ai made this regex for me
const updatedString = string.replaceAll(/#[^;]+/g, (match) => {
    return hexStringToRGB(match)

})

console.log(updatedString)