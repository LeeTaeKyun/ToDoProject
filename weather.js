const weather = document.querySelector(".js-weather");

const COORDS = 'coords';
const API_KEY = "7d5e06d7a94dd5ca1337a2036c6bf1c5";
function getWeather(lat, lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&lang=kr&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json()
    }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        //console.log(json);
        weather.innerText = `${temperature} @ ${place}`;
    });
}

// getCorona();
// function getCorona(){
//     var xhr = new XMLHttpRequest();
//     var url = 'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson'; /*URL*/
//     var queryParams = '?' + encodeURIComponent('ServiceKey') + '='+'cICdnrurLBWeNtt7z%2FD3VSwFr6RhfHKbXn6QbsZfTTpj1%2B6fyhraTXG5bOYSbepkBmGAzjA8tlflHj8LyuWFMA%3D%3D'; 
//     queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
//     queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
//     queryParams += '&' + encodeURIComponent('startCreateDt') + '=' + encodeURIComponent('20210202'); /**/
//     queryParams += '&' + encodeURIComponent('endCreateDt') + '=' + encodeURIComponent('20210202'); /**/
//     xhr.open('GET', url + queryParams);
//     xhr.onreadystatechange = function () {
//         if (this.readyState == 4) {
//             alert('Status: '+this.status+'nHeaders: '+JSON.stringify(this.getAllResponseHeaders())+'nBody: '+this.responseText);
//         }
//     };

//     xhr.send('');
// }

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}


function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log('error');
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}


function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    
    if(loadedCoords === null){
        askForCoords();
    }else{
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}
function init(){

    loadCoords();
}

init();