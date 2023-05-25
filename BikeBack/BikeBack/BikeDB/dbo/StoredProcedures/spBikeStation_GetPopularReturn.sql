CREATE PROCEDURE [dbo].[spBikeStation_GetPopularReturn]
	@StationID INT = NULL,
    @Month INT = NULL
AS
BEGIN
	SELECT TOP 5
	  ReturnStationName
	FROM
	  [dbo].[BikeRides]
	WHERE [DepartureStationId] = @StationID AND MONTH(DepartureTime) = ISNULL(@Month, MONTH(DepartureTime))
	GROUP BY
	  ReturnStationName
	ORDER BY
	  COUNT(ReturnStationName) DESC
END
