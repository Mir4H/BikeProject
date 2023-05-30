namespace BikeBack.Models
{
    public class BikeRidesResult
    {
        public IEnumerable<BikeRide>? BikeRideList { get; set; }
        public int NumberOfPages { get; set; }
    }
}
