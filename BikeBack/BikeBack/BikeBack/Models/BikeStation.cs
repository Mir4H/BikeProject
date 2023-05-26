namespace BikeBack.Models
{
    public class BikeStation
    {

        public int StationID { get; set; }

        public string FinnishName { get; set; } = "";

        public string SwedishName { get; set; } = "";

        public string EnglishName { get; set; } = "";

        public string FinnishAddress { get; set; } = "";

        public string SwedishAddress { get; set; } = "";

        public string FinnishCity { get; set; } = "";

        public string SwedishCity { get; set; } = "";

        public string Operator { get; set; } = "";

        public int Capacity { get; set; }

        public float LocationX { get; set; }

        public float LocationY { get; set; }
    }
}
