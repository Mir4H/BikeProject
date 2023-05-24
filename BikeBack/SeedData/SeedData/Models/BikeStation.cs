using CsvHelper.Configuration.Attributes;
using System.ComponentModel.DataAnnotations;

namespace SeedData.Models
{
    public class BikeStation
    {
        [Range(1, int.MaxValue)]
        [Name("FID")]
        public int FID { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        [Name("ID")]
        public int StationID { get; set; }

        [Required]
        [DataType(DataType.Text)]
        [Name("Nimi")]
        public string FinnishName { get; set; } = "";

        [Required]
        [DataType(DataType.Text)]
        [Name("Namn")]
        public string SwedishName { get; set; } = "";

        [Required]
        [DataType(DataType.Text)]
        [Name("Name")]
        public string EnglishName { get; set; } = "";

        [Required]
        [DataType(DataType.Text)]
        [Name("Osoite")]
        public string FinnishAddress { get; set; } = "";

        [Required]
        [DataType(DataType.Text)]
        [Name("Adress")]
        public string SwedishAddress { get; set; } = "";

        [DataType(DataType.Text)]
        [Name("Kaupunki")]
        public string FinnishCity { get; set; } = "";

        [DataType(DataType.Text)]
        [Name("Stad")]
        public string SwedishCity { get; set; } = "";

        [DataType(DataType.Text)]
        [Name("Operaattor")]
        public string Operator { get; set; } = "";

        [Required]
        [Range(1, int.MaxValue)]
        [Name("Kapasiteet")]
        public int Capacity { get; set; }

        [Required]
        [Range(float.MinValue, float.MaxValue)]
        [Name("x")]
        public float LocationX { get; set; }

        [Required]
        [Range(float.MinValue, float.MaxValue)]
        [Name("y")]
        public float LocationY { get; set; }
    }
}
