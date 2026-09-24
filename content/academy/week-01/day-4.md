**Time:** about 6 hours · 1.5 h reading · 3.5 h lab · 30 min check · 30 min journal
**No AI this week.**

## By the end of today you can

- Connect programs with pipes and redirect their input, output and errors
- Use exit codes to tell success from failure, and chain commands on them
- Read and set environment variables, and explain `PATH`
- Search files by name with `find` and by content with `grep`

## Why this exists

Unix tools each do one small job well: `grep` filters lines, `sort` sorts them, `wc` counts them. Pipes let you combine them into something new without writing a program. Engineers still answer questions like "which IP addresses hit our server most today?" with a one-line pipeline. The same ideas (standard input and output, exit codes, environment variables) are how your Go programs will talk to the world from next week.

## How it works

### Three standard streams

Every process starts with three open file descriptors:

| FD | Name | Default |
| --- | --- | --- |
| 0 | stdin | keyboard |
| 1 | stdout | terminal |
| 2 | stderr | terminal |

Errors go to stderr so that they do not mix with real output when you redirect it.

| Syntax | Effect |
| --- | --- |
| `cmd > file` | stdout to a file, replacing it |
| `cmd >> file` | stdout to a file, appending |
| `cmd 2> file` | stderr to a file |
| `cmd > file 2>&1` | both to the same file |
| `cmd < file` | stdin from a file |
| `cmd1 \| cmd2` | cmd1's stdout becomes cmd2's stdin |

In a pipe the shell starts both processes at the same time and connects them through a buffer in the kernel. Data flows as it is produced, so `cat huge.log | grep error` never holds the whole file in memory.

### Exit codes

Every process ends with a number. `0` means success. `1`–`255` means failure, and the meaning is chosen by the program. `$?` holds the last command's exit code.

| Syntax | Runs the second command when |
| --- | --- |
| `a && b` | `a` succeeded |
| `a \|\| b` | `a` failed |
| `a ; b` | always |

### Environment variables

Every process has a set of `NAME=value` strings that it inherits from its parent. `PATH` is the most important: a colon-separated list of directories where the shell looks for programs when you type a name without a `/`.

```bash
NAME=value          # a shell variable, visible only to this shell
export NAME=value   # an environment variable, passed to child processes
```

A child process gets a copy, so it cannot change its parent's environment.

### Quoting

The shell splits your line into words on spaces and expands `$VAR`, `*` and `~` before running anything.

- `"double quotes"` keep spaces together but still expand `$VAR`.
- `'single quotes'` keep everything literally.
- An unquoted `$FILE` containing a space turns into two arguments. That is a classic bug.

## When to use it, and what it costs

Pipelines are right for one-off questions and small automation. When logic grows (many conditions, data structures, error handling), a real program is clearer and safer, which is why you switch to Go next week.

## Lab (3.5 h)

### 1. Redirection

```bash
cd ~/nalla/week-01/practice
ls /etc > etc.txt
wc -l etc.txt
ls /etc /nope > out.txt 2> err.txt
cat out.txt | head -3; cat err.txt
ls /etc /nope > all.txt 2>&1
ls /nope 2> /dev/null        # /dev/null throws output away
```

### 2. Pipes

Download a sample web server log your instructor provides, or make one:

```bash
for i in $(seq 1 500); do
  echo "10.0.0.$((RANDOM % 20)) - - [25/Sep/2026] \"GET /api/members HTTP/1.1\" $((RANDOM % 5 == 0 ? 500 : 200))"
done > access.log
head -3 access.log
```

Answer each question with one pipeline, and record the pipeline in your journal:

1. How many requests are there? (`wc -l`)
2. How many requests failed with status 500? (`grep`, `wc -l`)
3. Which five IP addresses made the most requests? (`cut -d' ' -f1 | sort | uniq -c | sort -rn | head -5`)
4. Which IP addresses had at least one 500 error, listed once each?

### 3. Exit codes

```bash
grep -q "500" access.log; echo $?     # 0 = found
grep -q "404" access.log; echo $?     # 1 = not found
grep -q "x" /nope; echo $?            # 2 = error
mkdir -p backup && cp access.log backup/ && echo "backed up"
cd /nope || echo "could not enter directory"
```

### 4. Environment and PATH

```bash
echo $HOME $USER $SHELL
echo $PATH | tr ':' '\n'
env | sort | head
GREETING="habari"
bash -c 'echo "child sees: $GREETING"'   # empty. Why?
export GREETING
bash -c 'echo "child sees: $GREETING"'
mkdir -p ~/bin
printf '#!/bin/bash\necho "my first command"\n' > ~/bin/hello
chmod +x ~/bin/hello
hello                                      # command not found?
export PATH="$HOME/bin:$PATH"
hello
```

To make the `PATH` change permanent, add the `export` line to `~/.bashrc` and open a new terminal.

### 5. find and grep

```bash
find ~/nalla -name "*.txt"
find ~/nalla -type f -size +1k
find /etc -name "*.conf" 2>/dev/null | head
grep -r "PATH" ~/.bashrc
grep -n "500" access.log | head -3        # -n shows line numbers
grep -c "10.0.0.7 " access.log            # -c counts matching lines
grep -v " 200$" access.log | head -3      # -v inverts the match
```

### Break it

```bash
touch "my notes.txt"
FILE=my notes.txt          # what happens?
FILE="my notes.txt"
cat $FILE                  # two errors. Why?
cat "$FILE"                # works
ls -l $FILE                # lists notes.txt from day 1: the one file became two names
                           # with rm instead of ls, you would have deleted the wrong file
```

Explain what the shell turned each command into before running it. Then find a way to make `grep` read a file whose name starts with `-` (hint: `--` or `./`).

## Security

- Always quote variables: `"$FILE"`. Unquoted variables are how a file name containing spaces or `*` makes a script delete the wrong files.
- A directory in `PATH` that other users can write to lets them plant a fake `ls`. Never put `.` or a shared directory early in `PATH`.
- Environment variables are how you pass secrets to programs later in the course, so that secrets never sit in code. They are visible to the process and its children, and root can read them in `/proc`.

## Journal (30 min)

Add today's entry: your four log pipelines, the quoting break explained and one question for the clinic.

## Check yourself

1. What does `cmd 2>&1 > file` do, and how is it different from `cmd > file 2>&1`?
2. A script runs `cd build && rm -rf *`. Why is `&&` important here?
3. Why can a child process not change its parent's environment variables?
4. What does `uniq` need from its input to work correctly?

<details>
<summary>Answers</summary>

1. Redirections are applied left to right. The first form points stderr at the terminal (where stdout was at that moment), then sends stdout to the file. Only the second form sends both to the file.
2. If `cd build` fails, `;` would run `rm -rf *` in the current directory. `&&` stops it.
3. The child receives a copy of the environment when it starts. Changes to the copy stay in the child.
4. Sorted input: it only removes duplicates that are next to each other.

</details>
