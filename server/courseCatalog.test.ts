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

  it("exposes topic-level explanations for Dart declarations and Flutter widgets", () => {
    const variables = allChapters.find((chapter) => chapter.id === 2);
    const layout = allChapters.find((chapter) => chapter.id === 7);
    const navigation = allChapters.find((chapter) => chapter.id === 11);

    expect(variables?.topicExplanations.map((topic) => topic.name)).toEqual(expect.arrayContaining(["var — တန်ဖိုးသတ်မှတ်ပြီး type ကို compiler ထံအပ်ခြင်း", "final — တစ်ကြိမ်သတ်မှတ်ပြီး ပြန်မပြောင်းနိုင်သော reference", "const — compile-time constant", "late — နောက်မှ initialize လုပ်မည့် non-nullable variable"]));
    expect(layout?.topicExplanations.map((topic) => topic.name)).toEqual(expect.arrayContaining(["Text() — စာသားကို screen ပေါ်ပြသခြင်း", "Column() — children များကို အပေါ်မှအောက် စီပေးခြင်း", "Row() — children များကို ဘယ်မှညာ စီပေးခြင်း", "Container() — padding, margin, color နှင့် decoration စုပေါင်းပေးခြင်း"]));
    expect(navigation?.topicExplanations[0]).toMatchObject({ category: "Flutter", output: expect.stringContaining("panel") });
    expect(variables?.topicExplanations[0].lineByLine.length).toBeGreaterThanOrEqual(3);
    expect(layout?.topicExplanations[0].mistakes.length).toBeGreaterThanOrEqual(1);

    for (const chapter of allChapters) {
      expect(chapter.topicExplanations.every((topic) => Boolean(topic) && typeof topic.name === "string")).toBe(true);
    }
  });

  it("returns no lessons for an empty search", () => {
    expect(searchCourse("   ")).toEqual([]);
  });
});
