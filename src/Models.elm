module Models exposing (..)

import RemoteData exposing (WebData)

-- MODEL

type Model =
    Failure
  | Loading
  | Success Events

type alias Events =
    {events: (List Event)}
    
type alias Event =
    {id: Int
    ,name: String
    ,location: String
    ,description: String
    ,url: String
    }




-- Fetch Events
