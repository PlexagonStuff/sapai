var socket = io({autoConnect: false});

socket.on("connect", () => {
	console.log("Connected");
});

socket.on("packStart", () => {
    document.getElementById('packGoesHere').innerText = "The pack is being generated. Due to ChatGPT rate limiting, this will take around a minute.";
});


socket.on("packCreated", (data) => {
    document.getElementById('packGoesHere').innerText = data["pack"];
});





const form = document.getElementById('form');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    console.log(Object.fromEntries(formData.entries()));
    var formJSON = Object.fromEntries(formData.entries());
    socket.connect();
    socket.emit("generate", formJSON);

});