namespace BikeBack.Models
{
    public partial class BikeRide
    {
        public int Id { get; set; }
        public DateTime DepartureTime { get; set; }

        public DateTime ReturnTime { get; set; }

        public int DepartureStationId { get; set; }

        public string DepartureStationName { get; set; } = "";

        public int ReturnStationId { get; set; }

        public string ReturnStationName { get; set; } = "";

        public float CoveredDistance { get; set; }

        public float Duration { get; set; }
    }
}
