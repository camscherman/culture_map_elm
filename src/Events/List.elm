module Events.List exposing (..)

import Html exposing (..)
import Html.Attributes exposing (class)
import Msgs exposing (Msg)
import Models exposing (Event)
import RemoteData exposing (WebData)

view: (List Event) -> Html Msg
view response =
    div []
        [nav 
        ,list response
        ]


nav: Html Msg
nav =
    div [class "clearfix mb2 white bg-black"]
        [div [class "left p2"][text "Events"]]

list: List Event -> Html Msg
list events =
    div [class "p2"]
        [table []
            [thead []
                [tr []
                    [th [][text "Id"]
                    ,th [] [text "Name"]
                    ,th [] [text "Location"]
                    ,th [] [text "Description"]
                    ,th [] [text "Url"]
                    ]
                ]
             , tbody [] (List.map eventRow events)   
            ]
        ]

eventRow: Event -> Html Msg
eventRow event =
    tr []
        [ td [] [ text (String.fromInt event.id) ]
        , td [] [text event.name ]
        , td [] [text event.location]
        , td [] [text event.description]
        , td [] [text event.url]
        , td []
            []
        ]