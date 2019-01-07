
import Browser exposing (UrlRequest)
import Browser.Navigation as Nav exposing (Key)
import Html exposing (Html, a, div, section, text, h1)
import Html.Attributes exposing (class, href)
import Routes exposing (Route)
import Url exposing (Url)
import Home as Home 
import Events as Events
import Event as Event
import Display as Display


type alias Model =
    { flags : Flags
    , navKey : Key
    , route : Route
    , page : Page
    }

type alias Flags = String
type Page
    = Page_None
    | Page_Home Home.Model
    | Page_Events Events.Model
    | Page_Event Event.Model
    | Page_Display Display.Model


type Msg
    = OnUrlChange Url
    | OnUrlRequest UrlRequest
    | Msg_Home Home.Msg
    | Msg_Events Events.Msg
    | Msg_Event Event.Msg
    | Msg_Display Display.Msg


init : Flags -> Url -> Key -> ( Model, Cmd Msg )
init flags url navKey =
    let
        model =
            { flags = flags
            , navKey = navKey
            , route = Routes.parseUrl url
            , page = Page_None
            }
    in
    ( model, Cmd.none )
        |> loadCurrentPage


loadCurrentPage : ( Model, Cmd Msg ) -> ( Model, Cmd Msg )
loadCurrentPage ( model, cmd ) =
    let
        ( page, newCmd ) =
            case model.route of
                Routes.EventsRoute->
                  let 
                    (pageModel, pageCmd ) =
                      Events.init model.flags
                  in 
                    (Page_Events pageModel, Cmd.map Msg_Events pageCmd)

                Routes.EventRoute eventId ->
                  let
                    (pageModel,pageCmd) =
                      Event.init eventId
                  in
                    (Page_Event pageModel, Cmd.map Msg_Event pageCmd)

                Routes.HomeRoute ->
                    let
                        ( pageModel, pageCmd ) =
                            Home.init model.flags
                    in
                    ( Page_Home pageModel, Cmd.map Msg_Home pageCmd )

                Routes.DisplayRoute thing ->
                    let
                        ( pageModel, pageCmd ) =
                            Display.init model.flags thing
                    in
                    ( Page_Display pageModel, Cmd.map Msg_Display pageCmd )

                Routes.NotFoundRoute ->
                    ( Page_None, Cmd.none )
    in
    ( { model | page = page }, Cmd.batch [ cmd, newCmd ] )


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case ( msg, model.page ) of
        ( OnUrlRequest urlRequest, _ ) ->
            case urlRequest of
                Browser.Internal url ->
                    ( model
                    , Nav.pushUrl model.navKey (Url.toString url)
                    )

                Browser.External url ->
                    ( model
                    , Nav.load url
                    )

        ( OnUrlChange url, _ ) ->
            let
                newRoute =
                    Routes.parseUrl url
            in
            ( { model | route = newRoute }, Cmd.none )
                |> loadCurrentPage
        ( Msg_Events subMsg, Page_Events pageModel) ->
            let
                (newPageModel, newCmd ) =
                  Events.update subMsg pageModel
            in
              ({ model | page = Page_Events newPageModel }
                , Cmd.map Msg_Events newCmd)
        
        ( Msg_Events subMsg, _ ) ->
            ( model, Cmd.none )
        ( Msg_Event subMsg, Page_Event pageModel) ->
            let
              (newPageModel, newCmd) =
                Event.update subMsg pageModel
            in
              ({model | page = Page_Event newPageModel }
                , Cmd.map Msg_Event newCmd)
        
        ( Msg_Event subMsg, _) ->
                (model, Cmd.none)
        
        ( Msg_Home subMsg, Page_Home pageModel ) ->
            let
                ( newPageModel, newCmd ) =
                    Home.update subMsg pageModel
            in
            ( { model | page = Page_Home newPageModel }
            , Cmd.map Msg_Home newCmd
            )

        ( Msg_Home subMsg, _ ) ->
            ( model, Cmd.none )

        ( Msg_Display subMsg, Page_Display pageModel ) ->
            let
                ( newPageModel, newCmd ) =
                    Display.update model.flags subMsg pageModel
            in
            ( { model | page = Page_Display newPageModel }
            , Cmd.map Msg_Display newCmd
            )

        ( Msg_Display subMsg, _ ) ->
            ( model, Cmd.none )


main : Program Flags Model Msg
main =
    Browser.application
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        , onUrlRequest = OnUrlRequest
        , onUrlChange = OnUrlChange
        }



-- VIEWS


view : Model -> Browser.Document Msg
view model =
    { title = "App"
    , body = [ currentPage model ]
    }


currentPage : Model -> Html Msg
currentPage model =
    let
        page =
            case model.page of
                Page_Home pageModel ->
                    Home.view pageModel
                        |> Html.map Msg_Home
                Page_Events pageModel ->
                    Events.view pageModel
                        |> Html.map Msg_Events
                Page_Event pageModel ->
                    Event.view pageModel
                        |> Html.map Msg_Event
                Page_Display pageModel ->
                    Display.view pageModel
                        |> Html.map Msg_Display

                Page_None ->
                    notFoundView
    in
    section []
        [ nav model
        , div [class "container"][page]
        ]


nav : Model -> Html Msg
nav model =
    let
        links =
            case model.route of
                Routes.HomeRoute ->
                     h1 [][ text "Culture Map"] 

                Routes.DisplayRoute _ ->
                     h1 [][text "Culture Map"]
                Routes.EventRoute  eventId->
                     h1 [] [text "Culture Map"]                    
                Routes.EventsRoute ->
                     h1 [][text "Culture Map"]
                    
                Routes.NotFoundRoute ->
                     h1 [][text "Culture Map"]
                    

        linkToHome =
            div[class "menu"][
            a [ href Routes.homePath, class "text-white" ] [ text "Home" ],
            a [ href (Routes.displayPath "test"), class "text-white"] [text "Display"],
            a [ href Routes.eventsPath, class  "text-white"][text "Events"]
            ]
    in
    div
        [ class "nav" ]
        [links,linkToHome]


notFoundView : Html msg
notFoundView =
    div []
        [ text "Not found"
        ]
