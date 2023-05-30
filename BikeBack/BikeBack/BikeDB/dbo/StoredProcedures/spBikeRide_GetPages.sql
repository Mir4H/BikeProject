CREATE PROCEDURE [dbo].[spBikeRide_GetPages]
	@Page INT = 1,                  -- Resulting page for pagination, starting in 1
    @Limit INT = 50,               -- Result page size
    @OrderBy NVARCHAR(255) = NULL,  -- OrderBy column
    @OrderByAsc BIT = 1,			-- OrderBy direction (ASC/DESC)
	@date1 datetime = NULL,
	@date2 datetime = NULL
AS
BEGIN
	IF @date1 IS NULL 
		SELECT @date1 = MIN(DepartureTime) FROM [dbo].[BikeRides]
	IF @date2 IS NULL
		SELECT @date2 = MAX(DepartureTime) FROM [dbo].[BikeRides]
	SELECT COUNT(*) FROM [dbo].[BikeRides] 
	WHERE (DepartureTime BETWEEN @date1 AND @date2) 
END
