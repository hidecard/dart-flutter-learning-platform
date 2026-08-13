CREATE TABLE `lessonContent` (
	`id` int AUTO_INCREMENT NOT NULL,
	`chapterId` int NOT NULL,
	`contentJson` text NOT NULL,
	`updatedByUserId` int NOT NULL,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `lessonContent_id` PRIMARY KEY(`id`),
	CONSTRAINT `lesson_content_chapter_unique` UNIQUE(`chapterId`)
);
--> statement-breakpoint
ALTER TABLE `lessonContent` ADD CONSTRAINT `lessonContent_updatedByUserId_users_id_fk` FOREIGN KEY (`updatedByUserId`) REFERENCES `users`(`id`) ON DELETE restrict ON UPDATE no action;