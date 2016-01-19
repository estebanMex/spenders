DROP TABLE  IF EXISTS `datalines`;
CREATE TABLE `datalines` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `title` VARCHAR(50) NOT NULL,
  `tag` VARCHAR(50) NULL,
  `type_line` VARCHAR(20) NOT NULL,
  `amount` FLOAT NOT NULL,
  `date_created` datetime NOT NULL,
  `date_updated` datetime NULL,
  PRIMARY KEY (`id`)
);


--budget
-- id	title	amount	percentage_max	status	date_start	date_end	date_created	date_updated
DROP TABLE  IF EXISTS `budgets`;
CREATE TABLE `budgets` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `title` VARCHAR(50) NOT NULL,
  `amount` FLOAT NULL,
  `status` VARCHAR(2) NOT NULL DEFAULT 'OK',
  `date_start` datetime NULL,
  `date_end` datetime NULL,
  `date_created` datetime NULL,
  `date_updated` datetime NULL,
  PRIMARY KEY (`id`)
);

SELECT id, date_created, title, amount FROM datalines WHERE MONTH(NOW()) = MONTH(NOW()) AND YEAR(NOW()) = YEAR(NOW());

--lines
id	title	tag	amount	type date_created	date_updated

--lines
id 		=	1 	
title	=	titre
tag 	=	un mot
amount	=	100
type		=	[positive, negative]
date_created = datetime
date_updated = datetime

--alert_budget
id	title	amount	percentage_max	status	budget_id	date_created	date_updated