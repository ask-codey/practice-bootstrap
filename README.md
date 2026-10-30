# Exercise: Bootstrap

Exercise files for the lesson **Exercise: Bootstrap** in the C# Full-Stack Bootcamp on [ask-codey.com](https://www.ask-codey.com).

You'll build a four-page website for **BookNook**, an online bookstore, with Bootstrap 5.

## What's here

- `index.html`: the home page, with Bootstrap and a navigation bar already set up. Use it as the start of every page.
- `styles.css`: for your own styles, which load after Bootstrap's.
- `books.json`: the four books the store sells, with their titles, prices, descriptions and covers.
- `images`: the four book covers.
- `pages.test.js` and `package.json`: tests that check your pages' structure. You don't need to change these.

## The pages

Every page has the navigation bar, with the store's name and links to all four pages.

1. **Home** (`index.html`): a carousel that rotates through the four books. Each slide shows the cover, the title, the price, the description and a **Buy Now** button.
2. **Books** (`books.html`): a table with a row per book: the cover, title, price, description and a **Buy Now** button. Under the table, a button group for paging through pages of books (Previous, 1, 2, Next). It doesn't need to work yet.
3. **Profile** (`profile.html`): a form to change your details: first name, last name, email address, street address, city, state (a drop-down list) and ZIP code.
4. **Change Password** (`change-password.html`): a form with the current password, the new password, and the new password again.

## Rules

- Use semantic HTML, and a valid page skeleton on every page.
- Style with Bootstrap's classes first; add your own CSS in `styles.css` only where you need it.
- Every picture has an `alt` text.
- Check each page at phone, tablet and desktop widths: make your browser narrower and wider, or use the device toolbar in the developer tools (**F12**, then **Ctrl+Shift+M**).

## Check your work

`pages.test.js` reads your four pages and checks their structure against this README: the skeleton, Bootstrap and the navigation bar on every page, the carousel, the table and its button group, the forms' labeled fields, and alt text. It doesn't judge how the pages look: check them at each width for that. It needs Node.js, which you installed in the first week. Open a terminal in this folder and run:

```bash
npm install
npm test
```

Run `npm install` once; after that, `npm test` is enough. At first most tests fail: that is expected (`index.html` already has its skeleton and navigation bar, so that one passes). Each part you add turns its test green, and a failing test's message says what's missing.

## Viewing your pages

Open the folder in VS Code, right-click `index.html`, and choose **Open with Live Server**.

## Hand it in

When it works, push your solution to a public repo of your own on GitHub, then paste that repo's address into **Submit your exercise** on the lesson page at [ask-codey.com](https://www.ask-codey.com). That's what completes the lesson. The lesson page shows the Git commands, step by step.
