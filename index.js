const { clipboard } = navigator
const output        = document.getElementById(`output`)

const markdown = window.markdownit({
  quotes     : '“”‘’',
  typographer: true,
})

function convertText(text) {

  const template = document.createElement(`template`)

  template.innerHTML = text

  const italicNodes = template.content.querySelectorAll(`em`)

  for (const node of italicNodes) {
    node.replaceWith(`“${node.textContent}”`)
  }

  const strongNodes = template.content.querySelectorAll(`strong`)

  for (const node of strongNodes) {
    node.replaceWith(`*${node.textContent}*`)
  }

  return template

}

function displayText(template) {
  output.innerHTML = ``
  output.appendChild(template.content)
  clipboard.writeText(output.innerText)
}

function handleQuerystring() {

  const { searchParams } = new URL(window.location)

  if (!searchParams.size) return

  const md          = searchParams.get(`text`)
  const redirectURI = searchParams.get(`redirect_uri`)

  if (md === null) {

    const error = `No text was provided to convert.`

    if (redirectURI) {
      window.location = `${ redirectURI }?error=${error}`
    }

    return

  }

  const html     = markdown.render(md)
  const template = convertText(html)

  displayText(template)

  if (redirectURI) {
    window.location = `${ redirectURI }?text=${ output.value }`
  }

}

function handlePaste(ev) {

  const text   = ev.clipboardData.getData(`text/plain`)
  const html   = ev.clipboardData.getData(`text/html`)

  const template = convertText(html || text)

  displayText(template)

}

addEventListener(`load`, handleQuerystring)
addEventListener(`paste`, handlePaste)