CREATE TABLE IF NOT EXISTS `menus` (

    `id`              VARCHAR(16)      NOT NULL
  , `ownerId`         VARCHAR(16)      NOT NULL
  , `locationId`      VARCHAR(16)      NOT NULL
  , `json`            TEXT             NOT NULL
  , `url`             VARCHAR(255)     NOT NULL

  , PRIMARY KEY (`id`)
)