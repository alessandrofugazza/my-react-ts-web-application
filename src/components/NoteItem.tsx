import type { Note } from '../types/Note'

type NoteItemProps = {
  note: Note
  onDelete: (id: number) => Promise<void>
}

const NoteItem = ({ note, onDelete }: NoteItemProps) => {
  return (
    <article>
      <p>{note.content}</p>

      <small>{new Date(note.created_at).toLocaleString()}</small>

      <br />

      <button type="button" onClick={() => void onDelete(note.id)}>
        Delete
      </button>

      <hr />
    </article>
  )
}

export default NoteItem
