import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Project {
  id: string;
  title: string;
  description: string;
  status?: 'active' | 'completed' | 'pending';
  farmerId?: string;
}

interface ProjectsState {
  items: Project[];
  currentProject: Project | null;
}

const initialState: ProjectsState = {
  items: [],
  currentProject: null,
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.items = action.payload;
    },
    setCurrentProject: (state, action: PayloadAction<Project>) => {
      state.currentProject = action.payload;
    },
    addProject: (state, action: PayloadAction<Project>) => {
      state.items.push(action.payload);
    },
  },
});

export const { setProjects, setCurrentProject, addProject } = projectsSlice.actions;
export default projectsSlice.reducer;
