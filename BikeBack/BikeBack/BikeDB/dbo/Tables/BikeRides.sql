CREATE TABLE [dbo].[BikeRides]
(
    [Id] INT NOT NULL IDENTITY(1,1) PRIMARY KEY, 
    [DepartureTime] DATETIME NOT NULL, 
    [ReturnTime] DATETIME NOT NULL, 
    [DepartureStationId] INT NOT NULL, 
    [DepartureStationName] NVARCHAR(50) NOT NULL,
    [ReturnStationId] INT NOT NULL, 
    [ReturnStationName] NVARCHAR(50) NOT NULL, 
    [CoveredDistance] FLOAT NOT NULL CHECK (CoveredDistance>=10), 
    [Duration] FLOAT NOT NULL CHECK (Duration>=10)
)
