﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Api.Controllers.Models;

#pragma warning disable CS8618
namespace Api.Database.Models
{
    /// <summary>
    /// The type of robot model
    /// </summary>
    public enum RobotType
    {
        /// WARNING:
        /// Changing the names of these enum options is the same as changing their value,
        /// so it will require updating the database with the new names because the enum
        /// is stored as strings in database
        TaurobInspector,
        TaurobOperator,
        ExR2,
        Robot,
        Turtlebot,
        AnymalX,
        AnymalD,
    }

    public class RobotModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }

        /// <summary>
        /// The type of robot model
        /// </summary>
        [Required]
        //Save robot type as string in database
        [Column(TypeName = "nvarchar(56)")]
        public RobotType Type { get; set; }

        /// <summary>
        /// Lower battery warning threshold in percentage
        /// </summary>
        public float? BatteryWarningThreshold { get; set; }

        /// <summary>
        /// Upper pressure warning threshold in mBar
        /// </summary>
        public float? UpperPressureWarningThreshold { get; set; }

        /// <summary>
        /// Lower pressure warning threshold in mBar
        /// </summary>
        public float? LowerPressureWarningThreshold { get; set; }

        public RobotModel() { }

        public RobotModel(CreateRobotModelQuery query)
        {
            Type = query.RobotType;
            BatteryWarningThreshold = query.BatteryWarningThreshold;
            UpperPressureWarningThreshold = query.UpperPressureWarningThreshold;
            LowerPressureWarningThreshold = query.LowerPressureWarningThreshold;
        }

        public void Update(UpdateRobotModelQuery updateQuery)
        {
            BatteryWarningThreshold = updateQuery.BatteryWarningThreshold;
            UpperPressureWarningThreshold = updateQuery.UpperPressureWarningThreshold;
            LowerPressureWarningThreshold = updateQuery.LowerPressureWarningThreshold;
        }
    }
}
