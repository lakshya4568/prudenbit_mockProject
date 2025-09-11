AI Agent Instructions: Next.js Data Application
1. Project Objective
Your primary goal is to develop a complete, single-page web application using the Next.js App Router. The application will display a large dataset (data.json) and must include features for dynamic searching, filtering, sorting, and pagination. The final output must be a high-quality, performant, and well-structured application ready for submission.

2. Core Technologies
You must use the following technology stack:

Framework: Next.js (with App Router)

Language: TypeScript

Styling: TailwindCSS

UI Components (Optional but Recommended): shadcn/ui

Constraint: Do not use external libraries for core data table functionality (search, sort, filter, pagination). Implement these from scratch.

3. Design Specification & Figma Mental Model (MCP)
The user interface must be a close replica of the provided Figma design.

Figma Design Link: Test Design

Mental Model, Concepts, and Principles (MCP)
Mental Model: The user is an operator who needs to navigate a large dataset efficiently. They expect the interface to be fast, intuitive, and responsive to their actions. The core loop is: View Data -> Search/Filter -> Find Information -> View Details.

Concepts:

Dual Data Views: The application presents data in two distinct formats:

Card View: A grid-based layout that provides a visual overview of each data entry.

Row View: A table-like, compact layout that is better for scanning and comparing multiple entries.

Requirement: You must implement at least one of these views. Implementing both with a toggle is a bonus.

Dynamic Data Interaction: The dataset is not static. The user can manipulate the view through:

Search: A text input to perform a global search across the data.

Filtering: Controls (like dropdowns) to narrow down the dataset based on specific field values (e.g., by status, by type).

Sorting: Controls to reorder the data based on specific fields (e.g., sort by name, sort by date).

Pagination: The data is too large to load at once. The user will navigate through it in pages or by scrolling.

State Awareness: The UI must clearly communicate its current state to the user (e.g., loading data, an error occurred, no results found).

Principles:

High-Fidelity UI: Adhere strictly to the Figma design's layout, spacing, typography, and color scheme.

Performance First: Interactions should feel instant. API calls and UI updates must be optimized. Debouncing search input is a key performance enhancement.

Clarity and Feedback: Never leave the user guessing. Use visual indicators for loading, and display clear, user-friendly messages for errors or empty states.

Clean Code Architecture: The codebase must be modular, readable, maintainable, and strictly typed with TypeScript.

4. Functional Requirements Breakdown
Phase 1: Local API Endpoint (Next.js Route Handler)
Create a local API endpoint to serve the data.

File Location: app/api/data/route.ts

Data Source: Use the provided data.json file (1,000 objects).

Functionality: The GET handler must:

Read and parse the data.json file.

Implement Pagination: Accept limit and page (or offset) as URL query parameters (e.g., /api/data?limit=10&page=2).

Implement Search: Accept a query parameter to filter results based on a text search.

Implement Filtering: Accept parameters for filtering by at least two different fields from the dataset.

Implement Sorting: Accept sortBy and order (asc/desc) parameters to sort the data.

The handler must apply filtering and sorting before applying pagination to ensure correctness.

Phase 2: Frontend Implementation (React Components)
Build the user interface and connect it to the API.

Architecture:

Use Server Components (app/page.tsx) for the initial page load and static layout.

Use Client Components ("use client";) for any interactive parts of the UI (e.g., a component that manages the state for search, filters, and the data display).

Data Fetching & State Management:

Use useState to manage the application's state: the fetched data, loading status, error messages, current page, search query, and active filters/sort order.

Use useEffect to trigger API calls when any state dependency (like page or searchQuery) changes.

Component Implementation:

Data Display Component: Create a component for the Card or Row view. This component will receive data via props and render it.

Search Bar: An input field that updates the searchQuery state.

Filter Controls: UI elements (e.g., <select>) that update the filter state.

Sort Controls: UI elements that update the sort state.

Pagination Controls: "Next" and "Previous" buttons that update the page state.

UI States: Implement visual feedback for:

Loading State: Show skeletons or a spinner while data is being fetched.

Error State: Display a user-friendly error message if the API call fails.

Empty State: Display a message when no results match the current search/filter criteria.

5. Bonus Objectives (For Excellence)
Implement both the Card and Row views, allowing the user to toggle between them.

Make the design fully responsive for mobile and tablet devices.

Implement a debounced search function to prevent excessive API calls while the user is typing.

Implement comprehensive and graceful error handling for both the client and server.

6. Final Deliverables
GitHub Repository: A link to the complete source code. The repository must have a professional Git history with meaningful commit messages.

Live Deployment: A URL to the live, working application deployed on a platform like Vercel or Netlify.

README.md: A detailed README.md file that includes:

Clear, step-by-step setup instructions.

A brief explanation of key architectural decisions.