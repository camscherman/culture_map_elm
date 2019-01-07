module Events exposing (..)

import Html exposing (..)
import Html.Attributes exposing (class, href)
import Http 
import Json.Decode as Decode
import Json.Decode.Pipeline exposing (required)
import TimeHelpers exposing (..)
import Event exposing (Event, eventDecoder)

-- MODEL

type Model =
    Failure
  | Loading
  | Success Events



type alias Events =
    {events: (List Event)}
    

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



-- Events Decoder
eventsDecoder: Decode.Decoder (List Event)
eventsDecoder = 
    Decode.list eventDecoder 

-- Event Decoder






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
        [div [class "events-title"][text "Events"]]

list: List Event -> Html Msg
list events =
    div [class "section"]
        [table [class "table is-bordered"]
            [thead []
                [tr []
                    [th [][text "Start Time"]
                    ,th [] [text "Name"]
                    ,th [] [text "Location"]
                    ,th [] [text "Genre"]
                    ]
                ]
             , tbody [] (List.map eventRow events)   
            ]
        ]

eventRow: Event -> Html Msg
eventRow event =
    tr []
        [td [] [text (toUtcTime event.startTime) ] 
        , td [] [eventLink event.name (eventPath event.id)]
        , td [] [text event.location]
        , td [] [text event.genre]
        ]

eventLink: String -> String -> Html Msg
eventLink title path =
  a [href path] [text title]

eventPath: Int -> String
eventPath id =
  "/events/" ++ String.fromInt id