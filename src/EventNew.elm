-- Note: Still much to do on this page. Must decide how to handle OnEventSubmit. Also, update is incomplete and there 
-- must be a validator for each parameter. Perhaps one that does nothing off the bat. 
-- See spa-example Register for more ideas.

-- Notes. Form is not updating onInput. Investigate this

module EventNew exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Browser.Navigation as Nav exposing (Key)
import Html.Events exposing (..)
import Route exposing (Route)
import Http
import Json.Encode as Encode

type alias Model =
    { problems: List Problem
    , form: Form
    }

init : Flags -> ( Model, Cmd msg )
init flags =
    ( { problems = []
      , form =
            { name = "Tester"
            , genre = ""
            , description = ""
            , location = ""
            , startTime = ""
            }
      }
    , Cmd.none
    )

type Msg = NewEvent
          | SubmittedEvent
          | EnteredName String
          | EnteredGenre String
          | EnteredDescription String
          | EnteredLocation String
          | EnteredStartTime String
          | CompletedEventSubmit (Result Http.Error () )


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
    SubmittedEvent ->
            case validate model.form of
                Ok validForm ->
                    ( { model | problems = [] }
                    , submitEvent validForm
                    )

                Err problems ->
                    ( { model | problems = problems }
                    , Cmd.none
                    )
    EnteredName name ->
      updateForm (\form -> {form | name = name }) model
    EnteredGenre genre ->
      updateForm (\form -> { form | genre = genre }) model
    EnteredLocation location ->
      updateForm (\form -> { form | location = location }) model
    EnteredDescription description ->
      updateForm (\form -> { form | description = description }) model
    EnteredStartTime startTime ->
      updateForm (\form -> { form | startTime = startTime }) model
    CompletedEventSubmit (Err error) ->
            let
                serverErrors =
                    decodeErrors error
            in
            ( { model | problems = List.append model.problems serverErrors }
            , Cmd.none
            )

    CompletedEventSubmit (Ok ()) ->
            ( model
            , Routes.eventsPath
            )
    NewEvent ->
      (model, Cmd.none )

viewForm: Form -> Html Msg
viewForm form =
  Html.form [onSubmit SubmittedEvent]
    [fieldset [class "form-group"]
      [ input 
          [ placeholder "Event Name"
          , value form.name
          , onInput EnteredName
          ]
          []
      ]
    , fieldset [class "form-group"]
      [ input 
          [ class "form-control form-control-lg"
          , placeholder "Genre"
          , value form.genre
          , onInput EnteredGenre
          ]
          []
      ]
    , fieldset [class "form-group"]
      [ input 
          [ class "form-control form-control-lg"
          , placeholder "Location"
          , value form.location
          , onInput EnteredLocation
          ]
          []
      ]
    , fieldset [class "form-group"]
      [ input 
          [ class "form-control form-control-lg"
          , placeholder "Description"
          , value form.description
          , onInput EnteredDescription
          ]
          []
      ]
    , fieldset [class "form-group"]
      [ input 
          [ class "form-control form-control-lg"
          , placeholder "Start Time"
          , value form.startTime
          , onInput EnteredStartTime
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
  div [][viewForm model.form]

decodeErrors : Http.Error -> List Problem
decodeErrors error =
    [ServerError "Server Error"]


submitEvent : TrimmedForm -> Cmd Msg
submitEvent (Trimmed form) =
    let
        event =
            Encode.object
                [ ( "name", Encode.string form.name )
                , ( "genre", Encode.string form.genre )
                , ( "description", Encode.string form.description )
                , ( "location", Encode.string form.location )
                , ( "startTime", Encode.string form.startTime)
                ]

        body =
            Encode.object [ ( "event", event ) ]
                |> Http.jsonBody
    in
    postEvent newEventUrl body

newEventUrl : String
newEventUrl = "http://localhost:3001/api/v1/events"

postEvent : String -> Http.Body -> Cmd Msg
postEvent url body =
  Http.post
    {
        url = url 
      , body = body
      , expect = Http.expectWhatever CompletedEventSubmit 
    }

type TrimmedForm
    = Trimmed Form


trimFields : Form -> TrimmedForm
trimFields form =
    Trimmed
        { name = String.trim form.name
        , genre = String.trim form.genre
        , description = String.trim form.description
        , location = String.trim form.location
        , startTime = String.trim form.startTime
        }

fieldsToValidate : List ValidatedField
fieldsToValidate =
    [ Name
    , Genre
    , Description 
    , Location 
    , StartTime 
    ]

validate : Form -> Result (List Problem) TrimmedForm
validate form =
    let
        trimmedForm =
            trimFields form
    in
    case List.concatMap (validateField trimmedForm) fieldsToValidate of
        [] ->
            Ok trimmedForm

        problems ->
            Err problems

type ValidatedField
    = Name
    | Genre
    | Description 
    | Location 
    | StartTime

validateField : TrimmedForm -> ValidatedField -> List Problem
validateField (Trimmed form) field =
    List.map (InvalidEntry field) <|
        case field of
            Name ->
                if String.isEmpty form.name then
                    [ "Event name can't be blank." ]

                else
                    []

            Genre ->
                if String.isEmpty form.genre then
                    [ "Genre can't be blank." ]

                else
                    []

            Description ->
                if String.isEmpty form.description then
                    [ "password can't be blank." ]
                else
                    []
            Location ->
                if String.isEmpty form.location then
                    ["Location can't be blank."]
                else
                    []
            StartTime -> 
                if String.isEmpty form.startTime then
                    ["Start Time can't be blank."]
                else
                    []
