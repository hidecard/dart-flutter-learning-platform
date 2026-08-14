import ReactDOMServer from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { detailedMicroLessons } from "@shared/courseCatalog";

vi.mock("wouter", () => ({
  Link: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => <a href={href} {...props}>{children}</a>,
}));

import { MicroLessonSearchResults } from "./MicroLessonSearchResults";

describe("MicroLessonSearchResults", () => {
  it("renders a learner-visible micro-lesson result with the correct library link", () => {
    const html = ReactDOMServer.renderToStaticMarkup(<MicroLessonSearchResults microLessons={[detailedMicroLessons[250]!]} />);
    expect(html).toContain("Lesson 251");
    expect(html).toContain("href=\"/lessons?lesson=251\"");
    expect(html).toContain("Flutter Core Widgets");
  });
});
