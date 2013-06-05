CREATE TABLE IF NOT EXISTS `customers` (

    `id`        INT              NOT NULL
  , `name`      VARCHAR(255)     NOT NULL
  , `contact`   VARCHAR(255)     NOT NULL
  , `address`   VARCHAR(255)     NOT NULL
  , `info`      TEXT             NOT NULL


  , PRIMARY KEY (`id`)
)