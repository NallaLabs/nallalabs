**Time:** about 6 hours · 1.5 h reading · 3.5 h lab · 30 min check · 30 min journal
**No AI this week.** Phase 0 is learned without an assistant, so that later you can tell when one is wrong.

## By the end of today you can

- Boot your laptop into Ubuntu LTS, installed natively or alongside Windows
- Open a terminal and explain what the prompt is telling you
- Move around the file system with `pwd`, `ls`, `cd`, and create, copy, move and delete files
- Find help for any command without a search engine

## Why this exists

Almost every server on the internet runs Linux. The code you write in this course will run on Linux servers, be built by Linux machines in CI and ship in Linux containers. If your laptop runs the same system, the commands you learn today are the commands you will use in production in week 12.

Before graphical desktops, the terminal was the only way to use a computer. It survived because it is precise (a command does exactly one thing), repeatable (you can save commands in a script) and works over a network (you will control a server in another country through one in week 12).

## How it works

A **terminal** is a window that sends your keystrokes to a program called a **shell** and shows what the shell prints back. On Ubuntu the shell is **Bash**. When you type a command and press Enter, Bash finds a program with that name, starts it, and waits for it to finish.

The prompt looks like this:

```text
amina@laptop:~$
```

| Part | Meaning |
| --- | --- |
| `amina` | the user you are logged in as |
| `laptop` | the machine's hostname |
| `~` | the current directory; `~` is short for your home directory, `/home/amina` |
| `$` | you are a normal user. A `#` here means you are root, the all-powerful user. Be careful. |

Linux has **one tree of directories** starting at `/` (the root). There are no drive letters like `C:`. A USB stick appears somewhere inside the tree, usually under `/media`.

| Path | What lives there |
| --- | --- |
| `/home/<you>` | your files |
| `/etc` | system configuration, as text files |
| `/usr/bin` | installed programs |
| `/var/log` | logs |
| `/tmp` | temporary files, cleared on reboot |

A path starting with `/` is **absolute**. Anything else is **relative** to the current directory. `.` means "here" and `..` means "the parent directory".

## When to use it, and what it costs

Use the terminal when you need precision, repetition or remote access. Use a graphical tool when you are exploring something visual. The cost is that the terminal does what you say, not what you mean: `rm` does not use a recycle bin.

## Lab (3.5 h)

### 1. Install Ubuntu (instructor-supported, about 2 h)

Follow the installation guide your instructor shares on Monday. The decisions:

- **Native install** if the laptop is yours and you can wipe it.
- **Dual boot** alongside Windows if you need to keep Windows. Back up your files first.
- **WSL2** only if you cannot repartition a work or shared laptop. Tell your instructor.

Use the latest Ubuntu LTS release. On a machine with 4 GB of RAM, choose Xubuntu or Lubuntu. Your instructor must confirm your machine boots Linux before week 2.

After installing, update the system:

```bash
sudo apt update
sudo apt upgrade
```

`sudo` runs a single command as root. You will learn exactly what that means on day 3.

### 2. First commands

Open a terminal (Ctrl+Alt+T) and run each of these. Before pressing Enter, say out loud what you expect to happen.

```bash
whoami          # which user am I?
hostname        # which machine am I on?
pwd             # print working directory
ls              # list files here
ls -l           # long listing: permissions, owner, size, date
ls -la          # include hidden files (names starting with .)
cd /etc         # change directory to an absolute path
ls
cd ..           # go up one level
pwd
cd              # with no argument, go home
```

### 3. Make a practice area

```bash
mkdir -p ~/nalla/week-01/practice
cd ~/nalla/week-01/practice
touch notes.txt                # create an empty file
echo "hello linux" > hello.txt # write text into a file
cat hello.txt                  # print a file
cp hello.txt copy.txt
mv copy.txt renamed.txt
ls -l
rm renamed.txt
mkdir old && rmdir old         # && runs the second command only if the first succeeded
```

### 4. Find help without a search engine

```bash
man ls          # the manual page. Space to page, / to search, q to quit
ls --help       # short help built into most commands
type cd         # is this a program or built into the shell?
type ls
which ls        # where is the program file?
```

Use `man` to answer these, and write the answers in your journal:

1. Which `ls` option sorts by modification time?
2. Which `ls` option shows sizes like `4.0K` instead of `4096`?
3. What does `mkdir -p` do, and why did we need it above?

### Break it

Make each of these fail on purpose. Read the error message before fixing it.

```bash
cd /does/not/exist
cat missing.txt
rmdir ~/nalla          # why does this fail?
mkdir ~/nalla/week-01  # and this?
ls /root               # you are not allowed in here. Why?
```

For each one, write the exact error, what it means in plain words, and how you would fix it. By the end of the course you will read error messages before anything else. Start now.

## Security

- Your normal user cannot change system files. That limit protects you. Use `sudo` only when a task really needs it, and know which command you are running as root.
- Never paste a command from the internet into a terminal until you can explain every part of it. `sudo` plus a command you do not understand gives a stranger control of your machine.
- Set a strong login password and turn on disk encryption if the installer offered it. Laptops get stolen.

## Journal (30 min)

Create `~/nalla/journal/week-01.md` with a text editor (`nano ~/nalla/journal/week-01.md`, then Ctrl+O to save and Ctrl+X to exit). Write today's entry:

- What I did
- One thing that surprised me
- The errors I hit and how I fixed them
- One question for Wednesday's clinic

You will install Git on day 5 and commit this journal in week 2.

## Check yourself

1. You are in `/home/amina/nalla`. What is the absolute path of `../../amina/nalla/week-01`?
2. What is the difference between `$` and `#` at the end of the prompt?
3. `rm notes.txt` succeeded. How do you get the file back?
4. Where would you look for a program's system-wide configuration?

<details>
<summary>Answers</summary>

1. `/home/amina/nalla/week-01`
2. `$` means a normal user; `#` means root.
3. You cannot. `rm` has no recycle bin. This is why backups exist (week 7).
4. `/etc`

</details>
