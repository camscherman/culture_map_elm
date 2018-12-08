
import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http
import Json.Decode as Decode
import Json.Decode.Pipeline exposing (required)
import RemoteData exposing (WebData)
import Events.List
import Msgs exposing (..)
import Models exposing (..)
import Commands exposing (..)



-- MAIN


main =
  Browser.document
    { init = init
    , update = update
    , subscriptions = subscriptions
    , view = \m->
                { title = "Elm 0.19 starter"
                , body = [ view m ]
                }
    }





-- UPDATE

init : () -> (Model, Cmd Msg)
init _ =
  ( Loading, fetchEvents)


update: Msg -> Model -> (Model, Cmd Msg)
update msg model =
    case msg of 
        OnFetchEvents result ->
            case result of 
              Ok events ->
                (Success {events= events }, Cmd.none)
              Err _ ->
                (Failure, Cmd.none)



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none



-- VIEW


view : Model -> Html Msg
view model =
  case model of 
    Success events->
      Events.List.view events.events
    Failure ->
      div [][]
    Loading ->
      div [][text "Loading"]
