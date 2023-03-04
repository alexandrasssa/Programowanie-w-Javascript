const form = document.querySelector('#form');
const input = document.querySelector('#input');
const output = document.querySelector('#output');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const inputValue = input.value;
  if (!inputValue) {
    output.textContent = 'Proszę wprowadzić tekst do tłumaczenia.';
    return;
  }
  try {
    const translation = await translateText(inputValue);
    output.textContent = translation;
  } catch (error) {
    output.textContent = 'Błąd tłumaczenia: ' + error.message;
  }
});

async function translateText(text) {
  const url = 'https://api.funtranslations.com/translate/yoda.json';
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  const data = await response.json();
  if (response.ok) {
    return data.contents.translated;
  } else {
    throw new Error(data.error.message);
  }
}