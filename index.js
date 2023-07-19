const { clipboard } = navigator
const output        = document.getElementById(`output`)

function convertText(ev) {

  const pastedText = ev.clipboardData.getData(`text/html`)
  const template   = document.createElement(`template`)

  template.innerHTML = pastedText

  const italicNodes = template.content.querySelectorAll(`em`)

  for (const node of italicNodes) {
    node.replaceWith(`“${ node.textContent }”`)
  }

  const strongNodes = template.content.querySelectorAll(`strong`)

  for (const node of strongNodes) {
    node.replaceWith(`*${ node.textContent }*`)
  }

  output.innerHTML = ``
  output.appendChild(template.content)

  smartquotes()

  const type          = `text/html`
  const blob          = new Blob([output.innerHTML], { type });
  const clipboardItem = new ClipboardItem({ [type]: blob })

  clipboard.write([clipboardItem])

}

addEventListener(`paste`, convertText)