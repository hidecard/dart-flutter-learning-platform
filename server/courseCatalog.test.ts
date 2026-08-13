import { describe, expect, it } from "vitest";
import { allChapters, courseParts, searchCourse } from "../shared/courseCatalog";

describe("course catalog", () => {
  it("contains the detailed curriculum and the advanced Flutter platform coverage", () => {
    expect(courseParts).toHaveLength(9);
    expect(allChapters).toHaveLength(56);
    expect(allChapters.find((chapter) => chapter.id === 31)?.title).toContain("Hot Reload");
    expect(allChapters.find((chapter) => chapter.id === 56)?.title).toContain("Monitoring");
  });

  it("finds relevant lessons by Burmese topic and code keyword", () => {
    expect(searchCourse("Null Safety").map((chapter) => chapter.id)).toContain(2);
    expect(searchCourse("Future").map((chapter) => chapter.id)).toContain(5);
    expect(searchCourse("internationalization").map((chapter) => chapter.id)).toContain(44);
    expect(searchCourse("MethodChannel").map((chapter) => chapter.id)).toContain(39);
    expect(searchCourse("Deep Link").map((chapter) => chapter.id)).toContain(47);
    expect(searchCourse("FFI").map((chapter) => chapter.id)).toContain(53);
  });

  it("returns no lessons for an empty search", () => {
    expect(searchCourse("   ")).toEqual([]);
  });
});
