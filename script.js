let apiKey = "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";
const input = document.querySelector("#input");
const sendBtn = document.querySelector("#sendBtn");
sendBtn.addEventListener("click", () => {
  if (input.value !== "") {
    document.getElementsByClassName("loading")[0].style.display = "flex";
    document.getElementsByClassName(
      "loading"
    )[0].innerHTML = `  <div class="load">
        <h6></h6>
        <h6></h6>
        <h6></h6>
      </div>`;
    sendBtn.style.cursor = "not-allowed";
    runMessage(input.value);
} else {
    return;
  }
});
function offButton() {
    Array.from(document.getElementsByClassName("button")).forEach((el) => {
        el.classList.remove("lan");
    });
}
Array.from(document.getElementsByClassName("button")).forEach((el) => {
    el.addEventListener("click", () => {
        offButton();
        el.classList.add("lan");
    });
});

async function runMessage(message) {
    qusBox(message)
    input.value='';
    sendBtn.style.cursor = "pointer";
  // alert(message)
  let lan = document.getElementsByClassName("lan")[0].innerText;
  try {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: message + "in" + lan,
        temperature: 0.5,
        max_tokens: 3000,
      }),
    });
    const data = await response.json();
    ansBox(data.choices[0].text)
    // console.log(data);
    // console.log(data.choices[0].text)
    document.getElementsByClassName("loading")[0].style.display = "none";
  } catch (error) {
    document.getElementsByClassName(
        "loading"
      )[0].innerHTML = `<h2>Oooops My Bad...</h2>`;
  }
}

function qusBox(msg){
    let myMsg = document.createElement('pre');
    myMsg.classList.add('qus-box');
    let myMsgP = document.createElement('p')
    myMsgP.innerText=msg;
    myMsg.append(myMsgP)
    document.getElementById("history").append(myMsg)
}
function ansBox(res){
    let ansMsg = document.createElement('pre')
    ansMsg.classList.add("ans-box")
    let ansMsgP = document.createElement('p')
    ansMsgP.innerText=res;
    ansMsg.append(ansMsgP);
    document.getElementById("history").append(ansMsg)
}
