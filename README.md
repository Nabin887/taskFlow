# TaskFlow – Personal Task Manager

## Description

TaskFlow is a browser based dashboard for planning and managing personal tasks. Create tasks, organize them by category and priority, track daily progress, and keep your task list available after refreshing the page.

## Features

- Add tasks with a title, description, category, and priority.
- Mark tasks complete and reopen them later.
- Edit tasks and confirm before deleting them.
- Combine status and category filters, and search titles or descriptions.
- View live totals for all, active, completed, and high priority tasks.
- Track completion with a daily progress bar.
- Save tasks and the selected light or dark theme in browser localStorage.
- Save a simple name and email profile locally to personalize the workspace.
- Upload a profile photo and track work progress, earned points, and level.
- Set work days and hours with optional browser notifications for a daily start reminder.
- Start with sample tasks on first use, with helpful empty states afterward.
- Responsive layout for desktop, tablet, and mobile screens.

## Technologies

- React
- JavaScript
- HTML/JSX
- CSS
- localStorage
- Vite development server

## React Concepts Used

- Reusable functional components and props
- `useState` for tasks, form values, filters, search, theme, and modal state
- `useEffect` for saving task/theme changes and modal keyboard handling
- Event handling and controlled forms
- Conditional rendering for empty states and modals
- List rendering with `.map()` and unique task IDs
- `useMemo` for derived statistics and filtered task lists

## Installation

```bash
npm install
npm run dev
```

Open the local URL printed by Vite in your browser.

## Project Structure

```text
src/
├── components/
│   ├── ConfirmModal.jsx
│   ├── EditTaskModal.jsx
│   ├── EmptyState.jsx
│   ├── FilterBar.jsx
│   ├── Header.jsx
│   ├── ProgressBar.jsx
│   ├── Stats.jsx
│   ├── TaskCard.jsx
│   ├── TaskForm.jsx
│   └── TaskList.jsx
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

`App.jsx` owns the task data and connects callbacks to the smaller UI components. The components folder contains the signup screen, profile panel, work schedule, reusable task form, filters, cards, progress/stats display, and dialogs.

## Screenshots

Add project screenshots in a `screenshots/` folder and link them here, for example:

```md
TaskFlow dashboard]
<img width="1917" height="857" alt="image" src="https://github.com/user-attachments/assets/db00b877-9a18-48ed-917a-8a73b120fc04" />

![TaskFlow mobile layout]<img width="352" height="752" alt="image" src="https://github.com/user-attachments/assets/6c553fe2-6422-4c09-8326-d924f295e912" />

```

## Known Limitations

TaskFlow stores data in the current browser's localStorage. It has no backend or database, so tasks are not shared or synchronized across browsers or devices. Work reminders use browser notifications and require the app to be open in a supported browser with notifications allowed.
