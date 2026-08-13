import { describe, expect, it } from "vitest";
import { allChapters, courseParts, searchCourse } from "../shared/courseCatalog";

describe("course catalog", () => {
  it("contains exactly twenty chapters grouped into the required six parts", () => {
    expect(courseParts).toHaveLength(6);
    expect(allChapters).toHaveLength(20);
  });

  it("finds relevant lessons by Burmese topic and code keyword", () => {
    expect(searchCourse("Null Safety").map((chapter) => chapter.id)).toContain(2);
    expect(searchCourse("Future").map((chapter) => chapter.id)).toContain(5);
  });

  it("returns no lessons for an empty search", () => {
    expect(searchCourse("   ")).toEqual([]);
  });
});

