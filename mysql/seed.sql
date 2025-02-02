-- TODO: user, tast, column, active, 설정하자.

DROP database if exists todolist;
CREATE database todolist;
USE todolist;

CREATE TABLE `user` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `email` varchar(255)  NOT NULL,
    `password` varchar(255) NOT NULL,
    `nick` varchar(255) NOT NULL,
     PRIMARY KEY(`id`)
);

CREATE TABLE `board` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `user_id` int(11) NULL,
    `count` int(11) NOT NULL default 0, 
    `title` text NOT NULL,
    PRIMARY KEY(`id`)
);

CREATE TABLE `card` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `user_id` int(11) NOT NULL,
    `column_id` int(11) NOT NULL, 
    `content` text NOT NULL,
    `position` FLOAT,
    -- `head` boolean default true,
    -- `next` int(11) default 0,
    PRIMARY KEY(`id`)
);


CREATE TABLE `logs` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `user_id` int(11) NOT NULL,
    `action` varchar(255) NOT NULL,
    `content` varchar(255) NOT NULL,
    `pre` varchar(255),
    `next` varchar(255),
    `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(`id`)
);

-- 외래키 추가 
ALTER TABLE `card` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) on delete cascade;
ALTER TABLE `card` ADD FOREIGN KEY (`column_id`) REFERENCES `board` (`id`) on delete cascade;
ALTER TABLE `board` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
ALTER TABLE `logs` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) 
-- 기본: default 값 컬럼 설정.
-- fix : utf8 설정필요.

