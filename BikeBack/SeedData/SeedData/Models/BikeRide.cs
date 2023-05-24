using CsvHelper.Configuration.Attributes;
using System.ComponentModel.DataAnnotations;

namespace SeedData.Models
{
    public class BikeRide
    {
        [Required]
        [DataType(DataType.DateTime)]
        [Name("Departure")]
        public string DepartureTime { get; set; } = "";

        [Required]
        [DataType(DataType.DateTime)]
        [Name("Return")]
        public string ReturnTime { get; set; } = "";

        [Required]
        [Range(1, int.MaxValue)]
        [Name("Departure station id")]
        public int DepartureStationId { get; set; }

        [Required]
        [DataType(DataType.Text)]
        [Name("Departure station name")]
        public string DepartureStationName { get; set; } = "";

        [Required]
        [Range(1, int.MaxValue)]
        [Name("Return station id")]
        public int ReturnStationId { get; set; }

        [Required]
        [DataType(DataType.Text)]
        [Name("Return station name")]
        public string ReturnStationName { get; set; } = "";

        [Required]
        [Range(10, float.MaxValue)]
        [Name("Covered distance (m)")]
        public float CoveredDistance { get; set; }

        [Required]
        [Range(10, float.MaxValue)]
        [Name("Duration (sec.)")]
        public float Duration { get; set; }
    }
}
