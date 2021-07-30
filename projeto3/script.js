document.querySelector('.busca').addEventListener('submit', async (event)=>{
    event.preventDefault();


    let input = document.querySelector('#searchInput').value;

    if (input !== ''){
        claerInfo();
        showWarning ('Carregando...');

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=fd251661b7a95062dba3773816fac9a6&units=metric&lang=pt_br`;

        let results = await fetch(url);

        let json = await results.json();

        console.log(json)

        if (json.cod === 200){
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            })
        } else{
            claerInfo();
            showWarning ('Localização não encontrada.')
        }

    } // altera api fd251661b7a95062dba3773816fac9a6// 
    else{
        claerInfo();
    }
});

function showInfo(json){
    showWarning('');

    
    document.querySelector('.titulo').innerHTML= `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML= `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML= `${json.windSpeed} <span>km/h</span>`;
    


    document.querySelector('.temp img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle -90}deg)`;

    document.querySelector('.resultado').style.display = 'block';
}

function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg;
}

function claerInfo(){
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';


}