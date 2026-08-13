import { describe, expect, it } from "vitest";
import { allChapters, courseParts, searchCourse } from "../shared/courseCatalog";

describe("course catalog", () => {
  it("contains the original curriculum plus the guided step-by-step foundation chapters", () => {
    expect(courseParts).toHaveLength(7);
    expect(allChapters).toHaveLength(30);
    expect(allChapters.find((chapter) => chapter.id === 21)?.guidedSteps).toHaveLength(5);
    expect(allChapters.find((chapter) => chapter.id === 30)?.title).toContain("Mini Project");
  });

  it("finds relevant lessons by Burmese topic and code keyword", () => {
    expect(searchCourse("Null Safety").map((chapter) => chapter.id)).toContain(2);
    expect(searchCourse("Future").map((chapter) => chapter.id)).toContain(5);
  });

  it("returns no lessons for an empty search", () => {
    expect(searchCourse("   ")).toEqual([]);
  });
});
