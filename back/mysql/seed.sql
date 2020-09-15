-- user, tast, column, active, 설정하자.

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

CREATE TABLE `card` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    PRIMARY KEY(`id`)
);


INSERT INTO `user` (email, password, nick) VALUE('yhy7142@naver.com', '123456', 'test');
INSERT INTO `user` (email, password, nick) VALUE('yhy7143@naver.com', '123456', 'test');

