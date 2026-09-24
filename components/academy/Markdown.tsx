import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

// Lessons are trusted, in-repo content, so raw HTML (e.g. <details> for hidden answers) is allowed.
export function Markdown({ source }: { source: string }) {
  return (
    <div className="prose prose-zinc max-w-none prose-headings:tracking-tight prose-headings:font-semibold prose-a:text-[#1D4ED8] prose-code:before:content-none prose-code:after:content-none prose-code:bg-[#F4F4F5] prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:font-normal prose-pre:bg-[#0A0A0A] prose-pre:text-[#FAFAFA] prose-pre:overflow-x-auto [&_pre_code]:bg-transparent [&_pre_code]:p-0 prose-table:text-sm prose-table:block prose-table:overflow-x-auto [&_details]:border [&_details]:border-[#E4E4E7] [&_details]:p-4 [&_summary]:cursor-pointer [&_summary]:font-medium">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {source}
      </ReactMarkdown>
    </div>
  );
}
