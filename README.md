A project to demonstrate various CSS methodologies. Created with the Next.js framework with deployment on Vercel.

Current build: [CSS Methidologies](https://css-meth.vercel.app/)

## Features

- The application consists of server-side (SSR) and client-side components. The server-side is responsible for fetching initial data, after which it triggers the rendering of the client-side, passing data as props.

- Complex interactive web component implemented - a database viewer with tabs, list, quick search, and an advanced filter in a separate modal window.

- Part of the data for rendering the component is not hardcoded but dynamically parsed from the provided dataset (for the purpose of simplification and greater clarity, no real DB or JSON is used, the data is provided simply as a js-file).

- Methodology descriptions are fetched from the project repository on Github.

- The Zustand library is used for application state management - a more modern, convenient, and advanced alternative to React Context.

- A very simple custom markup language a la Markdown is used in the description to indicate sections and code inserts.

- A simple parser is written to process descriptions and render them into React components.

- The page describing each methodology is styled according to that particular methodology.

- However, for code reuse, the same exact component is used, and styles are dynamically overloaded through different className lists.

- The highlight.js library is used for syntax highlighting in code inserts.