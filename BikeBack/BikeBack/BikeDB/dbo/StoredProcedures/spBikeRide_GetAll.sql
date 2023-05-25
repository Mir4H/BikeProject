CREATE PROCEDURE [dbo].[spBikeRide_GetAll]
	@Page INT = 1,                  -- Resulting page for pagination, starting in 1
    @Limit INT = 100,               -- Result page size
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
	SELECT * INTO #RawResult FROM [dbo].[BikeRides]
	WHERE DepartureTime BETWEEN @date1 AND @date2
	IF (@OrderByAsc = 1 AND @OrderBy = 'DepartureTime')
		SELECT * FROM #RawResult ORDER BY DepartureTime ASC OFFSET @Limit * (@Page - 1) ROWS FETCH NEXT @Limit ROWS ONLY
	ELSE
	IF (@OrderByAsc = 0 AND @OrderBy = 'DepartureTime')
		SELECT * FROM #RawResult ORDER BY DepartureTime DESC OFFSET @Limit * (@Page - 1) ROWS FETCH NEXT @Limit ROWS ONLY
	ELSE
	IF (@OrderByAsc = 1 AND @OrderBy = 'ReturnTime')
		SELECT * FROM #RawResult ORDER BY ReturnTime ASC OFFSET @Limit * (@Page - 1) ROWS FETCH NEXT @Limit ROWS ONLY
	ELSE
	IF (@OrderByAsc = 0 AND @OrderBy = 'ReturnTime')
		SELECT * FROM #RawResult ORDER BY ReturnTime DESC OFFSET @Limit * (@Page - 1) ROWS FETCH NEXT @Limit ROWS ONLY
	ELSE
	IF (@OrderByAsc = 1 AND @OrderBy = 'DepartureStationName')
		SELECT * FROM #RawResult ORDER BY DepartureStationName ASC OFFSET @Limit * (@Page - 1) ROWS FETCH NEXT @Limit ROWS ONLY
	ELSE
	IF (@OrderByAsc = 0 AND @OrderBy = 'DepartureStationName')
		SELECT * FROM #RawResult ORDER BY DepartureStationName DESC OFFSET @Limit * (@Page - 1) ROWS FETCH NEXT @Limit ROWS ONLY
	ELSE
	IF (@OrderByAsc = 1 AND @OrderBy = 'ReturnStationName')
		SELECT * FROM #RawResult ORDER BY ReturnStationName ASC OFFSET @Limit * (@Page - 1) ROWS FETCH NEXT @Limit ROWS ONLY
	ELSE
	IF (@OrderByAsc = 0 AND @OrderBy = 'ReturnStationName')
		SELECT * FROM #RawResult ORDER BY ReturnStationName DESC OFFSET @Limit * (@Page - 1) ROWS FETCH NEXT @Limit ROWS ONLY
	ELSE
	IF (@OrderByAsc = 1 AND @OrderBy = 'CoveredDistance')
		SELECT * FROM #RawResult ORDER BY CoveredDistance ASC OFFSET @Limit * (@Page - 1) ROWS FETCH NEXT @Limit ROWS ONLY
	ELSE
	IF (@OrderByAsc = 0 AND @OrderBy = 'CoveredDistance')
		SELECT * FROM #RawResult ORDER BY CoveredDistance DESC OFFSET @Limit * (@Page - 1) ROWS FETCH NEXT @Limit ROWS ONLY
	ELSE
	IF (@OrderByAsc = 1 AND @OrderBy = 'Duration')
		SELECT * FROM #RawResult ORDER BY Duration ASC OFFSET @Limit * (@Page - 1) ROWS FETCH NEXT @Limit ROWS ONLY
	ELSE
	IF (@OrderByAsc = 0 AND @OrderBy = 'Duration')
		SELECT * FROM #RawResult ORDER BY Duration DESC OFFSET @Limit * (@Page - 1) ROWS FETCH NEXT @Limit ROWS ONLY
	ELSE
		SELECT * FROM #RawResult ORDER BY 1 ASC OFFSET @Limit * (@Page - 1) ROWS FETCH NEXT @Limit ROWS ONLY
END