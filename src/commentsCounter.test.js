import commentsCounter from './commentsCounter.js';

describe('commentsCounter', () => {
  test('displays correct comments count', () => {
    // Mock the necessary elements
    document.body.innerHTML = `
      <div>
        <h3 id="comments-header"></h3>
        <ul>
          <li class="list-items"></li>
          <li class="list-items"></li>
          <li class="list-items"></li>
        </ul>
      </div>
    `;

    // Call the commentsCounter function
    commentsCounter();

    // Get the updated comments count
    const commentsCount = document.getElementById('comments-header').innerText;

    // Verify that the comments count is displayed correctly
    expect(commentsCount).toBe('Comments (3)');
  });
});
