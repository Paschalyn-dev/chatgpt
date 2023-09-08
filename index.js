const send = document.getElementById('sendMessage');
const messages = document.getElementById('message');
const section = document.getElementById('mainDiv');
const copy = document.getElementById('icon');
const greetings = document.getElementById('greetings');

const API_KEY = "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";
const getChatResponse = async () => {
    const API_URL = "https://api.openai.com/v1/completions";
    const requestOptions = {
        method: 'POST', 
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({    
            "model": "text-davinci-003",
            "prompt": messages.value,
            "max_tokens": 2048,
            "temperature": 0,
            n: 1,
            stop: null
        })
    }
    try{
        const response = await (await fetch(API_URL, requestOptions)).json();
        handleRecieve(response)
    } catch(error){
        alert(error)
    }
}

function handleSend(){
    messages.value = messages.value.replace(/^\w|([.!?])\s(\w)/gi, (m) => m.toUpperCase()).replace(/\si\s/gi, (i) => i.toUpperCase()).trim();
    const div =  document.createElement('div');
    div.setAttribute('id', 'incomingMessage');
    const img = document.createElement('img');
    img.setAttribute('src', 'https://assets.vogue.in/photos/640592409d03d0d41504f3a0/1:1/w_1600,h_1600,c_limit/Face%20taping%20.jpg');
    img.setAttribute('alt', 'My image');
    const paragraph = document.createElement('p');
    paragraph.textContent = messages.value;
    div.append(img);
    div.append(paragraph);
    section.append(div);
    greetings.classList.add('greetingHide');
    greetings.classList.remove('greetingShow')
    getChatResponse();
}

function handleRecieve(res){
    const div =  document.createElement('div');
    div.setAttribute('id', 'outgoingMessage');
    const img = document.createElement('img');
    img.setAttribute('src', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO0yLwQ0SaDu6B8G2uCxWb4Zm0tnHz74ThtWqbKinbJcnMkgy6T85gF6nETCHrffalbU0&usqp=CAU');
    img.setAttribute('alt', 'AI image');
    const paragraph = document.createElement('p');
    paragraph.innerHTML = res?.choices[0]?.text ? res?.choices[0]?.text?.trim() : "...";
    const icon = document.createElement('i');
    icon.setAttribute('class', 'icon ion-md-copy');
    icon.setAttribute('id', 'icon');
    icon.setAttribute('title', 'Copy');
    div.append(img);
    div.append(paragraph);
    div.append(icon)
    section.append(div);
    icon.addEventListener('click', () => {
        navigator.clipboard.writeText(paragraph.innerHTML);    
        alert('Text copied successfully!')
    });
}

messages.addEventListener('change', () => {
    messages.value = messages.value.replace(/^\w|([.!?])\s(\w)/gi, (m) => m.toUpperCase()).replace(/\si\s/gi, (i) => i.toUpperCase()).trim();
})

send.addEventListener('click', () => {
    if(messages.value !== ""){
        handleSend();
    }}
);

messages.addEventListener('keypress', (e) => {
    if(e.keyCode === 13 && messages.value !== ""){
        handleSend();
    }
})


