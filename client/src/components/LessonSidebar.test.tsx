import React from "react";
import ReactDOMServer from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { courseParts, detailedMicroLessons } from "@shared/courseCatalog";

vi.mock("wouter", () => ({
  Link: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => <a href={href} {...props}>{children}</a>,
}));

import { LessonSidebar } from "./LessonSidebar";

describe("LessonSidebar micro-lesson library", () => {
  it("renders the 575-lesson entry point and direct study links", () => {
    const html = ReactDOMServer.renderToStaticMarkup(
      <LessonSidebar
        parts={courseParts}
        activeChapterId={1}
        completedIds={new Set<number>()}
        onSelect={() => undefined}
      />,
    );
    expect(html).toContain("Micro-Lesson Library");
    expect(html).toContain("575 ခု");
    expect(html).toContain('href="/lessons?lesson=1"');
    expect(html).toContain(`Lesson ${detailedMicroLessons[3]!.sequence}`);
    expect(html).toContain(`Lesson ${detailedMicroLessons[250]!.sequence}`);
    expect(html).toContain('href="/lessons?lesson=251"');
  });
});
