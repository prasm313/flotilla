﻿namespace Api.Utilities
{
    public class ConfigException(string message) : Exception(message)
    {
    }

    public class MissionException : Exception
    {
        public MissionException(string message) : base(message) { }

        public MissionException(string message, int isarStatusCode) : base(message)
        {
            IsarStatusCode = isarStatusCode;
        }
        public int IsarStatusCode { get; set; }
    }

    public class MissionSourceTypeException(string message) : Exception(message)
    {
    }
    public class OngoingMissionNotLocalizationException(string message) : Exception(message)
    {
    }

    public class SourceException(string message) : Exception(message)
    {
    }

    public class InstallationNotFoundException(string message) : Exception(message)
    {
    }

    public class PlantNotFoundException(string message) : Exception(message)
    {
    }

    public class DeckNotFoundException(string message) : Exception(message)
    {
    }

    public class AreaNotFoundException(string message) : Exception(message)
    {
    }

    public class MissionNotFoundException(string message) : Exception(message)
    {
    }

    public class InspectionNotFoundException(string message) : Exception(message)
    {
    }

    public class MissionTaskNotFoundException(string message) : Exception(message)
    {
    }

    public class MissionRunNotFoundException(string message) : Exception(message)
    {
    }

    public class RobotPositionNotFoundException(string message) : Exception(message)
    {
    }

    public class RobotNotFoundException(string message) : Exception(message)
    {
    }

    public class RobotInformationNotAvailableException(string message) : Exception(message)
    {
    }

    public class RobotPressureTooLowException(string message) : Exception(message)
    {
    }

    public class RobotBatteryLevelTooLowException(string message) : Exception(message)
    {
    }

    public class TagPositionNotFoundException(string message) : Exception(message)
    {
    }

    public class AreaExistsException(string message) : Exception(message)
    {
    }

    public class DeckExistsException(string message) : Exception(message)
    {
    }

    public class SafeZoneException(string message) : Exception(message)
    {
    }

    public class RobotNotAvailableException(string message) : Exception(message)
    {
    }

    public class RobotNotInSameInstallationAsMissionException(string message) : Exception(message)
    {
    }

    public class PoseNotFoundException(string message) : Exception(message)
    {
    }

    public class IsarCommunicationException(string message) : Exception(message)
    {
    }

    public class LocalizationFailedException(string message) : Exception(message)
    {
    }

    public class ReturnToHomeMissionFailedToScheduleException(string message) : Exception(message)
    {
    }
    public class RobotCurrentAreaMissingException(string message) : Exception(message)
    {
    }

    public class UnsupportedRobotCapabilityException(string message) : Exception(message)
    {
    }
}
