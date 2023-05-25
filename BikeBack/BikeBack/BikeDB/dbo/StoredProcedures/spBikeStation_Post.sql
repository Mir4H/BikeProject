CREATE PROCEDURE [dbo].[spBikeStation_Post]
	@StationID INT,  
    @FinnishName NVARCHAR(50), 
    @SwedishName NVARCHAR(50), 
    @EnglishName NVARCHAR(50),
    @FinnishAddress NVARCHAR(50), 
    @SwedishAddress NVARCHAR(50), 
    @FinnishCity NVARCHAR(50) = NULL, 
    @SwedishCity NVARCHAR(50) = NULL, 
    @Operator NVARCHAR(50) = NULL, 
    @Capacity INT, 
    @LocationX DECIMAL(15, 13), 
    @LocationY DECIMAL(15, 13)
AS
BEGIN
    IF NOT EXISTS (SELECT * FROM [dbo].[BikeStations] WHERE StationID = @StationID)
        BEGIN
            INSERT INTO [dbo].[BikeStations] (
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
		            ,[LocationY])
                VALUES (
                @StationID,  
                @FinnishName, 
                @SwedishName, 
                @EnglishName,
                @FinnishAddress, 
                @SwedishAddress, 
                @FinnishCity, 
                @SwedishCity, 
                @Operator, 
                @Capacity, 
                @LocationX, 
                @LocationY)
        END
    ELSE
        BEGIN
            UPDATE [dbo].[BikeStations]
                SET     
                    FinnishName = @FinnishName, 
                    SwedishName = @SwedishName, 
                    EnglishName = @EnglishName,
                    FinnishAddress = @FinnishAddress, 
                    SwedishAddress = @SwedishAddress, 
                    FinnishCity = @FinnishCity, 
                    SwedishCity = @SwedishCity, 
                    Operator = @Operator, 
                    Capacity = @Capacity, 
                    LocationX = @LocationX, 
                    LocationY = @LocationY
                WHERE StationID = @StationID
        END
END