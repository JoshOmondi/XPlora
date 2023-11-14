-- use projectManagementSystem
-- select * from Projects
CREATE PROCEDURE UpdateProjectStatus
   @AssignedUserEmail NVARCHAR(255),
   @NewStatus NVARCHAR(255)
AS
BEGIN
    
    UPDATE Projects
SET projectStatus = @NewStatus,
    isCompleted = CASE WHEN @NewStatus = 'completed' THEN 1 ELSE 0 END
WHERE AssignedUserEmail = @AssignedUserEmail;

END;
DROP PROCEDURE  UpdateProjectStatus
-- UPDATE Projects
    -- SET projectStatus = @NewStatus
    -- WHERE AssignedUserEmail = @AssignedUserEmail;

