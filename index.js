let inputWord = document.getElementById("inputText");
let wordDescription = document.getElementById("resultDiv");
let buttonclick = document.getElementById("btn");
const sound = document.getElementById("sound");
buttonclick.addEventListener("click",findMeaning);
async function findMeaning(){
    let word = inputWord.value;
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    try
    {
        let response = await fetch(url,{method:'GET'});
        let data = await response.json();
        console.log(data);
        let audioUrl = '';
        for (let phonetic of data[0].phonetics) {
            if (phonetic.audio) {
                audioUrl = phonetic.audio;
                break;
            }
        }
        if (audioUrl && !audioUrl.startsWith("https://")) {
            audioUrl = "https:" + audioUrl;
        }
        wordDescription.innerHTML = `<div class="word">
        <h3>${word}</h3>
        <button onclick="playSound()">
        <i class="fa-solid fa-volume-up"></i>
        </button>
    </div>
    <div class="details">
        <p>${data[0].meanings[0].partOfSpeech}</p>
        <p>/${data[0].phonetic}/</p>
    </div>
    <p class="word-meaning">
        ${data[0].meanings[0].definitions[0].definition}
    </p>
    <p class="word-example">
        ${data[0].meanings[0].definitions[0].example || ""};
    </p>`;
    if(audioUrl)
        {
            sound.setAttribute("src", audioUrl);
        }
    else
    {
        sound.removeAttribute("src");
    }
    }
    catch(error)
    {
        wordDescription.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
    }
}
function playSound()
{
    if (sound.getAttribute("src")) {
        sound.play();
    } else {
        alert("No audio available for this word.");
    }
}

