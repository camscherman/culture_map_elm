module Home exposing (..)
import Html exposing (..)
import Html.Attributes exposing (class, href)
import Http

type alias Model =
    { message : String
    }

init: Flags -> (Model, Cmd Msg)
init flags =
  ({message = "Hello this is home"}, Cmd.none )

type Msg = None

type alias Flags = String

update:  Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    _ ->
      (model, Cmd.none)

subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none

view: Model -> Html Msg
view model =
  div [][text model.message]


