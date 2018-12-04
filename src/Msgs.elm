module Msgs exposing (..)

import Models exposing (Event)
import RemoteData exposing (WebData)
import Http

type Msg
  = OnFetchEvents (Result Http.Error (List Event))