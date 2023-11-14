--use TOUR
-- CREATE DATABASE TOUR
CREATE OR ALTER PROCEDURE 
registerUsers(
    @userID VARCHAR(100),
    @userName VARCHAR(200),
    @email VARCHAR(300),
    @password VARCHAR(200),
    @phone_no VARCHAR(200)
)
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Users WHERE email = @email)
    BEGIN
        -- DECLARE @userID UNIQUEIDENTIFIER = NEWID();
        
        INSERT INTO Users (userID, userName, email, password, phone_no)
        VALUES (@userID, @userName, @email, @password, @phone_no)
    END
    ELSE
    BEGIN
        PRINT 'Email already exists. User not registered.'
    END
END

INSERT INTO Users(userID, userName, email, password, phone_no)VALUES ('fhfhh333', 'Mike', 'joshomosh@gmail.com', 'joshuah', '0708656364')

SELECT * FROM Users
-- DROP PROCEDURE registerUser