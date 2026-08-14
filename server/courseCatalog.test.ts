import { describe, expect, it } from "vitest";
import { allChapters, courseParts, searchAllLearningContent, searchCourse, totalCurriculumLessonCount } from "../shared/courseCatalog";
import { detailedMicroLessons, microLessonCount } from "../shared/courseCatalog";
import { flutterPdfCoverage, flutterPdfTopicCount } from "../shared/flutterPdfCoverage";
import { flutterPdfGapAnalysis, pdfMissingOrShallowTopicCount } from "../shared/flutterPdfGapAnalysis";
import { topicExplanationsForChapter } from "../shared/topicExplanations";

describe("course catalog", () => {
  it("contains the detailed curriculum and the advanced Flutter platform coverage", () => {
    expect(courseParts).toHaveLength(9);
    expect(allChapters).toHaveLength(56);
    expect(allChapters.find((chapter) => chapter.id === 31)?.title).toContain("Hot Reload");
    expect(allChapters.find((chapter) => chapter.id === 56)?.title).toContain("Monitoring");
  });

  it("contains the approximately 500-lesson sequential beginner-to-production inventory", () => {
    expect(microLessonCount).toBeGreaterThanOrEqual(500);
    expect(totalCurriculumLessonCount).toBe(56 + microLessonCount);
    expect(detailedMicroLessons[0]).toMatchObject({ id: 1, moduleId: "dart-orientation", level: "အစပြုသူ" });
    expect(detailedMicroLessons.at(-1)?.level).toBe("Production");
    expect(detailedMicroLessons.map((lesson) => lesson.id)).toEqual(Array.from({ length: microLessonCount }, (_, index) => index + 1));
    expect(detailedMicroLessons.every((lesson) => lesson.objective.length > 40 && lesson.concept.length > 40 && lesson.example.length > 0 && lesson.lineByLine.length >= 3 && lesson.exercise.length > 30)).toBe(true);
    expect(detailedMicroLessons.every((lesson) => courseParts.some((part) => part.id === lesson.partId && part.chapters.some((chapter) => chapter.id === lesson.chapterId)))).toBe(true);
    expect(searchAllLearningContent("Dart language ဆိုတာဘာလဲ").microLessons.length).toBeGreaterThan(0);
    expect(searchAllLearningContent("Flutter Doctor").microLessons.length).toBeGreaterThan(0);
  });

  it("finds relevant lessons by Burmese topic and code keyword", () => {
    expect(searchCourse("Null Safety").map((chapter) => chapter.id)).toContain(2);
    expect(searchCourse("Future").map((chapter) => chapter.id)).toContain(5);
    expect(searchCourse("internationalization").map((chapter) => chapter.id)).toContain(44);
    expect(searchCourse("MethodChannel").map((chapter) => chapter.id)).toContain(39);
    expect(searchCourse("Deep Link").map((chapter) => chapter.id)).toContain(47);
    expect(searchCourse("FFI").map((chapter) => chapter.id)).toContain(53);
    expect(searchCourse("Song Player").map((chapter) => chapter.id)).toContain(15);
    expect(searchCourse("Flutter Development Environment").map((chapter) => chapter.id)).toContain(21);
    expect(searchCourse("Query parameters").map((chapter) => chapter.id)).toContain(13);
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

  it("covers the provided PDF in order without undefined mappings", () => {
    expect(flutterPdfCoverage).toHaveLength(16);
    expect(flutterPdfCoverage.map((entry) => entry.order)).toEqual(Array.from({ length: 16 }, (_, index) => index + 1));
    expect(flutterPdfTopicCount).toBeGreaterThanOrEqual(50);
    for (const entry of flutterPdfCoverage) {
      expect(entry.sourceTopics.length).toBeGreaterThan(0);
      expect(entry.originalCoverage.length).toBeGreaterThan(40);
      expect(entry.mappedChapterIds.every((id) => allChapters.some((chapter) => chapter.id === id))).toBe(true);
    }
  });

  it("documents explicit missing or shallow PDF topics for follow-up expansion", () => {
    expect(flutterPdfGapAnalysis.length).toBeGreaterThanOrEqual(10);
    expect(pdfMissingOrShallowTopicCount).toBe(0);
    expect(flutterPdfGapAnalysis.every((gap) => gap.gapLevel === "covered")).toBe(true);
    expect(flutterPdfGapAnalysis.every((gap) => {
      const topics = topicExplanationsForChapter(gap.explanationChapterId);
      return topics.length > 0 && topics.every((topic) =>
        topic.name.length > 0 && topic.example.length > 0 && topic.howItWorks.length > 0 && topic.lineByLine.length > 0,
      );
    })).toBe(true);
    expect(flutterPdfGapAnalysis.every((gap) => gap.plannedChapterIds.length > 0 && gap.BurmesePlan.length > 30)).toBe(true);
  });

  it("returns no lessons for an empty search", () => {
    expect(searchCourse("   ")).toEqual([]);
  });
});
