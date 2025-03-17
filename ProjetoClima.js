document.getElementById("search").addEventListener("submit", function(event) {
    event.preventDefault();

    const cityName = document.getElementById("city_name").value;

    if (!cityName) {
        alert("Por favor, insira o nome da cidade!");
        return;
    }

    const apiKey = "a7c56782737a4726d092398395b6b9b8";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=a7c56782737a4726d092398395b6b9b8&units=metric&lang=pt_br`;

    fetch(url)
        .then(response => response.json())
        .then(data => {

            if (data.cod === "404") {
                alert("Cidade não encontrada!");
                return;
            }

            const title = document.getElementById("tittle");
            title.textContent = `${data.name}, ${data.sys.country}`;

            const weatherIconCode = data.weather[0].icon;
            const weatherDescription = data.weather[0].description;

            const tempImg = document.getElementById("temp_img");
            tempImg.src = `http://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;

            const temp = document.getElementById("ensolarado");
            temp.innerHTML = `${Math.round(data.main.temp)}°C ${weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1)}`;

            const otherInfos = document.getElementById("other_infos");
            otherInfos.innerHTML = `
                <div>🌡️ Temp. max: ${Math.round(data.main.temp_max)}°C</div>
                <div>🌡️ Temp. min: ${Math.round(data.main.temp_min)}°C</div>
                <div>💧 Umidade: ${data.main.humidity}%</div>
                <div>🌬️ Vento: ${Math.round(data.wind.speed)} Km/h</div>
            `;
        })
        .catch(error => {
            console.error("Erro ao obter dados do clima:", error);
            alert("Ocorreu um erro. Tente novamente mais tarde.");
        });
});