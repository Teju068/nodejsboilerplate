DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `getUser`(IN user_id varchar(64))
BEGIN
SELECT * FROM user WHERE user_Id = user_id;
END//
DELIMITER ;