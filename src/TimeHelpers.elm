module TimeHelpers exposing (..)
import Time exposing ( utc, toYear, toMonth, toDay, toHour, toMinute, toSecond, Month(..))
-- Time Formatting
toUtcTime: Int -> String
toUtcTime intTime =
  let 
    time = Time.millisToPosix intTime
  in
    monthToString (toMonth utc time)
    ++ " " ++
    String.fromInt (toDay utc time)
    ++ " " ++
    String.fromInt (toHour utc time)
    ++ ":" ++
    minuteToString (toMinute utc time)
    ++ " " ++ "(UTC)"
-- Minute Format
minuteToString: Int -> String
minuteToString int =
  if int < 10 then "0" ++ (String.fromInt int)
  else (String.fromInt int)

-- To Month String
monthToString: Month -> String
monthToString month =
  case month of 
    Jan -> "January"
    Feb -> "February"
    Mar -> "March"
    Apr -> "April"
    May -> "May"
    Jun -> "June"
    Jul -> "July"
    Aug -> "August"
    Sep -> "September"
    Oct -> "October"
    Nov -> "November"
    Dec -> "December"