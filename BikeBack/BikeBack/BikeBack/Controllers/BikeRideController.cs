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
        public BikeRidesResult GetBikerides(int? Page = null, string? OrderBy = null, byte? OrderByAsc = null, string? date1 = null, string? date2 = null)
        {
            string sql = $"EXEC [dbo].[spBikeRide_GetAll]";
            string sqlPages = $"EXEC [dbo].[spBikeRide_GetPages]";
            string parameters = "";

            string? dateOne = date1 != null ? DateTime.Parse(date1).ToString("yyyy-MM-dd HH:mm:ss").Replace(".", ":") : null;
            string? dateTwo = date2 != null ? DateTime.Parse(date2).ToString("yyyy-MM-dd HH:mm:ss").Replace(".", ":") : null;

            parameters += Page != null ? $", @Page = {Page}" : null;
            parameters += OrderBy != null ? $", @OrderBy = {OrderBy}" : null;
            parameters += OrderByAsc != null ? $", @OrderByAsc = {OrderByAsc}" : null;
            parameters += date1 != null ? $", @date1 = '{dateOne}'" : null;
            parameters += date2 != null ? $", @date2 = '{dateTwo}'" : null;

            sql += parameters != "" ? parameters.Substring(1) : null;
            sqlPages += parameters != "" ? parameters.Substring(1) : null;

            BikeRidesResult result = new BikeRidesResult();
            result.BikeRideList = _dapper.LoadData<BikeRide>(sql);
            int total = _dapper.LoadDataSingle<int>(sqlPages);
            result.NumberOfPages = (int)Math.Ceiling(total / 50.0);
            return result;
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
