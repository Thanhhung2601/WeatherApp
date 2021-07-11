const details = document.querySelector(".details");
const form = document.querySelector("form");
const microphone = document.querySelector(".form > i");
const searchInput = document.querySelector("input[name='location']")
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const location = searchInput.value;
    details.innerHTML = '<h1 class="loading">Loading ...</h1>';
    weatherApp(location)
})

function weatherApp(location) {
    getApi(location, (data) => {
        console.log(data);
        const html = `
        <div class="infor-top">
            <div class="name-city">
                <h2><i class="fas fa-map-pin"></i> ${data.name}</h2>
            </div>
            <div class="time">
                <h2>2:11 PM</h2>
        </div>
        </div>
            <div class="infor-center">
                <h1>${data.main.temp.toFixed(0)}°C</h1>
                <p>${data.weather.map(item => item.description)}</p>
            </div>
            <div class="infor-bottom">
                <div class="infor-bottom-left">
                    <ul>
                        <li><i class="fas fa-wind"></i>${data.wind.speed}</li>
                        <li><i class="fas fa-tint"></i>${data.main.humidity} %</li>
                        <li><i class="fas fa-sun"></i>${data.sys.sunrise}</li>
                        <li><i class="fas fa-moon"></i>${data.sys.sunset}</li>
                    </ul>
                </div>
                <div class="infor-bottom-right">
                    <img src=" http://openweathermap.org/img/wn/${data.weather.map(item => item.icon)}@2x.png" alt="">
                </div>
        </div>`;
        details.innerHTML = html;
    });
}

function getApi(location, data) {
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=4d27235f688dfa62128de7e804987142&units=metric&lang=vi`;
    fetch(api)
        .then((response) => {
            return response.json();
        })
        .then(data)
};

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "vi-VN";
recognition.continuous = false;

function handleVoid(text) {
    const handleText = text.toLowerCase();
    if (handleText.includes("thời tiết tại")) {
        const location = handleText.split("tại")[1].trim();
        searchInput.value = location;
        const changeEvent = new Event("submit");
        form.dispatchEvent(changeEvent);
    }
}
microphone.addEventListener("click", (e) => {
    e.preventDefault();
    microphone.setAttribute("class", "fas fa-microphone")
    recognition.start();
});

recognition.onresult = (event) => {
    const textVoid = event.results[0][0].transcript;
    handleVoid(textVoid);
}

recognition.onspeechend = () => {
    recognition.stop();
    microphone.setAttribute("class", "fas fa-microphone-slash")
}