# Steps

## 1: Recap on bytes and bits

So 1.uint64 represents the number "1" encoded in 64 bit (8 byte)

As a reminder, a bit a single binary entry 

In binary encoding, you have 4 spaces and it represents a number

_ _ _ _

The rule for these spaces is 

8 4 2 1

So 


0 0 0 1 = 1

1 0 0 0 = 8

and the max it can be is 

1 1 1 1 = 15

Ok now 

Ok and then 8 of these binary entries is a BYTE

Example

0 1 1 1 0 0 0 1

Bytes are 8, idk why... convention? But whatever.

Ok so we can ALSO represent this binary data using HEXI-DECIMAL ...

So if we want to represent 0 - 15 in a single character, we can get 0 - 9 using numbers, but we need single character for 10 - 15

So they use letters

0 1 2 3 4 5 6 7 8 9 A B C D E F

So for example, 

F3 

means 4 bits that equal 15, then 4 bits that equal 3 ...

E.G. 11110011

SO that is an 8 bit integer and its represented with 1 byte represented hexidecimally. 

But if we 64 bit integegers, it would be represented by *8 hexidecimal bytes*

## 2: How to read these files

You can use hexdump 

`hexdump -C varint/1.uint64 | head`

That gives something like 

```
00000000  00 00 00 00 00 00 00 01                           |........|
00000008
```

The group of numbers on the left is the index of where that row starts on the file, so we can mostly ignore that for now

the important thing are the groups of hexidecimal numbers.

Notice there are 8 hexidecimal bytes! That means this is 64 bit integer.

Also that number represents 1 clearly. 

ok now we do 150 

`hexdump -C varint/150.uint64 | head`

```
00000000  00 00 00 00 00 00 00 96                           |........|
00000008
```

Ok so what does 96 represnet?

It means four bits are 9 and four bits are 6 so thats

1 0 0 1 0 1 1 0

Ok then what do you do with those numbers?

9 and 6? Does it just represent the number 96?

Well, in hexadecimal you take the first digit, the 9, and you multiply that by the base, which in this case in hexadecimal is 16. 

And then you add the second number. This is a bit different than in normal.

Base 10 math where you take the leftmost digit and multiply it by 10 and then add the second digit. In this case you multiply it by 16. That's really how hexadecimal works.

so the base 9 * 16 = 144 + 6 = 150
So BOOM that's why this is 150 

Okay, that's an easy way to think about it. But the better way to think about it is that in 64-bit numbers, starting from the right side, you power the base to zero. so it's 16 to the power of 0. Moving leftward you increase that power, so the next one to the left is 16 to the power of 1 and then the left again is 16 to the power of 2 and to the left again is 16 to the power of 3 and you add them all up.

So in this case, here's how it would look.

00 00 00 00 00 00 96 96 

9 × 16³ + 6 × 16² + 9 × 16¹ + 6 × 16⁰



