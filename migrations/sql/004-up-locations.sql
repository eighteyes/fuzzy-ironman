CREATE TABLE IF NOT EXISTS `locations` (

    `id`              VARCHAR(16)      NOT NULL
  , `ownerId`         VARCHAR(16)      NOT NULL
  , `menuId`          VARCHAR(16)      NOT NULL
  , `hours`           TEXT             NOT NULL
  , `address`         VARCHAR(255)     NOT NULL
  , `phone`           VARCHAR(255)     NOT NULL

)