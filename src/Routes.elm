module Routes exposing (Route(..), parseUrl, displayPath, homePath, eventsPath, eventNewPath)

import Url exposing (Url)
import Url.Parser exposing (..)


type Route
    = HomeRoute
    | EventsRoute
    | EventNewRoute
    | DisplayRoute String
    | EventRoute String
    | NotFoundRoute


matchers : Parser (Route -> a) a
matchers =
    oneOf
        [ map HomeRoute top
        , map DisplayRoute (s "display" </> string)
        , map HomeRoute (s "home")
        , map EventRoute (s "events" </> string)
        , map EventsRoute (s "events")
        , map EventNewRoute (s "new_event")
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
        EventNewRoute ->
            "/new_event"
        EventRoute eventId->
            "/events/" ++ eventId
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

eventPath eventId =
    pathFor (EventRoute eventId)

eventNewPath =
    pathFor (EventNewRoute)
