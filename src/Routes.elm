module Routes exposing (Route(..), parseUrl, displayPath, homePath, eventsPath)

import Url exposing (Url)
import Url.Parser exposing (..)


type Route
    = HomeRoute
    | EventsRoute
    | DisplayRoute String
    | NotFoundRoute


matchers : Parser (Route -> a) a
matchers =
    oneOf
        [ map HomeRoute top
        , map DisplayRoute (s "display" </> string)
        , map HomeRoute (s "home")
        , map EventsRoute (s "events")
        ]


parseUrl : Url -> Route
parseUrl url =
    case parse matchers url of
        Just route ->
            route

        Nothing ->
            NotFoundRoute


pathFor : Route -> String
pathFor route =
    case route of
        EventsRoute ->
            "/events"
        HomeRoute ->
            "/home"

        DisplayRoute thing ->
            "/display/" ++ thing

        NotFoundRoute ->
            "/"


homePath =
    pathFor HomeRoute


displayPath id =
    pathFor (DisplayRoute id)

eventsPath =
    pathFor EventsRoute
