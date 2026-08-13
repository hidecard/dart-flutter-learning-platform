CREATE TABLE `chapterProgress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`chapterId` int NOT NULL,
	`completed` boolean NOT NULL DEFAULT false,
	`completedAt` timestamp,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `chapterProgress_id` PRIMARY KEY(`id`),
	CONSTRAINT `chapter_progress_user_chapter_unique` UNIQUE(`userId`,`chapterId`)
);
--> statement-breakpoint
ALTER TABLE `chapterProgress` ADD CONSTRAINT `chapterProgress_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;