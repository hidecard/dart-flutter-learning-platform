import { describe, expect, it } from "vitest";
import { allChapters, courseParts, searchCourse } from "../shared/courseCatalog";

describe("course catalog", () => {
  it("contains the original curriculum plus the guided step-by-step foundation chapters", () => {
    expect(courseParts).toHaveLength(8);
    expect(allChapters).toHaveLength(46);
    expect(allChapters.find((chapter) => chapter.id === 21)?.guidedSteps).toHaveLength(5);
    expect(allChapters.find((chapter) => chapter.id === 31)?.guidedSteps).toHaveLength(5);
    expect(allChapters.find((chapter) => chapter.id === 46)?.title).toContain("Capstone");
  });

  it("finds relevant lessons by Burmese topic and code keyword", () => {
    expect(searchCourse("Null Safety").map((chapter) => chapter.id)).toContain(2);
    expect(searchCourse("Future").map((chapter) => chapter.id)).toContain(5);
    expect(searchCourse("internationalization").map((chapter) => chapter.id)).toContain(44);
    expect(searchCourse("MethodChannel").map((chapter) => chapter.id)).toContain(39);
  });

  it("returns no lessons for an empty search", () => {
    expect(searchCourse("   ")).toEqual([]);
  });
});
