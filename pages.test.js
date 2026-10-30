// Checks your four pages' structure against the README: the parts each page needs, the Bootstrap components,
// labels a screen reader can read, and alt text. It doesn't judge how the pages look: check them at phone,
// tablet and desktop widths with Live Server for that.
// Run it with: npm test (run npm install once first). You don't need to change this file.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { existsSync, readFileSync } = require('node:fs');
const { JSDOM } = require('jsdom');

const PAGES = ['index.html', 'books.html', 'profile.html', 'change-password.html'];
const books = JSON.parse(readFileSync('books.json', 'utf8'));
const price = (book) => `$${book.price.toFixed(2)}`;

function open(file) {
  assert.ok(existsSync(file), `There's no ${file} yet. Start it from index.html, which has the navigation bar.`);
  return new JSDOM(readFileSync(file, 'utf8')).window.document;
}
const all = (doc, selector) => [...doc.querySelectorAll(selector)];
const text = (element) => element.textContent.replace(/\s+/g, ' ').trim();
const buyNow = (element) => all(element, 'a, button').some((b) => /buy now/i.test(text(b)));

// The control a label names, found by the words on the label (case doesn't matter).
function labeled(doc, file, words) {
  const label = all(doc, 'label').find((l) => words.test(text(l)));
  assert.ok(label, `${file}: add a <label> for the ${words.source.replace(/\\/g, '')} field.`);
  const control = label.htmlFor ? doc.getElementById(label.htmlFor) : label.querySelector('input, select, textarea');
  assert.ok(control, `${file}: the "${text(label)}" label's for="..." must match its field's id.`);
  return control;
}

for (const file of PAGES) {
  test(`${file}: a complete page with Bootstrap and the navigation bar`, () => {
    const doc = open(file);
    assert.match(readFileSync(file, 'utf8'), /^\s*<!DOCTYPE html>/i, `${file} starts with <!DOCTYPE html>.`);
    assert.ok(doc.documentElement.lang, `${file}: give <html> a lang attribute.`);
    assert.ok(doc.title.trim(), `${file}: give the page a <title>.`);
    assert.ok(all(doc, 'link[href*="bootstrap"]').length > 0, `${file}: load Bootstrap's stylesheet, as index.html does.`);
    const nav = doc.querySelector('nav.navbar');
    assert.ok(nav, `${file}: every page has the navigation bar.`);
    assert.match(text(nav.querySelector('.navbar-brand') ?? nav), /BookNook/, `${file}: the navigation bar shows the store's name.`);
    for (const page of PAGES) {
      assert.ok(nav.querySelector(`a[href="${page}"]`), `${file}: the navigation bar links to ${page}.`);
    }
    assert.ok(doc.querySelector('main'), `${file}: put the page's content in a <main>.`);
    for (const img of all(doc, 'img')) {
      assert.ok(img.getAttribute('alt')?.trim(), `${file}: ${img.getAttribute('src')} needs alt text that says what it shows.`);
    }
  });
}

test('index.html: a carousel with a slide for each book', () => {
  const doc = open('index.html');
  const slides = all(doc, '.carousel .carousel-item');
  assert.equal(slides.length, books.length, `Add a carousel (class "carousel") with a "carousel-item" for each of the ${books.length} books.`);
  for (const book of books) {
    const slide = slides.find((s) => text(s).includes(book.title));
    assert.ok(slide, `A slide shows "${book.title}".`);
    assert.ok(slide.querySelector('img'), `The "${book.title}" slide shows its cover.`);
    assert.ok(text(slide).includes(price(book)), `The "${book.title}" slide shows its price, ${price(book)}.`);
    assert.ok(text(slide).includes(book.description), `The "${book.title}" slide shows its description.`);
    assert.ok(buyNow(slide), `The "${book.title}" slide has a Buy Now button.`);
  }
});

test('books.html: a table with a row for each book, and a button group for paging', () => {
  const doc = open('books.html');
  const table = doc.querySelector('table');
  assert.ok(table, 'Add a table of the books.');
  assert.ok(all(table, 'th').length >= 4, 'Give the table a header row, with a <th> for each column.');
  for (const book of books) {
    const row = all(table, 'tr').find((r) => text(r).includes(book.title));
    assert.ok(row, `A row for "${book.title}".`);
    assert.ok(row.querySelector('img'), `The "${book.title}" row shows its cover.`);
    assert.ok(text(row).includes(price(book)) && text(row).includes(book.description), `The "${book.title}" row shows its price and description.`);
    assert.ok(buyNow(row), `The "${book.title}" row has a Buy Now button.`);
  }
  const group = doc.querySelector('.btn-group');
  assert.ok(group, 'Under the table, add a button group (class "btn-group") for paging.');
  const labels = all(group, 'a, button').map(text);
  assert.deepEqual(labels, ['Previous', '1', '2', 'Next'], 'The button group reads Previous, 1, 2, Next.');
});

test('profile.html: a form with a labeled field for each detail', () => {
  const doc = open('profile.html');
  assert.ok(doc.querySelector('form'), 'Add a <form>.');
  for (const words of [/first name/i, /last name/i, /street/i, /city/i, /zip/i]) labeled(doc, 'profile.html', words);
  assert.equal(labeled(doc, 'profile.html', /email/i).type, 'email', 'The email field is an <input type="email">.');
  assert.equal(labeled(doc, 'profile.html', /state/i).tagName, 'SELECT', 'The state is a drop-down list: a <select>.');
});

test('change-password.html: a form with three labeled password fields', () => {
  const doc = open('change-password.html');
  assert.ok(doc.querySelector('form'), 'Add a <form>.');
  const fields = all(doc, 'input[type="password"]');
  assert.equal(fields.length, 3, 'Three password fields: the current password, the new one, and the new one again.');
  for (const field of fields) {
    assert.ok(field.id && doc.querySelector(`label[for="${field.id}"]`), `Give each password field an id, and a <label for="..."> with it.`);
  }
});
