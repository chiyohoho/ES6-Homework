const callElement = id => { return document.querySelector(id) }
// ------------------------------------------------------------
const cardContent = callElement("#card_content")
const inputText = callElement("#input_text")

const showNoiDung = () => {
    let str = inputText.value
    let chars = [...str]

    cardContent.textContent = ""

    chars.forEach(text => {
        const textSpan = document.createElement("h1")
        textSpan.textContent = text
        textSpan.classList.add("text")
        cardContent.appendChild(textSpan)
    })
}
inputText.addEventListener("input", showNoiDung)
showNoiDung()



