**Time:** about 6 hours · 1 h reading · 4 h lab and deliverable · 30 min check · 30 min journal
**No AI this week.**
**Deliverable due at Friday's class:** the folder clean-up script.

## By the end of today you can

- Write a Bash script with variables, arguments, conditions, loops and a meaningful exit code
- Schedule a script with `cron` and read its output in the system log
- Install your development tools: VS Code, Git and Go

## Why this exists

Anything you type twice, you should be able to save and run again. A script turns a sequence of commands into a tool that runs the same way every time, on your laptop, on a server or in CI. Scheduling runs it without you. Cron has done this on Unix machines since the 1970s. Today's deliverable is your first automation.

## How it works

### A script is a file of commands

```bash
#!/usr/bin/env bash
set -euo pipefail

name="${1:-world}"
echo "Hello, $name"
```

- `#!/usr/bin/env bash` (the **shebang**) tells the kernel which interpreter runs this file.
- `set -e` stops the script at the first failing command. `set -u` treats an unset variable as an error. `set -o pipefail` makes a pipeline fail when any part of it fails.
- `$1`, `$2` … are the arguments, `$#` is how many there are and `"$@"` is all of them, safely quoted.
- `${1:-world}` means "the first argument, or `world` if it is missing".

### Conditions and loops

```bash
if [[ ! -d "$dir" ]]; then
  echo "not a directory: $dir" >&2    # errors to stderr
  exit 2
fi

for file in "$dir"/*; do
  [[ -f "$file" ]] || continue         # skip anything that is not a regular file
  echo "found $file"
done
```

Useful tests: `-d` directory, `-f` regular file, `-e` exists, `-z "$s"` empty string, `"$a" == "$b"`, and `$n -gt 5` for numbers.

### Exit codes are your script's contract

Choose them on purpose and document them: `0` success, `1` something went wrong while running, `2` the script was called incorrectly. The scripts and programs that call yours, including cron and CI, only see this number.

### cron

The cron daemon reads each user's **crontab** and runs commands on a schedule:

```text
┌ minute (0–59)
│ ┌ hour (0–23)
│ │ ┌ day of month (1–31)
│ │ │ ┌ month (1–12)
│ │ │ │ ┌ day of week (0–6, Sunday = 0)
│ │ │ │ │
0 18 * * 1-5  /home/amina/bin/cleanup.sh /home/amina/Downloads
```

Cron runs with a minimal environment: a short `PATH`, no aliases, and your home directory as the working directory. Use absolute paths in cron jobs.

## When to use it, and what it costs

Bash is right for gluing commands together in a few dozen lines. It becomes hard to read and to test past a page or two, and it has no data structures worth the name. That is where Go takes over next week. Cron is right for simple schedules on one machine. In week 12 you will use systemd for long-running services.

## Lab: install your tools (1 h)

```bash
sudo apt install git curl build-essential
git --version

# Go: install the current stable release from go.dev/dl, as your instructor shows on Monday.
# The official tarball keeps Go up to date; Ubuntu's apt package is often several versions behind.
go version

# VS Code: install from code.visualstudio.com (the .deb package), then add the Go extension.
code --version
```

Configure Git with your name and email. You will use it from Monday:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --global init.defaultBranch main
```

## Deliverable: folder clean-up script (3 h)

Your Downloads folder is a mess. Write `cleanup.sh`, which sorts the files in a folder into sub-folders by type.

### Requirements

1. Usage: `cleanup.sh <directory> [--dry-run]`
2. Moves files into sub-folders by extension:
   - `images/`: jpg, jpeg, png, gif, webp
   - `documents/`: pdf, doc, docx, txt, md, xlsx, csv
   - `archives/`: zip, tar, gz
   - `other/`: everything else
3. Matches extensions case-insensitively (`PHOTO.JPG` is an image).
4. Leaves directories untouched, and never moves the script itself.
5. Handles file names with spaces.
6. Never overwrites a file. If `images/photo.jpg` already exists, rename the new one, for example `photo-1.jpg`.
7. `--dry-run` prints what it would do without moving anything.
8. Prints a summary at the end: how many files went to each folder.
9. Exit codes: `0` success, `1` a move failed, `2` bad usage (missing argument, or the path is not a directory). Usage errors go to stderr.
10. Starts with `set -euo pipefail`.

### Test it

Make a test folder you are happy to destroy:

```bash
mkdir -p /tmp/messy && cd /tmp/messy
touch a.jpg "holiday photo.PNG" report.pdf notes.txt data.csv backup.tar.gz setup.exe README
mkdir keepme
~/nalla/week-01/cleanup.sh /tmp/messy --dry-run
~/nalla/week-01/cleanup.sh /tmp/messy
find /tmp/messy
~/nalla/week-01/cleanup.sh /nope; echo "exit: $?"     # expect 2
~/nalla/week-01/cleanup.sh; echo "exit: $?"           # expect 2
```

Then run it a second time on a folder that already has an `images/photo.jpg` to prove requirement 6.

### Schedule it

```bash
crontab -e
```

Add a line that runs your script against a test folder every 5 minutes and appends the output to a log:

```text
*/5 * * * * /home/<you>/nalla/week-01/cleanup.sh /home/<you>/messy >> /home/<you>/nalla/week-01/cleanup.log 2>&1
```

Wait for it to run, then check `cleanup.log` and `journalctl -u cron --since "10 min ago"`. Remove the line when you are done: a script that moves files every 5 minutes is not something to forget about.

### Break it

Before Friday, try to break your own script: a file called `-rf`, a file with no extension, a folder containing nothing, a read-only file (`chmod 444`) in a read-only folder (`chmod 555`). Does your script do something sensible and exit with the right code each time? On Friday your instructor will run it against a folder they have prepared.

## Security

- The script must never run as root. Nothing about sorting your own files needs it.
- Quote every variable. A file named `*` or `-rf` must be treated as a name, not as a pattern or an option. Use `mv -- "$src" "$dest"`.
- A cron job runs with your full permissions while you are not watching. Test with `--dry-run` first, point it at a test folder and log its output.

## Journal and commit (30 min)

Finish this week's journal with a Friday entry: what the script does, the edge cases you found and how you handled them.

Git is now installed. Next week starts with it: on Monday you will turn `~/nalla` into a repository and make this week's journal and script your first commits.

## Check yourself

1. Why is `set -u` useful in a script that runs `rm -rf "$dir/"*`?
2. What does `0 */2 * * 0` mean in a crontab?
3. Your script works in the terminal but not from cron. Name two likely causes.
4. Why should usage errors go to stderr and not stdout?

<details>
<summary>Answers</summary>

1. If `$dir` is unset, the command would become `rm -rf /*`. With `set -u` the script stops with an error instead.
2. At minute 0 of every second hour, on Sundays only.
3. A relative path, since cron's working directory is your home directory; or a command missing from cron's short `PATH`.
4. Anyone piping or saving the script's output gets only real results, and still sees the error.

</details>
