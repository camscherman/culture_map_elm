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

init : Flags -> ( Model, Cmd msg )
init flags =
    ( { problems = []
      , form =
            { name = ""
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
    SubmittedEvent ->
            case validate model.form of
                Ok validForm ->
                    ( { model | problems = [] }
                    , Http.send CompletedRegister (register validForm)
                    )

                Err problems ->
                    ( { model | problems = problems }
                    , Cmd.none
                    )
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
    CompletedEventSubmit (Err error) ->
            let
                serverErrors =
                    Api.decodeErrors error
                        |> List.map ServerError
            in
            ( { model | problems = List.append model.problems serverErrors }
            , Cmd.none
            )

        CompletedRegister (Ok viewer) ->
            ( model
            , Viewer.store viewer
            )

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

submitEvent : TrimmedForm -> Http.Request Viewer
submitEvent (Trimmed form) =
    let
        event =
            Encode.object
                [ ( "name", Encode.string form.string )
                , ( "genre", Encode.string form.string )
                , ( "description", Encode.string form.string )
                , ( "location", Encode.string form.location )
                , ( "startTime", Encode.string form.startTime)
                ]

        body =
            Encode.object [ ( "event", event ) ]
                |> Http.jsonBody
    in
    Api.register body Viewer.decoder

type TrimmedForm
    = Trimmed Form


trimFields : Form -> TrimmedForm
trimFields form =
    Trimmed
        { name = String.trim form.name
        , genre= String.trim form.genre
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
            StartTime -> 
                if String.isEmpty form.startTime then
                    ["Start Time can't be blank."]
