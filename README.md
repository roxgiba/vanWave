# VanWave Web App

## Introduction

Welcome to the VanWave Web App! This project is designed to simplify the management of campervan bookings for your rental business.
The goal is to create a user-friendly dashboard that provides transparency, efficiency, and ease of use for station personnel.

## Setup

### Technologies Used

- Framework: Vue.js
- Styling: Tailwind CSS and CSS
- Hosting: Vercel / GitHub Pages
- API: Campervan Stations [mockAPI](https://605c94c36d85de00170da8b4.mockapi.io/stations)

## GitHub Repository

- [Github repository](https://github.com/roxgiba/vanWave)

## Components

### Autocomplete Component

- A reusable component for an autocomplete field.
- Queries a remote API while the user types to perform a search.
- Emits an event when a suggestion is selected.

### Week View Component

- Displays a calendar-like week view with responsive design.
- Shows a week with 7 tiles, one for each weekday.
- VCalendar allows pagination to switch between weeks.
- Includes a station selector using the Autocomplete component.
- Displays bookings for the selected station on each day-tile.
- Clicking on a booking opens a detailed view (Booking Detail View).

### Booking Detail Modal Component

- Displays detailed information about a selected booking.
- Retrieves booking information from the API.
- Shows customer name, booking start date, end date, duration, pickup-return station name.
- Provides an action to return to the calendar view.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
