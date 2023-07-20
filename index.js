const { clipboard } = navigator
const output        = document.getElementById(`output`)

function convertText(ev) {

  const text     = ev.clipboardData.getData(`text/plain`)
  const html     = ev.clipboardData.getData(`text/html`)
  const template = document.createElement(`template`)

  template.innerHTML = html || text

  const italicNodes = template.content.querySelectorAll(`em`)

  for (const node of italicNodes) {
    node.replaceWith(`“${ node.textContent }”`)
  }

  const strongNodes = template.content.querySelectorAll(`strong`)

  for (const node of strongNodes) {
    node.replaceWith(`*${ node.textContent }*`)
  }

  output.innerHTML   = ``
  output.appendChild(template.content)

  smartquotes()

  clipboard.writeText(output.innerText)

}

addEventListener(`paste`, convertText)