const { createClient } = supabase

const db = createClient('https://immdxaerayxmdydoxcjq.supabase.co', 'sb_publishable_NIJJEX9j5UCsH1omiARrFw_f5NZ3zQ5')

const form = document.getElementById('note-form')

const notesContainer = document.getElementById('notes-container')

async function getNotes() {
  const { data, error } = await db.from('notes').select('*').order('created_at', { ascending: false })

  if (error) {
    console.error(error)
    return []
  }

  return data
}

async function renderNotes() {
  const notes = await getNotes()

  notesContainer.innerHTML = ''

  notes.forEach((note) => {
    const div = document.createElement('div')

    div.innerHTML = `
      <p>${note.content}</p>
      <small>${new Date(note.created_at).toLocaleString()}</small>
      <br>
      <button data-id="${note.id}">Delete</button>
      <hr>
    `

    const deleteButton = div.querySelector('button')

    deleteButton.addEventListener('click', async () => {
      const { error } = await db.from('notes').delete().eq('id', note.id)

      if (error) {
        console.error(error)
        return
      }

      renderNotes()
    })

    notesContainer.appendChild(div)
  })
}

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  const content = document.getElementById('note-content').value.trim()

  if (!content) return

  const { error } = await db.from('notes').insert({
    content,
  })

  if (error) {
    console.error(error)
    return
  }

  form.reset()

  renderNotes()
})

renderNotes()
