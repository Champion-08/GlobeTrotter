CREATE TABLE `activities` (
	`id` varchar(64) NOT NULL,
	`cityId` varchar(64) NOT NULL,
	`name` varchar(200) NOT NULL,
	`description` text,
	`category` varchar(80) NOT NULL,
	`estimatedCost` decimal(12,2) NOT NULL,
	`durationMinutes` int NOT NULL,
	`image` text,
	`popularity` decimal(4,1) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `activities_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `cities` (
	`id` varchar(64) NOT NULL,
	`name` varchar(160) NOT NULL,
	`country` varchar(160) NOT NULL,
	`region` varchar(120) NOT NULL,
	`latitude` decimal(10,7),
	`longitude` decimal(10,7),
	`costIndex` int NOT NULL,
	`popularity` decimal(4,1) NOT NULL,
	`description` text,
	`image` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `cities_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `expenses` (
	`id` varchar(64) NOT NULL,
	`tripId` varchar(64) NOT NULL,
	`category` enum('Transport','Stay','Food','Activities','Shopping','Other') NOT NULL,
	`description` varchar(280) NOT NULL,
	`amount` decimal(12,2) NOT NULL,
	`currency` varchar(8) NOT NULL DEFAULT 'INR',
	`expenseDate` date,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `expenses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `itinerary_activities` (
	`id` varchar(64) NOT NULL,
	`tripStopId` varchar(64) NOT NULL,
	`activityId` varchar(64) NOT NULL,
	`date` date NOT NULL,
	`startTime` varchar(8) NOT NULL,
	`endTime` varchar(8),
	`customCost` decimal(12,2),
	`notes` text,
	`activityOrder` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `itinerary_activities_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `saved_destinations` (
	`id` varchar(64) NOT NULL,
	`userId` int NOT NULL,
	`cityId` varchar(64) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `saved_destinations_id` PRIMARY KEY(`id`),
	CONSTRAINT `saved_destination_uq` UNIQUE(`userId`,`cityId`)
);
--> statement-breakpoint
CREATE TABLE `shared_trips` (
	`id` varchar(64) NOT NULL,
	`tripId` varchar(64) NOT NULL,
	`sharedByUserId` int NOT NULL,
	`accessType` enum('public','link') NOT NULL DEFAULT 'public',
	`shareToken` varchar(96) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `shared_trips_id` PRIMARY KEY(`id`),
	CONSTRAINT `shared_trips_shareToken_unique` UNIQUE(`shareToken`),
	CONSTRAINT `shared_trip_one_per_trip` UNIQUE(`tripId`)
);
--> statement-breakpoint
CREATE TABLE `trip_stops` (
	`id` varchar(64) NOT NULL,
	`tripId` varchar(64) NOT NULL,
	`cityId` varchar(64) NOT NULL,
	`arrivalDate` date NOT NULL,
	`departureDate` date NOT NULL,
	`stopOrder` int NOT NULL,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `trip_stops_id` PRIMARY KEY(`id`),
	CONSTRAINT `trip_stops_order_uq` UNIQUE(`tripId`,`stopOrder`)
);
--> statement-breakpoint
CREATE TABLE `trips` (
	`id` varchar(64) NOT NULL,
	`userId` int NOT NULL,
	`name` varchar(200) NOT NULL,
	`description` text,
	`startDate` date NOT NULL,
	`endDate` date NOT NULL,
	`budget` decimal(12,2) NOT NULL,
	`coverPhoto` text,
	`status` enum('planning','upcoming','completed','archived') NOT NULL DEFAULT 'planning',
	`travelStyle` varchar(64) DEFAULT 'Balanced',
	`interests` text,
	`transportCost` decimal(12,2) NOT NULL DEFAULT '0',
	`accommodationCost` decimal(12,2) NOT NULL DEFAULT '0',
	`foodCost` decimal(12,2) NOT NULL DEFAULT '0',
	`isPublic` boolean NOT NULL DEFAULT false,
	`publicSlug` varchar(96),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `trips_id` PRIMARY KEY(`id`),
	CONSTRAINT `trips_publicSlug_unique` UNIQUE(`publicSlug`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`profilePhoto` text,
	`language` varchar(24) DEFAULT 'en',
	`travelStyle` varchar(64) DEFAULT 'Balanced',
	`interests` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);
--> statement-breakpoint
ALTER TABLE `activities` ADD CONSTRAINT `activities_cityId_cities_id_fk` FOREIGN KEY (`cityId`) REFERENCES `cities`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `expenses` ADD CONSTRAINT `expenses_tripId_trips_id_fk` FOREIGN KEY (`tripId`) REFERENCES `trips`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `itinerary_activities` ADD CONSTRAINT `itinerary_activities_tripStopId_trip_stops_id_fk` FOREIGN KEY (`tripStopId`) REFERENCES `trip_stops`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `itinerary_activities` ADD CONSTRAINT `itinerary_activities_activityId_activities_id_fk` FOREIGN KEY (`activityId`) REFERENCES `activities`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `saved_destinations` ADD CONSTRAINT `saved_destinations_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `saved_destinations` ADD CONSTRAINT `saved_destinations_cityId_cities_id_fk` FOREIGN KEY (`cityId`) REFERENCES `cities`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `shared_trips` ADD CONSTRAINT `shared_trips_tripId_trips_id_fk` FOREIGN KEY (`tripId`) REFERENCES `trips`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `shared_trips` ADD CONSTRAINT `shared_trips_sharedByUserId_users_id_fk` FOREIGN KEY (`sharedByUserId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `trip_stops` ADD CONSTRAINT `trip_stops_tripId_trips_id_fk` FOREIGN KEY (`tripId`) REFERENCES `trips`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `trip_stops` ADD CONSTRAINT `trip_stops_cityId_cities_id_fk` FOREIGN KEY (`cityId`) REFERENCES `cities`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `trips` ADD CONSTRAINT `trips_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `activities_city_idx` ON `activities` (`cityId`);--> statement-breakpoint
CREATE INDEX `activities_category_idx` ON `activities` (`category`);--> statement-breakpoint
CREATE INDEX `cities_country_idx` ON `cities` (`country`);--> statement-breakpoint
CREATE INDEX `cities_region_idx` ON `cities` (`region`);--> statement-breakpoint
CREATE INDEX `cities_popularity_idx` ON `cities` (`popularity`);--> statement-breakpoint
CREATE INDEX `expenses_trip_idx` ON `expenses` (`tripId`);--> statement-breakpoint
CREATE INDEX `itinerary_stop_idx` ON `itinerary_activities` (`tripStopId`);--> statement-breakpoint
CREATE INDEX `itinerary_date_idx` ON `itinerary_activities` (`date`);--> statement-breakpoint
CREATE INDEX `trip_stops_trip_idx` ON `trip_stops` (`tripId`);--> statement-breakpoint
CREATE INDEX `trips_owner_idx` ON `trips` (`userId`);--> statement-breakpoint
CREATE INDEX `trips_public_idx` ON `trips` (`isPublic`);