**Time:** about 6 hours · 1.5 h reading · 3.5 h lab · 30 min check · 30 min journal
**No AI this week.**

## By the end of today you can

- Explain what a process is and inspect running processes with `ps`, `top` and `kill`
- Read and change file permissions with `ls -l`, `chmod` and `chown`
- Explain users, groups and root, and use `sudo` deliberately
- Diagnose a "permission denied" error instead of guessing

## Why this exists

A program on disk is just a file. It becomes something that acts only when the operating system loads it into memory and starts it as a **process**. Every program you write in this course, from the first Go CLI to the API on AWS, is a process that reads and writes files. Without this model, errors like "file not found" and "permission denied" are magic. With it, they are obvious.

Permissions exist because Linux was built for many users sharing one machine. The same rules now protect servers: your web app should not be able to read the database's files, and a hacked process should reach as little as possible.

## How it works

### Processes

When you run `ls`, the shell asks the kernel (the core of the operating system) to create a new process and load the `ls` program into it. Every process has:

- a **PID** (process ID) and a **parent PID**, since every process is started by another
- an **owner** (the user it runs as), which decides what it may touch
- its own memory: stack, heap and program code
- open **file descriptors**: 0 is standard input, 1 is standard output, 2 is standard error
- **environment variables** and a **current directory**
- an **exit code** when it finishes: 0 means success, anything else means failure

Programs cannot touch hardware or other processes' memory directly. They ask the kernel through **system calls** such as `open`, `read`, `write` and `fork`. You can watch them with `strace`.

The kernel's **scheduler** switches between processes thousands of times a second, which is how one CPU core appears to run many programs at once.

A **thread** is a second line of execution inside the same process, sharing its memory. Go's goroutines (week 11) run on top of threads.

**Virtual memory:** each process sees its own private address space. The kernel maps it onto real RAM, so one process cannot read another's memory by accident or on purpose.

### Signals

The kernel can send a process a **signal**. `SIGTERM` (15) politely asks it to stop, and it may clean up first. `SIGKILL` (9) ends it immediately and cannot be caught. `SIGINT` (2) is what Ctrl+C sends. Always try `SIGTERM` first.

### Users, groups and permissions

Every file has an owner user, an owner group and three sets of permissions:

```text
-rwxr-x--- 1 amina devs 1024 Sep 25 10:00 report.sh
│└┬┘└┬┘└┬┘   └─┬─┘ └┬─┘
│ │  │  │      │    └── group
│ │  │  │      └─────── owner
│ │  │  └── others: no access
│ │  └───── group: read and execute
│ └──────── owner: read, write and execute
└────────── type: - file, d directory, l link
```

| Letter | On a file | On a directory |
| --- | --- | --- |
| `r` | read its contents | list its names |
| `w` | change its contents | create, delete or rename files inside it |
| `x` | run it as a program | enter it (`cd`) and reach files inside it |

Permissions are often written as three octal digits, where r = 4, w = 2 and x = 1: `rwxr-x---` = 7, 5, 0 = **750**. `644` (rw-r--r--) is typical for files; `755` for programs and directories.

**root** (user ID 0) ignores almost every permission check. `sudo` lets permitted users run one command as root, and it logs that they did.

## When to use it, and what it costs

Use the most restrictive permissions that still work. The cost of loose permissions is invisible until something goes wrong. The cost of tight ones is an occasional "permission denied" that you now know how to read.

## Lab (3.5 h)

### 1. Look at processes

```bash
echo $$                  # PID of your current shell
ps -f                    # processes in this terminal, with parent PIDs
ps aux | head            # every process on the machine
pstree -p | head -20     # the family tree. What is PID 1?
top                      # live view. Press q to quit, M to sort by memory
```

### 2. Start, pause and stop a process

```bash
sleep 300 &              # & runs it in the background
jobs                     # background jobs of this shell
ps -f | grep sleep       # find its PID
kill <PID>               # send SIGTERM
echo $?                  # exit code of kill itself
sleep 300                # in the foreground this time, then press Ctrl+C
echo $?                  # 130 = 128 + 2 (SIGINT)
```

### 3. Watch system calls

```bash
sudo apt install strace
strace -e trace=openat,read,write cat /etc/hostname
```

Find the line where `cat` opens the file and the line where it writes to your screen (file descriptor 1). This is the system trace for Phase 0: keyboard → process → system call → file.

### 4. Permissions

```bash
cd ~/nalla/week-01/practice
echo 'echo "it runs"' > run.sh
ls -l run.sh
./run.sh                  # permission denied. Why?
chmod +x run.sh
./run.sh
chmod 600 run.sh; ls -l run.sh
chmod 750 run.sh; ls -l run.sh
id                        # your user ID and groups
ls -l /etc/shadow         # who can read password hashes?
cat /etc/shadow           # denied
sudo head -2 /etc/shadow  # allowed, and logged
sudo journalctl -n 5 | grep sudo
```

### 5. Share with a group

```bash
sudo groupadd treasurers
sudo useradd -m -G treasurers wanjiru
sudo mkdir /srv/ledger
sudo chown root:treasurers /srv/ledger
sudo chmod 770 /srv/ledger
ls -ld /srv/ledger
sudo -u wanjiru touch /srv/ledger/may.csv   # works: wanjiru is in the group
touch /srv/ledger/june.csv                  # fails for you. Why?
```

Add yourself to the group (`sudo usermod -aG treasurers $USER`), log out and back in, and try again. Explain in your journal why logging out was needed.

### Break it

Your instructor will give you a folder where something is wrong. To practise now, make your own:

```bash
mkdir -p ~/nalla/week-01/locked/inner
echo secret > ~/nalla/week-01/locked/inner/file.txt
chmod 600 ~/nalla/week-01/locked       # remove x from the directory
cat ~/nalla/week-01/locked/inner/file.txt
```

The file itself is readable, so why does this fail? Use `ls -ld` on each directory in the path to find the cause, fix it with the smallest change possible, then clean up with `sudo userdel -r wanjiru` and `sudo rm -r /srv/ledger`.

## Security

- **Least privilege:** give each user and process only the access it needs. In week 12 your API will run as its own user, not root, for exactly this reason.
- Use `sudo` for single commands. Do not live in a root shell (`sudo -i`) where every typo runs as root.
- `chmod 777` "fixes" permission errors by giving everyone full access. It is never the answer. Find which bit is actually missing.

## Journal (30 min)

Add today's entry: the PID of your shell and of PID 1's program, the `strace` lines you found, the locked-directory diagnosis and one question for the clinic.

## Check yourself

1. What permissions does `640` give, and to whom?
2. A web server running as user `www-data` cannot read `/home/amina/site/index.html`, which is `644`. What else could be blocking it?
3. What is the difference between `kill` and `kill -9`?
4. Why can a process not read another process's memory?

<details>
<summary>Answers</summary>

1. Owner read and write; group read; others nothing.
2. A directory on the path, most likely `/home/amina` (often `750`), lacks `x` for others, so `www-data` cannot pass through it.
3. `kill` sends SIGTERM, which the process can catch to clean up. `kill -9` sends SIGKILL, which ends it immediately with no clean-up. That can leave half-written files, which you will meet in week 5.
4. Virtual memory: each process has its own address space, and the kernel only maps its own pages into it.

</details>
