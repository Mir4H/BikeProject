namespace BikeBack.Models
{
    public class SingleBikeStation
    {
        public SingleBikeStationValues? BikeStationValues { get; set; }
        public IEnumerable<string>? PopularReturn { get; set; }
        public IEnumerable<string>? PopularDeparture { get; set; }
    }
}
