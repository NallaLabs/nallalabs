import { readFile } from "node:fs/promises";
import path from "node:path";

const CONTENT_DIR = path.join(process.cwd(), "content", "academy");

export function lessonPath(week: number, day: number) {
  return path.join(CONTENT_DIR, `week-${String(week).padStart(2, "0")}`, `day-${day}.md`);
}

// Returns null when the lesson has not been written yet; the page then shows the plan outline.
export async function getLesson(week: number, day: number): Promise<string | null> {
  try {
    return await readFile(lessonPath(week, day), "utf8");
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw err;
  }
}
