import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { notesApi } from '../services/notesApi';

export const fetchNotes = createAsyncThunk(
  'notes/fetchNotes',
  async () => {
    const response = await notesApi.getAll();
    return response.data;
  }
);

export const fetchNoteById = createAsyncThunk(
  'notes/fetchNoteById',
  async (id) => {
    const response = await notesApi.getById(id);
    return response.data;
  }
);

export const createNote = createAsyncThunk(
  'notes/createNote',
  async (note) => {
    const response = await notesApi.create(note);
    return response.data;
  }
);

export const updateNote = createAsyncThunk(
  'notes/updateNote',
  async ({ id, note }) => {
    const response = await notesApi.update(id, note);
    return response.data;
  }
);

export const deleteNote = createAsyncThunk(
  'notes/deleteNote',
  async (id) => {
    await notesApi.delete(id);
    return id;
  }
);

const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: [],
    selectedNote: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedNote: (state) => {
      state.selectedNote = null;
    },
    setSelectedNote: (state, action) => {
      state.selectedNote = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all notes
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch note by ID
      .addCase(fetchNoteById.fulfilled, (state, action) => {
        state.selectedNote = action.payload;
      })
      // Create note
      .addCase(createNote.fulfilled, (state, action) => {
        state.notes.unshift(action.payload);
      })
      // Update note
      .addCase(updateNote.fulfilled, (state, action) => {
        const index = state.notes.findIndex(n => n.id === action.payload.id);
        if (index !== -1) {
          state.notes[index] = action.payload;
        }
        if (state.selectedNote?.id === action.payload.id) {
          state.selectedNote = action.payload;
        }
      })
      // Delete note
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter(n => n.id !== action.payload);
        if (state.selectedNote?.id === action.payload) {
          state.selectedNote = null;
        }
      });
  },
});

export const { clearSelectedNote, setSelectedNote } = notesSlice.actions;
export default notesSlice.reducer;

