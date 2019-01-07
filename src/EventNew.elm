-- Note: Still much to do on this page. Must decide how to handle OnEventSubmit. Also, update is incomplete and there 
-- must be a validator for each parameter. Perhaps one that does nothing off the bat. 
-- See spa-example Register for more ideas.

module EventNew exposing (..)
import Html exposing (..)
import Html.Attributes exposing (class, href)
import Http

type alias Model =
    { problems: List Problem
    , form: Form
    }

init: Flags -> (Model, Cmd Msg)
init flags =
  ({message = "Hello this is home"}, Cmd.none )

type Msg = NewEvent
          | SubmittedEvent
          | EnteredName String
          | EnteredGenre String
          | EnteredDescription String
          | EnteredLocation String
          | EnteredStartTime String
          | OnEventSubmit (Result Http.Error )


type Problem
    = InvalidEntry ValidatedField String
    | ServerError String

type alias Form =
    { name: String
    , genre: String
    , description: String
    , location: String
    , startTime: String
    }

updateForm : (Form -> Form) -> Model -> ( Model, Cmd Msg )
updateForm transform model =
    ( { model | form = transform model.form }, Cmd.none )

update: Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    EnteredName name ->
      updateForm (\form -> { form | name = name }) model
    EnteredGenre genre ->
      updateForm (\form -> { form | genre = genre }) model
    EnteredLocation location ->
      updateForm (\form -> { form | location = location }) model
    EnteredDescription description ->
      updateForm (\form -> { form | description = description }) model
    EnteredStartTime startTime ->
      updateForm (\form -> { form | startTime = startTime }) model

viewForm: Form -> Html Msg
viewForm form =
  Html.form [onSubmit SubmittedEvent]
    [fieldSet [class "form-group"]
      [ input 
          [ class "form-control form-control-lg"
          , placeholder "Username"
          , onInput EnteredName
          , value form.name
          ]
          []
      ]
    , fieldSet [class "form-group"]
      [ input 
          [ class "form-control form-control-lg"
          , placeholder "Genre"
          , onInput EnteredGenre
          , value form.genre
          ]
          []
      ]
    , fieldSet [class "form-group"]
      [ input 
          [ class "form-control form-control-lg"
          , placeholder "Location"
          , onInput EnteredLocation
          , value form.location
          ]
          []
      ]
    , fieldSet [class "form-group"]
      [ input 
          [ class "form-control form-control-lg"
          , placeholder "Description"
          , onInput EnteredDescription
          , value form.description
          ]
          []
      ]
    , fieldSet [class "form-group"]
      [ input 
          [ class "form-control form-control-lg"
          , placeholder "Start Time"
          , onInput EnteredUsername
          , value form.startTime
          ]
          []
      ]
    , button [ class "btn btn-lg btn-primary pull-xs-right" ]
            [ text "Submit" ]
    ]


type alias Flags = String

subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none

view: Model -> Html Msg
view model =
  div [][text model.message]