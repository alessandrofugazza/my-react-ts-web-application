import { useEffect, useState, type SubmitEvent } from 'react'
import { supabase } from '../supabase'

type Note = {
  id: number
  content: string
  created_at: string
}

function Notepad() {
  const [notes, setNotes] = useState<Note[]>([])
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  async function getNotes() {
    setLoading(true)
    setErrorMessage('')

    const { data, error } = await supabase
      .from('notes')
      .select('id, content, created_at')
      .order('created_at', { ascending: true })

    if (error) {
      console.error(error)
      setErrorMessage(error.message)
      setLoading(false)
      return
    }

    setNotes((data ?? []) as Note[])
    setLoading(false)
  }

  useEffect(() => {
    void getNotes()
  }, [])

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault()

    const trimmedContent = content.trim()

    // STOP empty string or currently saving, don't submit
    if (!trimmedContent || saving) {
      return
    }

    setSaving(true)
    setErrorMessage('')

    const { error } = await supabase.from('notes').insert({
      content: trimmedContent,
    })

    if (error) {
      console.error(error)
      setErrorMessage(error.message)
      setSaving(false)
      return
    }

    setContent('')
    setSaving(false)
    // IMPROVE This works, although it performs another database request. Later, you could improve it by returning the inserted note and adding it directly to the state.
    await getNotes()
  }

  async function deleteNote(id: number) {
    setErrorMessage('')

    const { error } = await supabase.from('notes').delete().eq('id', id)

    if (error) {
      console.error(error)
      setErrorMessage(error.message)
      return
    }

    setNotes((currentNotes) => currentNotes.filter((note) => note.id !== id))
  }

  return (
    <section>
      <h1>Notepad</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="note-content">Note content</label>

        <textarea id="note-content" value={content} onChange={(event) => setContent(event.target.value)} required />

        <button type="submit" disabled={saving}>
          {saving ? 'Saving...' : 'Add note'}
        </button>
      </form>

      {errorMessage && <p role="alert">{errorMessage}</p>}

      <div id="notes-container">
        {loading ? (
          <p>Loading notes...</p>
        ) : notes.length === 0 ? (
          <p>No notes found.</p>
        ) : (
          notes.map((note) => (
            <article key={note.id}>
              <p>{note.content}</p>

              <small>{new Date(note.created_at).toLocaleString()}</small>

              <br />

              <button type="button" onClick={() => void deleteNote(note.id)}>
                Delete
              </button>

              <hr />
            </article>
          ))
        )}
      </div>
    </section>
  )
}

export default Notepad
