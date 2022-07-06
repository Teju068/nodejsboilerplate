DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `createUser`(
IN user_Id varchar(64),
IN userName varchar(64),
IN emailId varchar(64),
IN password varchar(100),
IN phoneNumber varchar(100),
IN createdAt varchar(25),
IN updatedAt varchar(25),
IN confirmPassword varchar(100),
IN age int
)
BEGIN
insert into user 
(user_Id,userName,emailId,password,phoneNumber,createdAt,updatedAt,confirmPassword,age)
 values
 (user_Id,userName,emailId,password,phoneNumber,createdAt,updatedAt,confirmPassword,age);
END$$
DELIMITER ;
