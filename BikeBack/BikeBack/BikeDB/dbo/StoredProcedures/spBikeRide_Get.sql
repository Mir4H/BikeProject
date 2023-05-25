CREATE PROCEDURE [dbo].[spBikeRide_Get]
	@Id INT
AS
BEGIN
    SELECT [Id]
        ,[DepartureTime]
        ,[ReturnTime]
        ,[DepartureStationId]
        ,[DepartureStationName]
        ,[ReturnStationId]
        ,[ReturnStationName]
        ,[CoveredDistance]
        ,[Duration]
    FROM [dbo].[BikeRides] 
    WHERE Id = @Id
END