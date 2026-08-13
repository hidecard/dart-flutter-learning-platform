import { describe, expect, it } from "vitest";
import { dartPadWorkspaceUrl, lessonPlaygroundHref } from "../shared/playground";

describe("Dart playground links", () => {
  it("opens the official browser Dart workspace without routing learner code through the application server", () => {
    expect(dartPadWorkspaceUrl).toBe("https://dartpad.dev/dart");
  });

  it("keeps the selected lesson identifier in the in-app playground route", () => {
    expect(lessonPlaygroundHref(21)).toBe("/playground?chapter=21");
  });
});
