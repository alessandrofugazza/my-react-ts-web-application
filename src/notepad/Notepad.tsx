import { supabase } from '../supabase'

function Notepad() {
  return (
    <>
      <section>
        <h1>Scratchpad</h1>
        <p>These are my scratchpad notes.</p>
      </section>
      <hr />
      <section>
        <h2>New Note</h2>
        <form id="note-form">
          <div>
            <label htmlFor="note-content">Note Content</label>
            <br />
            <textarea
              id="note-content"
              name="note-content"
              placeholder="Write your note here..."
              rows={10}
              cols={30}
              autoFocus
              required
            ></textarea>
            <hr />
            <section>
              <h2>Previous Notes</h2>
              <div id="notes-container"></div>
            </section>
            <hr />
            <div>
              <div>
                <a href="../index.html" className="btn btn-primary">
                  Back to Index
                </a>
              </div>
            </div>
          </div>
          <div>
            <button type="submit">Add Note</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Notepad
