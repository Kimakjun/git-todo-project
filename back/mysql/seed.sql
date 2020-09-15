-- user, tast, column, active, 설정하자.

DROP database todolist;
CREATE database todolist;
USE todolist;

CREATE TABLE `user` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `email` varchar(255)  NOT NULL,
    `password` varchar(255) NOT NULL,
    `nick` varchar(255) NOT NULL,
    PRIMARY KEY(`id`)
) CHARSET=utf8;

