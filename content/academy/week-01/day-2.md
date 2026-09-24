**Time:** about 6 hours · 1.5 h reading · 3.5 h lab · 30 min check · 30 min journal
**No AI this week.**

## By the end of today you can

- Convert between decimal, binary and hexadecimal by hand
- Explain what the CPU, RAM and storage each do, and why their speeds differ so much
- Describe the stack and the heap, and what a memory address is
- Explain why text is stored as numbers, and why UTF-8 won

## Why this exists

Every value in a program ends up as bits in memory. Many bugs that look mysterious are this layer showing through: money that stops adding up (week 3), a name that prints as `Ã©` instead of `é`, a program that runs out of memory. Go shows you pointers from week 3 onward. Today makes them concrete instead of scary.

## How it works

### Bits, binary and hex

A **bit** is 0 or 1. A **byte** is 8 bits, so it can hold 2⁸ = 256 different values (0–255).

Binary is base 2. Each position is worth double the one to its right:

| 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | 0 | 1 | 0 | 1 | 0 | 1 | 0 |

`00101010` = 32 + 8 + 2 = **42**.

Hexadecimal is base 16, with digits `0–9` and `a–f` (a = 10 … f = 15). One hex digit is exactly 4 bits, so one byte is always two hex digits: `0010 1010` → `2a`. Programmers use hex because it is a compact way to write bytes. You will see it in memory addresses (`0xc000012080`), colours (`#1D4ED8`) and file dumps.

### CPU, memory and storage

- The **CPU** runs instructions: load a value, add two values, compare, jump to another instruction. It does billions per second.
- **RAM** holds the running program's instructions and data. It is fast and is wiped when the power goes off.
- **Storage** (SSD or hard disk) keeps files when the power is off. It is much slower than RAM.

Approximate time to fetch data, scaled so that one CPU cycle takes one second:

| Where | Real time | If a CPU cycle were 1 second |
| --- | --- | --- |
| CPU register | ~0.3 ns | 1 second |
| RAM | ~100 ns | about 6 minutes |
| SSD | ~100 µs | about 4 days |
| Network round trip, Nairobi to Europe | ~150 ms | about 16 years |

This table explains many design decisions later in the course: why databases keep indexes in memory, why caching exists and why a slow network call dominates a request.

### Addresses, the stack and the heap

RAM is a long row of bytes, and each byte has a number: its **address**. A variable is a name for some bytes at an address. A **pointer** is a variable that holds an address.

A running program divides its memory into regions. Two matter now:

- **The stack** holds each function call's local variables. When a function is called, a frame is pushed on top; when it returns, the frame is removed. This is fast and automatic, and each thread's stack has a limited size.
- **The heap** holds data that must outlive the function that created it, or whose size is only known at run time. It is more flexible but costs more to manage. Go cleans it up for you with a **garbage collector**.

Infinite recursion fills the stack and crashes the program. That is a stack overflow. Keeping references to data you no longer need grows the heap. That is a memory leak.

### Compile or interpret

A **compiler** translates the whole program into machine instructions before it runs, producing a binary (Go and C do this). An **interpreter** reads the program and carries it out step by step while it runs (Bash, and in effect Python). Compiled programs start fast and catch many mistakes before running. Interpreted ones are quicker to try out.

### Text is numbers

A computer stores only numbers, so text needs an agreed table that maps characters to numbers.

- **ASCII** (1963) used 7 bits: 128 characters, enough for English. `A` = 65 = `0x41`.
- **Unicode** gives every character in every language a number called a code point: `é` is U+00E9, `😀` is U+1F600.
- **UTF-8** stores those code points as 1 to 4 bytes. ASCII characters stay 1 byte and keep their old values, so old English text is already valid UTF-8. That backward compatibility is why UTF-8 won. Most of the web uses it.

When text is written in one encoding and read as another, you get mojibake: `é` becomes `Ã©`.

## When to use it, and what it costs

You rarely convert binary by hand at work. You need the model to reason about limits (why a byte cannot hold 300), costs (why RAM is faster than disk) and bugs (why a string's byte length differs from its character count).

## Lab (3.5 h)

### 1. Number conversions by hand, then check

Convert these on paper first, then check your answers in the terminal:

- 13, 200 and 255 to binary
- `11111111`, `10000000` and `01100001` to decimal
- 255, 16 and 4096 to hex

```bash
echo $((2#01100001))     # binary to decimal
echo $((16#ff))          # hex to decimal
printf '%x\n' 4096       # decimal to hex
printf '%08d\n' "$(echo 'obase=2; 13' | bc)"   # decimal to binary (install bc if missing: sudo apt install bc)
```

### 2. Look at the machine

```bash
lscpu | head -20     # CPU model, cores, architecture (x86_64 or aarch64?)
free -h              # RAM: total, used, available
df -h /              # disk space on the root file system
lsblk                # disks and partitions
```

Record your CPU model, number of cores, RAM and disk size in your journal. You will compare them with your AWS server in week 12.

### 3. See text as bytes

```bash
echo -n "A" | xxd              # 41 → ASCII 65
echo -n "Hi" | xxd
echo -n "é" | xxd              # 2 bytes in UTF-8
echo -n "😀" | xxd             # 4 bytes
echo -n "é" | wc -c            # byte count
echo -n "é" | wc -m            # character count
```

Explain in your journal why `wc -c` and `wc -m` disagree for `é` and agree for `A`.

### 4. Watch memory in use

```bash
ps aux --sort=-%mem | head -5  # which processes use the most memory?
cat /proc/meminfo | head -5
```

### Break it

```bash
echo -n "café" > cafe.txt
iconv -f UTF-8 -t ISO-8859-1 cafe.txt > cafe-latin1.txt   # re-encode as an old European encoding
cat cafe-latin1.txt              # what does the terminal show, and why?
xxd cafe.txt; xxd cafe-latin1.txt
```

Write down what went wrong, which program assumed which encoding, and how you would fix it (hint: `iconv` in the other direction).

## Security

- Memory bugs in languages such as C (writing past the end of a buffer) have caused some of history's worst security holes. Go checks bounds on every slice and array access for this reason. You will see it panic instead of silently corrupting memory.
- Text that looks the same can be different bytes. An attacker can register `nallalabs.xyz` with a Cyrillic `а` in place of the Latin `a`. Browsers defend against this, but your own code will compare strings, and "looks equal" is not "is equal".

## Journal (30 min)

Add today's entry to `~/nalla/journal/week-01.md`: your machine's specs, the `wc -c` vs `wc -m` explanation, the encoding break and one question for the clinic.

## Check yourself

1. What is `0x10` in decimal? What is `0xff`?
2. Why does a byte hold at most 255?
3. A function creates a value and returns a pointer to it. Can the value live on that function's stack frame? Why or why not?
4. How many bytes does `naïve` take in UTF-8?

<details>
<summary>Answers</summary>

1. 16 and 255.
2. 8 bits give 2⁸ = 256 values, and counting starts at 0.
3. No. The frame disappears when the function returns, so the value must outlive it. Go's compiler notices and puts it on the heap. This is called escape analysis; you will see it again in week 19 with pprof.
4. 6. Four ASCII letters take 1 byte each and `ï` takes 2.

</details>
