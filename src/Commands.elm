module Commands exposing (..)

import Http 
import Json.Decode as Decode
import Json.Decode.Pipeline exposing (required)
import Msgs exposing (..)
import Models exposing (..)
fetchEvents: Cmd Msg
fetchEvents = 
  Http.get {url = fetchEventsUrl,expect = Http.expectJson OnFetchEvents eventsDecoder }


-- Fetch Events Url
fetchEventsUrl: String
fetchEventsUrl = "http://localhost:3001/api/v1/events"

-- Events Decoder
eventsDecoder: Decode.Decoder (List Event)
eventsDecoder = 
    Decode.list eventDecoder 

-- Event Decoder
eventDecoder: Decode.Decoder Event 
eventDecoder =
        Decode.succeed Event
        |> required "id" Decode.int
        |> required "name" Decode.string
        |> required "location" Decode.string
        |> required "description" Decode.string
        |> required "url" Decode.string