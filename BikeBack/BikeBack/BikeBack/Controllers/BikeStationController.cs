using BikeBack.Data;
using BikeBack.Models;
using Microsoft.AspNetCore.Mvc;

namespace BikeBack.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BikeStationController : ControllerBase
    {
        DataContextDapper _dapper;
        public BikeStationController(IConfiguration config)
        {
            _dapper = new DataContextDapper(config);
        }


        [HttpGet("GetBikeStations")]
        public IEnumerable<BikeStation> GetBikeStations(string? SearchTerm = null, int? Page = null, int? Limit = null, string? OrderBy = null, byte? OrderByAsc = null)
        {
            string sql = $"EXEC [dbo].[spBikeStation_GetAll]";
            string parameters = "";

            parameters += SearchTerm != null ? $", @SearchTerm = {SearchTerm}" : null;
            parameters += Page != null ? $", @Page = {Page}" : null;
            parameters += Limit != null ? $", @Limit = {Limit}" : null;
            parameters += OrderBy != null ? $", @OrderBy = {OrderBy}" : null;
            parameters += OrderByAsc != null ? $", @OrderByAsc = {OrderByAsc}" : null;

            sql += parameters != "" ? parameters.Substring(1) : null;

            IEnumerable<BikeStation> bikeStations = _dapper.LoadData<BikeStation>(sql);
            return bikeStations;
        }

        [HttpGet("GetSingleBikeStation/{Id}")]
        public SingleBikeStation GetBikeStation(int Id, int? Month = null)
        {
            string sqlValues = $"EXEC [dbo].[spBikeStation_Get] @StationID = {Id}";
            string sqlDeparture = $"EXEC [dbo].[spBikeStation_GetPopularDeparture] @StationID = {Id}";
            string sqlReturn = $"EXEC [dbo].[spBikeStation_GetPopularReturn] @StationID = {Id}";

            if (Month != null)
            {
                sqlValues += $", @Month = {Month}";
                sqlDeparture += $", @Month = {Month}";
                sqlReturn += $", @Month = {Month}";
            }

            Console.WriteLine(sqlValues);

            SingleBikeStation bikeStation = new SingleBikeStation();
            bikeStation.BikeStationValues = _dapper.LoadDataSingle<SingleBikeStationValues>(sqlValues);
            bikeStation.PopularDeparture = _dapper.LoadData<string>(sqlDeparture);
            bikeStation.PopularReturn = _dapper.LoadData<string>(sqlReturn);

            return bikeStation;
        }

        [HttpPost("AddBikeStation")]
        public IActionResult AddBikeRide(BikeStation bikeStation)
        {
            string sql = $@"EXEC [dbo].[spBikeStation_Post] 
                            @StationID = {bikeStation.StationID}, 
                            @FinnishName = {bikeStation.FinnishName}, 
                            @SwedishName = {bikeStation.SwedishName},
                            @EnglishName = {bikeStation.EnglishName}, 
                            @FinnishAddress = {bikeStation.FinnishAddress}, 
                            @SwedishAddress = {bikeStation.SwedishAddress},
                            @FinnishCity = {bikeStation.FinnishCity}, 
                            @SwedishCity = {bikeStation.SwedishCity}, 
                            @Operator = {bikeStation.Operator},
                            @Capacity = {bikeStation.Capacity}, 
                            @LocationX = {bikeStation.LocationX}, 
                            @LocationY = {bikeStation.LocationY}";
            if (_dapper.ExecuteSql(sql))
            {
                return Ok();
            }
            throw new Exception("Failed to add bike ride");
        }
    }
}
