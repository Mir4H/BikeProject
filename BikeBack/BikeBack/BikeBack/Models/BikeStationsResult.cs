namespace BikeBack.Models
{
    public class BikeStationsResult
    {
        public IEnumerable<BikeStation>? BikeStationList { get; set; }
        public int NumberOfPages { get; set; }
    }
}
