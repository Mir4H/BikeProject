CREATE PROCEDURE [dbo].[spBikeStation_GetPages]
	@SearchTerm VARCHAR(255) = '',
	@Page INT = 1,                  -- Resulting page for pagination, starting in 1
    @Limit INT = 50,               -- Result page size
    @OrderBy NVARCHAR(255) = NULL,  -- OrderBy column
    @OrderByAsc BIT = 1				-- OrderBy direction (ASC/DESC)
AS
BEGIN
    SELECT COUNT(*) FROM [dbo].[BikeStations]
	WHERE FinnishName LIKE '%'+@SearchTerm+'%' OR FinnishAddress LIKE '%'+@SearchTerm+'%'
END
