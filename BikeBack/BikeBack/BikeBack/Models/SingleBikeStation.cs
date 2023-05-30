namespace BikeBack.Models
{
    public class SingleBikeStation
    {
        public SingleBikeStationValues? BikeStationValues { get; set; }
        public IEnumerable<Statistics>? PopularReturn { get; set; }
        public IEnumerable<Statistics>? PopularDeparture { get; set; }
    }
}
