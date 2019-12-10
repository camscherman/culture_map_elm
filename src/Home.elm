port module Home exposing (..)
import Html exposing (..)
import Html.Attributes exposing (class, href, id)
import Http
import Json.Decode as Decode
import Json.Decode.Pipeline exposing (required)
import Location exposing (Flags, Location)
import Events exposing (fetchEventsUrl, eventsDecoder)
import Event exposing (Event, eventDecoder)
port sendLocation : Location -> Cmd msg
port sendEvents : List Event -> Cmd msg
port receiveLocation : (Location -> msg) -> Sub msg


type Model =  Success ModelData
            -- | Loading
            -- | Success ModelData
   

type alias ModelData = 
   { 
      location : Location,
      events : Maybe (List Event)
    }

init: Flags -> (Model, Cmd Msg)
init flags =
  (Success {  location = flags, events = Nothing}, loadEvents )

type Msg = Changed Location
          | NoMsg
          | OnLoadEvents (Result Http.Error (List Event))

-- Load Events
loadEvents: Cmd Msg
loadEvents = 
  Http.get {url = fetchEventsUrl,expect = Http.expectJson OnLoadEvents eventsDecoder }

update:  Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case (msg, model) of
    (Changed location, Success modelData)->
      (Success {modelData | location = location}, sendLocation location)
    (NoMsg, _ ) ->
      (model, Cmd.none)
    (OnLoadEvents result, Success modelData) ->
      case result of
        Ok events ->
          (Success {modelData | events =  Just events}, sendEvents events)
        Err _ ->
          (model , Cmd.none)
    -- (OnLoadEvents result, Success modelData) ->
    --   case result of
    --     Ok events ->
    --       (Success {modelData | events =  Just events}, Cmd.none)
    --     Err _ ->
    --       (model, Cmd.none)
    -- (_, Loading) ->
    --   (model, Cmd.none)
        

subscriptions : Model -> Sub Msg
subscriptions model =
      receiveLocation (\location -> Changed location )


view: Model -> Html Msg
view model =
  div [] [div [id "mapid" ][]]


