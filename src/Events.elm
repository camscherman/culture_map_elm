module Events exposing (..)

import Html exposing (..)
import Html.Attributes exposing (class)
import Http 
import Json.Decode as Decode
import Json.Decode.Pipeline exposing (required)

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
                    [th [][text "Id"]
                    ,th [] [text "Name"]
                    ,th [] [text "Location"]
                    ,th [] [text "Description"]
                    ,th [] [text "Url"]
                    ]
                ]
             , tbody [] (List.map eventRow events)   
            ]
        ]

eventRow: Event -> Html Msg
eventRow event =
    tr []
        [ td [] [ text (String.fromInt event.id) ]
        , td [] [text event.name ]
        , td [] [text event.location]
        , td [] [text event.description]
        , td [] [text event.url]
        , td []
            []
        ]