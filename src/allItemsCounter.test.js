import displayCountAll from './allItemsCounter.js';

describe('Should show the correct amount of TVShow elements displayed in Home Page', () => {
  test('Should return 0, when no elements load in DOM', () => {
    document.body.innerHTML = `
      <div class="main_content_container">
     
      </div>
      <p id="all_elements_counter">(0)</p>
      
    `;
    displayCountAll();
    const counter = document.getElementById('all_elements_counter');
    expect(counter.textContent).toBe('(0)');
  });
});

describe('Should displayed 1 element detected in DOM', () => {
  test('Should return 1, when 1 element is created in the DOM', () => {
    document.body.innerHTML = `
      <div class="main_content_container">
       <div class="show_container"></div>
      </div>
      <p id="all_elements_counter">(1)</p>
      
    `;
    displayCountAll();
    const counter = document.getElementById('all_elements_counter');
    expect(counter.textContent).toBe('(1)');
  });
});

describe('Should return 4 elements as found in the DOM', () => {
  test('Should return 4, when elements have been load into the DOM', () => {
    document.body.innerHTML = `
      <div class="main_content_container">
        <div class="show_container"></div>
        <div class="show_container"></div>
        <div class="show_container"></div>
        <div class="show_container"></div>     
      </div>
      <p id="all_elements_counter">(4)</p>
      
    `;
    displayCountAll();
    const counter = document.getElementById('all_elements_counter');
    expect(counter.textContent).toBe('(4)');
  });
});
