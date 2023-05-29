using BikeBack.Models;
using BikeBack.Data;
using Microsoft.AspNetCore.Mvc;

namespace BikeBack.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BikerideController : ControllerBase
    {
        DataContextDapper _dapper;
        public BikerideController(IConfiguration config)
        {
            _dapper = new DataContextDapper(config);
        }

        [HttpGet]
        public IEnumerable<BikeRide> GetBikerides(int? Page = null, int? Limit = null, string? OrderBy = null, byte? OrderByAsc = null, string? date1 = null, string? date2 = null)
        {
            string sql = $"EXEC [dbo].[spBikeRide_GetAll]";
            string parameters = "";

            string? dateOne = date1 != null ? DateTime.Parse(date1).ToString("yyyy-MM-dd HH:mm:ss").Replace(".", ":") : null;
            string? dateTwo = date2 != null ? DateTime.Parse(date2).ToString("yyyy-MM-dd HH:mm:ss").Replace(".", ":") : null;

            parameters += Page != null ? $", @Page = {Page}" : null;
            parameters += Limit != null ? $", @Limit = {Limit}" : null;
            parameters += OrderBy != null ? $", @OrderBy = {OrderBy}" : null;
            parameters += OrderByAsc != null ? $", @OrderByAsc = {OrderByAsc}" : null;
            parameters += date1 != null ? $", @date1 = '{dateOne}'" : null;
            parameters += date2 != null ? $", @date2 = '{dateTwo}'" : null;

            sql += parameters != "" ? parameters.Substring(1) : null;
            Console.WriteLine(sql);
            IEnumerable<BikeRide> bikeRides = _dapper.LoadData<BikeRide>(sql);
            return bikeRides;
        }

        [HttpGet("{Id}")]
        public BikeRide GetBikeride(int Id)
        {
            string sql = $"EXEC [dbo].[spBikeRide_Get] @Id={Id}";

            BikeRide bikeRide = _dapper.LoadDataSingle<BikeRide>(sql);
            return bikeRide;

        }
    }
}
