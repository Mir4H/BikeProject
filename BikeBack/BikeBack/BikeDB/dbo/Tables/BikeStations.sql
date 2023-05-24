CREATE TABLE [dbo].[BikeStations]
(
    [StationID] INT NOT NULL PRIMARY KEY,  
    [FinnishName] NVARCHAR(50) NOT NULL, 
    [SwedishName] NVARCHAR(50) NOT NULL, 
    [EnglishName] NVARCHAR(50) NOT NULL,
    [FinnishAddress] NVARCHAR(50) NOT NULL, 
    [SwedishAddress] NVARCHAR(50) NOT NULL, 
    [FinnishCity] NVARCHAR(50) NULL, 
    [SwedishCity] NVARCHAR(50) NULL, 
    [Operator] NVARCHAR(50) NULL, 
    [Capacity] INT NOT NULL, 
    [LocationX] DECIMAL(15, 13) NOT NULL, 
    [LocationY] DECIMAL(15, 13) NOT NULL
)