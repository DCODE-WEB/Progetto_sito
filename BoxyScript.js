
const API_KEY = "AIzaSyADmPvHqKSyGe1ZHX46brOImQeS5pydxX8"; 

async function PromptScript() {
    const promt_utente = document.getElementById('inputUtente').value;
    const contenitoreAI = document.getElementById('contenitoreAI');
    const contenitoreUtente = document.getElementById('contenitoreUtente');
    const promptUtente = document.getElementById("inputUtente");
    
    promptUtente.value = "";
    if (!promt_utente.trim()) {
        contenitoreAI.innerText = "Inserisci un prompt valido.";
        return;
    }

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: promt_utente
                    }]
                }]
            })
        });

        if (!response.ok) {
            contenitoreUtente.innerText = promt_utente;
            const errorData = await response.json();
            throw new Error(`Errore API: ${errorData.error.message}`);
        }

        const data = await response.json();
        const risposta_AI = data.candidates[0].content.parts[0].text;
        contenitoreAI.innerText = risposta_AI;
         contenitoreUtente.innerText = promt_utente;
        
    }
    

    catch (error) {
        contenitoreAI.innerText = "Errore: " + error.message;
         contenitoreUtente.innerText = promt_utente;
    } 
   
    
}

 async function elimina() {
        /*const contenitore = document.getElementById("contenitore");
        contenitore.innerHTML = "";
        const areaPrompt = document.getElementById("AreaPrompt");
        areaPrompt.innerHTML = "";
        const promptUtente = document.getElementById("inputUtente");
        promptUtente.value = "";*/
        document.getElementById("contenitoreAI").innerHTML = "";
        document.getElementById("contenitoreUtente").innerHTML = "";
    }