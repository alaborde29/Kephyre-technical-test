import * as React from 'react';
import { useEffect, useState } from 'react'
import Marker from 'react-native-maps';


    let [error, setError] = useState();
    let [response, setResponse] = useState();
    let [allStations, setAllStations] = useState();

function getAllStations() {
    fetch("https://api.jcdecaux.com/vls/v3/stations?contract={nantes}&apiKey={" + process.env.JCD_KEY + "}")
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoading(false);
                setAllStations(result);
            },
            (error) => {
                setIsLoading(false);
                setError(error);
            },
    )
    return <Text>{allStations}</Text>
}

function getStationInfo(station_number) {
    fetch("https://api.jcdecaux.com/vls/v3/stations/{" + station_number + "}?contract={nantes}&apiKey={" + process.env.JCD_KEY + "}")
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoading(false);
                setResponse(result);
            },
            (error) => {
                setIsLoading(false);
                setError(error);
            },
        )
}

function initStationDatas() {
    getStationInfo()

    for (let i = 0; i < allStations.length; i++) {
        getStationInfo(allStations[i].number)
    }
}

export default getAllStations;
// export default function createStationsMarkers({props}) {
//     initStationDatas();
//     return ()
// }

// export default function createStationsList({props}) {
//     initStationDatas();
//     return ()
// }