module Events exposing (..)

import Html exposing (..)
import Html.Attributes exposing (class)
import Http 
import Json.Decode as Decode
import Json.Decode.Pipeline exposing (required)
import Time exposing ( utc, toYear, toMonth, toDay, toHour, toMinute, toSecond, Month(..))

-- MODEL

type Model =
    Failure
  | Loading
  | Success Events



type alias Events =
    {events: (List Event)}
    
type alias Event =
    {id: Int
    ,name: String
    ,location: String
    ,description: String
    ,url: String
    ,startTime: Int
    }
-- 
type alias Flags =
    String

-- Msg
type Msg
  = OnFetchEvents (Result Http.Error (List Event))


-- Fetch Events
fetchEvents: Cmd Msg
fetchEvents = 
  Http.get {url = fetchEventsUrl,expect = Http.expectJson OnFetchEvents eventsDecoder } 


-- Fetch Events Url
fetchEventsUrl: String
fetchEventsUrl = "http://localhost:3001/api/v1/events"

-- All Events Decoder
decodeAllEvents: List Event -> Int
decodeAllEvents events =
  1


-- Events Decoder
eventsDecoder: Decode.Decoder (List Event)
eventsDecoder = 
    Decode.list eventDecoder 

-- Event Decoder
eventDecoder: Decode.Decoder Event 
eventDecoder =
        Decode.succeed Event
        |> required "id" Decode.int
        |> required "name" Decode.string
        |> required "location" Decode.string
        |> required "description" Decode.string
        |> required "url" Decode.string
        |> required "startTime" Decode.int 



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

init : Flags -> (Model, Cmd Msg)
init _ =
  ( Loading, fetchEvents)

eventsView: (List Event) -> Html Msg
eventsView response =
    div []
        [nav 
        ,list response
        ]

view : Model -> Html Msg
view model =
  case model of 
    Success events->
      eventsView events.events
    Failure ->
      div [][]
    Loading ->
      div [][text "Loading"]

-- Commands

update: Msg -> Model -> (Model, Cmd Msg)
update msg model =
    case msg of 
        OnFetchEvents result ->
            case result of 
              Ok events ->
                (Success {events= events }, Cmd.none)
              Err _ ->
                (Failure, Cmd.none)

nav: Html Msg
nav =
    div [class "clearfix mb2 white bg-black"]
        [div [class "left p2"][text "Events"]]

list: List Event -> Html Msg
list events =
    div [class "section"]
        [table [class "table is-bordered"]
            [thead []
                [tr []
                    [th [][text "Start Time"]
                    ,th [][text "Id"]
                    ,th [] [text "Name"]
                    ,th [] [text "Location"]
                    ,th [] [text "Url"]
                    ]
                ]
             , tbody [] (List.map eventRow events)   
            ]
        ]

eventRow: Event -> Html Msg
eventRow event =
    tr []
        [td [] [text (toUtcTime event.startTime) ] 
        ,td [] [ text (String.fromInt event.id) ]
        , td [] [text event.name ]
        , td [] [text event.location]
        , td [] [text event.url]
        ]