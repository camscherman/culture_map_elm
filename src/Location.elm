module Location exposing (Location, Flags)

-- basic map location
type alias Location = 
    { latitude: Float
    , longitude: Float
    }
-- aliasing flags to be a location until further notice
type alias Flags = Location