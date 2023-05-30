CREATE PROCEDURE [dbo].[spBikeStation_Get]
	@StationID INT = NULL,
    @Month INT = NULL
AS
BEGIN
DECLARE @Departures INT;
DECLARE @Returns INT;
DECLARE @AvgDistanceReturn FLOAT;
DECLARE @AvgDurationReturn FLOAT;
DECLARE @AvgDistanceDep FLOAT;
DECLARE @AvgDurationDep FLOAT;
	
	SELECT @Departures = COUNT(*) FROM [dbo].[BikeRides] WHERE [DepartureStationId] = @StationID AND MONTH(DepartureTime) = ISNULL(@Month, MONTH(DepartureTime))
	SELECT @Returns = COUNT(*) FROM [dbo].[BikeRides] WHERE [ReturnStationId] = @StationID AND MONTH(DepartureTime) = ISNULL(@Month, MONTH(DepartureTime))
	SELECT @AvgDistanceReturn = AVG(CoveredDistance) FROM [dbo].[BikeRides] WHERE [ReturnStationId] = @StationID AND MONTH(DepartureTime) = ISNULL(@Month, MONTH(DepartureTime))
	SELECT @AvgDurationReturn = AVG(Duration) FROM [dbo].[BikeRides] WHERE [ReturnStationId] = @StationID AND MONTH(DepartureTime) = ISNULL(@Month, MONTH(DepartureTime))
    SELECT @AvgDistanceDep = AVG(CoveredDistance) FROM [dbo].[BikeRides] WHERE [DepartureStationId] = @StationID AND MONTH(DepartureTime) = ISNULL(@Month, MONTH(DepartureTime))
	SELECT @AvgDurationDep = AVG(Duration) FROM [dbo].[BikeRides] WHERE [DepartureStationId] = @StationID AND MONTH(DepartureTime) = ISNULL(@Month, MONTH(DepartureTime))

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
	  ,@AvgDistanceReturn AS AvgDistanceReturn
	  ,@AvgDurationReturn AS AvgDurationReturn
      ,@AvgDistanceDep AS AvgDistanceDep
	  ,@AvgDurationDep AS AvgDurationDep
  FROM [dbo].[BikeStations]
   WHERE StationID = @StationID
END