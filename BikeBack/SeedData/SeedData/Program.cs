using CsvHelper;
using System.Globalization;
using System.Text;
using System.ComponentModel.DataAnnotations;
using SeedData.Models;
using System.Data;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Dapper;
using CsvHelper.Configuration;

namespace SeedData
{
    internal class Program
    {
        static void Main(string[] args)
        {
            IConfiguration config = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .Build();

            using (var client = new HttpClient())
            {
                if (!File.Exists("BikeridesMay.txt"))
                {
                    using var s = client.GetStreamAsync("https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv");
                    Console.WriteLine("Loading Bike Rides May");
                    using var fs = new FileStream("BikeridesMay.txt", FileMode.OpenOrCreate);
                    s.Result.CopyTo(fs);
                }
                if (!File.Exists("BikeridesJune.txt"))
                {
                    using var s = client.GetStreamAsync("https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv");
                    Console.WriteLine("Loading Bike Rides June");
                    using var fs = new FileStream("BikeridesJune.txt", FileMode.OpenOrCreate);
                    s.Result.CopyTo(fs);
                }
                if (!File.Exists("BikeridesJuly.txt"))
                {
                    using var s = client.GetStreamAsync("https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv");
                    Console.WriteLine("Loading Bike Rides July");
                    using var fs = new FileStream("BikeridesJuly.txt", FileMode.OpenOrCreate);
                    s.Result.CopyTo(fs);
                }
                if (!File.Exists("BikeStations.txt"))
                {
                    using var s = client.GetStreamAsync("https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv");
                    Console.WriteLine("Loading Bike Stations");
                    using var fs = new FileStream("BikeStations.txt", FileMode.OpenOrCreate);
                    s.Result.CopyTo(fs);
                }
            }

            List<BikeRide> validBikerides = new List<BikeRide>();
            List<string> fileNames = new List<string>() { "BikeridesMay.txt", "BikeridesJune.txt", "BikeridesJuly.txt", "BikeStations.txt" };
            var configcsv = new CsvConfiguration(CultureInfo.InvariantCulture)
            {
                Delimiter = ",",
                Quote = '\"'
            };
            foreach (string file in fileNames)
            {
                using var streamReader = new StreamReader(file, Encoding.GetEncoding("iso-8859-1"));
                using (var csvReader = new CsvReader(streamReader, configcsv))
                {
                    if (file != "BikeStations.txt")
                    {
                        Console.WriteLine("Adding records, from file: " + file);
                        while (csvReader.Read())
                        {
                            try
                            {
                                var record = csvReader.GetRecord<BikeRide>();
                                if (record != null)
                                {
                                    var validationContext = new ValidationContext(record);
                                    bool isValid = Validator.TryValidateObject(record, validationContext, null, true);

                                    if (isValid)
                                    {
                                        validBikerides.Add(record);
                                    }
                                    else
                                    {
                                        Console.WriteLine("Record not valid");
                                        Console.WriteLine("Distance: " + record.CoveredDistance);
                                        Console.WriteLine("Duration: " + record.Duration);
                                        continue;
                                    }
                                }
                            }
                            catch (Exception ex)
                            {
                                Console.WriteLine(ex);
                                continue;
                            }
                        }
                        using var connection = new SqlConnection(config.GetConnectionString("DefaultConnection"));
                        using (var bulkCopy = new SqlBulkCopy(connection))
                        {
                            DataTable dt = Extensions.ToDataTable(validBikerides);
                            connection.Open();

                            bulkCopy.DestinationTableName = "[dbo].[Bikerides]";
                            bulkCopy.ColumnMappings.Add(nameof(BikeRide.DepartureTime), "DepartureTime");
                            bulkCopy.ColumnMappings.Add(nameof(BikeRide.ReturnTime), "ReturnTime");
                            bulkCopy.ColumnMappings.Add(nameof(BikeRide.DepartureStationId), "DepartureStationId");
                            bulkCopy.ColumnMappings.Add(nameof(BikeRide.DepartureStationName), "DepartureStationName");
                            bulkCopy.ColumnMappings.Add(nameof(BikeRide.ReturnStationId), "ReturnStationId");
                            bulkCopy.ColumnMappings.Add(nameof(BikeRide.ReturnStationName), "ReturnStationName");
                            bulkCopy.ColumnMappings.Add(nameof(BikeRide.CoveredDistance), "CoveredDistance");
                            bulkCopy.ColumnMappings.Add(nameof(BikeRide.Duration), "Duration");

                            bulkCopy.WriteToServer(dt);
                            bulkCopy.Close();
                            validBikerides.Clear();
                            Console.WriteLine("Added Bike Rides From " + file);
                        }
                    }
                    else
                    {
                        while (csvReader.Read())
                        {
                            try
                            {
                                var record = csvReader.GetRecord<BikeStation>();
                                if (record != null)
                                {
                                    var validationContext = new ValidationContext(record);
                                    bool isValid = Validator.TryValidateObject(record, validationContext, null, true);

                                    if (isValid)
                                    {
                                        using var connection = new SqlConnection(config.GetConnectionString("DefaultConnection"));
                                        string x = record.LocationX.ToString().Replace(",", ".");
                                        string y = record.LocationY.ToString().Replace(",", ".");
                                        string sql = @$"IF NOT EXISTS (SELECT * FROM [dbo].[BikeStations] WHERE StationID = {record.StationID}) " +
                                            "INSERT INTO [dbo].[BikeStations] (" +
                                            "StationID, " +
                                            "FinnishName, " +
                                            "SwedishName, " +
                                            "EnglishName, " +
                                            "FinnishAddress, " +
                                            "SwedishAddress, " +
                                            "FinnishCity, " +
                                            "SwedishCity, " +
                                            "Operator, " +
                                            "Capacity, " +
                                            "LocationX, " +
                                            "LocationY) " +
                                            "VALUES (" +
                                            $"'{record.StationID}', " +
                                            $"'{record.FinnishName}', " +
                                            $"'{record.SwedishName}', " +
                                            $"'{record.EnglishName}', " +
                                            $"'{record.FinnishAddress}', " +
                                            $"'{record.SwedishAddress}', " +
                                            $"'{record.FinnishCity}', " +
                                            $"'{record.SwedishCity}', " +
                                            $"'{record.Operator}', " +
                                            $"'{record.Capacity}', " +
                                            $"'{x}', " +
                                            $"'{y}')";
                                        Console.WriteLine(sql);
                                        connection.Execute(sql);
                                    }
                                    else
                                    {
                                        Console.WriteLine(record);
                                        continue;
                                    }
                                }
                            }
                            catch (Exception ex)
                            {
                                Console.WriteLine(ex);
                                continue;
                            }
                        }
                        Console.WriteLine("Added Bike Stations from " + file);
                    }
                }
            }
            Console.WriteLine("Completed");

        }
    }
}


