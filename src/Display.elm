module Display exposing (..)
import Html exposing (..)
import Html.Attributes exposing (class, href)
import Http
import Location exposing (Flags)

type alias Model =
    { message : String
    }

init: Flags -> String ->(Model, Cmd Msg)
init flags initString =
  ({message = "Hello this is display"}, Cmd.none )

type Msg = None

update: Flags -> Msg -> Model -> (Model, Cmd Msg)
update flags msg model =
  case msg of
    _ ->
      (model, Cmd.none)

subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none

view: Model -> Html Msg
view model =
  div [][text model.message]