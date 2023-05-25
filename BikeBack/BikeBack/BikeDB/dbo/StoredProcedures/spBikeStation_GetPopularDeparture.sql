CREATE PROCEDURE [dbo].[spBikeStation_GetPopularDeparture]
	@StationID INT = NULL,
    @Month INT = NULL
AS
BEGIN
	SELECT TOP 5
	  DepartureStationName
	FROM
	  [dbo].[BikeRides]
	WHERE [ReturnStationId] = @StationID AND MONTH(DepartureTime) = ISNULL(@Month, MONTH(DepartureTime))
	GROUP BY
	  DepartureStationName
	ORDER BY
	  COUNT(DepartureStationName) DESC
END