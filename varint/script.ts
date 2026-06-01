import fs from 'fs';
import path from 'path';

// i use `tsx watch varint/script.ts` to run this

// this is my naive implementation before watching too much of solution lecture

const decode = (_hexdump: string): number => {
    console.log(_hexdump)
    const hexdump = _hexdump.split('')

    const valuesToAdd: number[]= [];

    for (let index = hexdump.length - 1; index > -1; index -= 1) {
        const power = Math.abs(hexdump.length - index) - 1;
        const value = Number(hexdump[index]);

        const result = value * Math.pow(16, power)
        valuesToAdd.push(result)
    }
    return valuesToAdd.reduce((acc, v) => acc + v, 0)
}

let OneFiftyFilePath = path.join(__dirname, '150.uint64');
let buff = fs.readFileSync(OneFiftyFilePath);

console.log(decode(buff.toString('hex')))

let OneFilePath = path.join(__dirname, '1.uint64');
buff = fs.readFileSync(OneFilePath);

console.log(decode(buff.toString('hex')))

console.log(decode("0000000000009696"))
// should be 38550