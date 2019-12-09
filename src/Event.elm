module Event exposing (..)
import Html exposing (..)
import Html.Attributes exposing (class, href)
import Http
import Json.Decode as Decode
import TimeHelpers exposing (..)
import Json.Decode.Pipeline exposing (required, optional)
import Location exposing (Flags)

type Model =
    Failure
  | Loading
  | Success Event

view : Model -> Html Msg
view model =
  case model of 
    Success event ->
      eventView event
    Failure ->
      div [][]
    Loading ->
      div [][text "Loading"]

init : String -> (Model, Cmd Msg)
init eventId =
  ( Loading, fetchEvent eventId)

type Msg
  = OnFetchEvent (Result Http.Error Event)

type alias Event =
    {id: Int
    ,name: String
    ,location: String
    ,description: String
    ,url: String
    ,startTime: Int
    ,genre: String
    }

-- Fetch Event
fetchEvent: String -> Cmd Msg
fetchEvent id = 
  Http.get {url = fetchEventUrl id,expect = Http.expectJson OnFetchEvent eventDecoder } 


-- Fetch Events Url
fetchEventUrl: String -> String
fetchEventUrl eventId = "http://localhost:3001/api/v1/events/" ++ eventId

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
        |> optional "genre" Decode.string "None"


update:  Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of 
        OnFetchEvent result ->
            case result of 
              Ok event ->
                (Success event, Cmd.none)
              Err _ ->
                (Failure, Cmd.none)
    

subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none

eventView: Event -> Html Msg
eventView  event =
  div [class "event-show"][h1 [][text event.name]
        , h3 [][text ("Location: " ++ event.location)]
        , h3 [] [text ("Genre: " ++ event.genre)]
        , div [][p [class "event-description"][text event.description]]
        , h3 [][text ("Start Time: " ++ (toUtcTime event.startTime))]]
        
  

