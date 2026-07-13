import { useEffect, useState, type SubmitEvent } from 'react'
import { supabase } from '../supabase'
import NoteItem from '../components/NoteItem'
import type { Note } from '../types/Note.ts'

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
          notes.map((note) => <NoteItem key={note.id} note={note} onDelete={deleteNote} />)
        )}
      </div>
    </section>
  )
}

export default Notepad
