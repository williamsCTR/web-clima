//Key de la api a utilizar//
const API_KEY = `03374c9bffdf9e800f08bc6ed9857256`

// fetchData va a obtener la data del clima//
const fetchData = position => {
    //obtenemos la latitud y logitud que sacamos de position//
    const{ latitude, longitude } = position.coords;
    //llamamos con fetch a la api colocando la lagitud y longidud del usuario **colocar "units=metric&"** para pasar de °K a °C//
    fetch(`http://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
         //obtenemos la informacion con .then//
        .then(Response => Response.json())
        //obtenemos la informacion que nos interesa(la del clima) con .then//
        .then(data => setWeatherData(data));
}


const setWeatherData = data =>{
    console.log(data);
    const weatherData ={
        location: data.name,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        temp: data.main.temp,
        date: getDate(),
    }
    Object.keys(weatherData).forEach( key =>{
        document.getElementById(key).textContent = weatherData[key];
    } );

    cleanUp();
}

const cleanUp = () =>{
    let container = document.getElementById(`container`);
    let loader = document.getElementById(`loader`);

    loader.style.display = `none`;
    container.style.display = `flex`;
}

const getDate = () =>{
    let date = new Date();
    return `${(`0`+ date.getDate()).slice(-2)}-${(`0`+ (date.getMonth()+1)) .slice(-2)}-${date.getFullYear()}`;
}

//Creamos una funcion "onLoad" la cual obtiene la ubicacion del usuario//
const onLoad = ()=>{
    navigator.geolocation.getCurrentPosition(fetchData);
}