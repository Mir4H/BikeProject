CREATE PROCEDURE [dbo].[spBikeStation_Get]
	@StationID INT = NULL,
    @Month INT = NULL
AS
BEGIN
DECLARE @Departures INT;
DECLARE @Returns INT;
DECLARE @AvgDistance FLOAT;
DECLARE @AvgDuration FLOAT;
	
	SELECT @Departures = COUNT(*) FROM [dbo].[BikeRides] WHERE [DepartureStationId] = @StationID AND MONTH(DepartureTime) = ISNULL(@Month, MONTH(DepartureTime))
	SELECT @Returns = COUNT(*) FROM [dbo].[BikeRides] WHERE [ReturnStationId] = @StationID AND MONTH(DepartureTime) = ISNULL(@Month, MONTH(DepartureTime))
	SELECT @AvgDistance = AVG(CoveredDistance) FROM [dbo].[BikeRides] WHERE [ReturnStationId] = @StationID AND MONTH(DepartureTime) = ISNULL(@Month, MONTH(DepartureTime))
	SELECT @AvgDuration = AVG(Duration) FROM [dbo].[BikeRides] WHERE [ReturnStationId] = @StationID AND MONTH(DepartureTime) = ISNULL(@Month, MONTH(DepartureTime))

    SELECT
       [StationID]
      ,[FinnishName]
      ,[SwedishName]
      ,[EnglishName]
      ,[FinnishAddress]
      ,[SwedishAddress]
      ,[FinnishCity]
      ,[SwedishCity]
      ,[Operator]
      ,[Capacity]
      ,[LocationX]
      ,[LocationY]
	  ,@Departures as TotalDepartures
	  ,@Returns as TotalReturns
	  ,@AvgDistance AS AvgDistance
	  ,@AvgDuration AS AvgDuration
  FROM [dbo].[BikeStations]
   WHERE StationID = @StationID
END