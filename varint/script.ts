import fs from 'fs';
import path from 'path';

// i use `tsx watch varint/script.ts` to run this

// basic decoder of 64 bit integers
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

console.log(decode("00000010010110"))


// now this is an ENCODER using protobuf definitions of their base 128 varint
// https://protobuf.dev/programming-guides/encoding/#varints

/*  
for example, this is 150
10010110 00000001

Each byte in the varint has a continuation bit that indicates if the byte that follows it is part of the varint. This is the most significant bit (MSB) of the byte (sometimes also called the sign bit). The lower 7 bits are a payload; the resulting integer is built by appending together the 7-bit payloads of its constituent bytes.

Here are steps from protobuf docs

10010110 00000001        // Original inputs.
 0010110  0000001        // Drop continuation bits.
 0000001  0010110        // Convert to big-endian.
   00000010010110        // Concatenate.
 128 + 16 + 4 + 2 = 150  // Interpret as an unsigned 64-bit integer.
 */

 
 const protobufEncoder = (number: number) => {



    

 }

 console.log(protobufEncoder(150))
 console.log('10010110 00000001')

 