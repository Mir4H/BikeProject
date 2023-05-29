CREATE PROCEDURE [dbo].[spBikeStation_GetAll]
	@SearchTerm VARCHAR(255) = '',
	@Page INT = 1,                  -- Resulting page for pagination, starting in 1
    @Limit INT = 50,               -- Result page size
    @OrderBy NVARCHAR(255) = NULL,  -- OrderBy column
    @OrderByAsc BIT = 1				-- OrderBy direction (ASC/DESC)
AS
BEGIN
    SELECT * INTO #RawResult FROM [dbo].[BikeStations]
	WHERE FinnishName LIKE '%'+@SearchTerm+'%' OR FinnishAddress LIKE '%'+@SearchTerm+'%'
	IF (@OrderByAsc = 1 AND @OrderBy = 'FinnishName')
		SELECT * FROM #RawResult ORDER BY FinnishName ASC OFFSET @Limit * (@Page - 1) ROWS FETCH NEXT @Limit ROWS ONLY
	ELSE
	IF (@OrderByAsc = 0 AND @OrderBy = 'FinnishName')
		SELECT * FROM #RawResult ORDER BY FinnishName DESC OFFSET @Limit * (@Page - 1) ROWS FETCH NEXT @Limit ROWS ONLY
	ELSE
	IF (@OrderByAsc = 1 AND @OrderBy = 'FinnishAddress')
		SELECT * FROM #RawResult ORDER BY FinnishAddress ASC OFFSET @Limit * (@Page - 1) ROWS FETCH NEXT @Limit ROWS ONLY
	ELSE
	IF (@OrderByAsc = 0 AND @OrderBy = 'FinnishAddress')
		SELECT * FROM #RawResult ORDER BY FinnishAddress DESC OFFSET @Limit * (@Page - 1) ROWS FETCH NEXT @Limit ROWS ONLY
	ELSE
	IF (@OrderByAsc = 1 AND @OrderBy = 'FinnishCity')
		SELECT * FROM #RawResult ORDER BY FinnishCity ASC OFFSET @Limit * (@Page - 1) ROWS FETCH NEXT @Limit ROWS ONLY
	ELSE
	IF (@OrderByAsc = 0 AND @OrderBy = 'FinnishCity')
		SELECT * FROM #RawResult ORDER BY FinnishCity DESC OFFSET @Limit * (@Page - 1) ROWS FETCH NEXT @Limit ROWS ONLY
	ELSE
	IF (@OrderByAsc = 1 AND @OrderBy = 'Capacity')
		SELECT * FROM #RawResult ORDER BY Capacity ASC OFFSET @Limit * (@Page - 1) ROWS FETCH NEXT @Limit ROWS ONLY
	ELSE
	IF (@OrderByAsc = 0 AND @OrderBy = 'Capacity')
		SELECT * FROM #RawResult ORDER BY Capacity DESC OFFSET @Limit * (@Page - 1) ROWS FETCH NEXT @Limit ROWS ONLY
	ELSE
		SELECT * FROM #RawResult ORDER BY 1 ASC OFFSET @Limit * (@Page - 1) ROWS FETCH NEXT @Limit ROWS ONLY
END
