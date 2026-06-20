// Function to dynamically load course topics
async function loadTopic(topicId) {
    const contentArea = document.getElementById('content-area');
    
    // Show a loading state
    contentArea.innerHTML = `<h2 style="color: #8fa0c4;">Loading...</h2>`;

    try {
        const response = await fetch(`${topicId}/index.html`);
        
        if (!response.ok) throw new Error("Could not find file");
        
        const html = await response.text();
        contentArea.innerHTML = html;

        // Re-render MathJax equations after loading new content
        if (window.MathJax) {
            MathJax.typesetPromise([contentArea]).catch((err) => console.log(err));
        }
    } catch (error) {
        contentArea.innerHTML = `
            <h2>Error 404</h2>
            <p>Topic <strong>${topicId}</strong> not found. Ensure the folder exists.</p>
        `;
    }
}

// --- Validation Logic ---

function check(input, key) {
    if (parseFloat(input.value) == parseFloat(key))
        input.classList.add("correct");
    else
        input.classList.remove("correct");
}

function check_tol(input, key) {
    let least_significant_digit = get_lsf(key);
    let lo = key - least_significant_digit;
    let hi = key + least_significant_digit;
    
    if (lo <= parseFloat(input.value) && parseFloat(input.value) <= hi)
        input.classList.add("correct");
    else
        input.classList.remove("correct");
}

function get_lsf(key) {
    let string_key = String(key);
    let decimal_index = string_key.indexOf(".");
    if (decimal_index === -1)
        return 1;
    let decimal_places = string_key.length - decimal_index - 1;
    return Math.pow(10, -decimal_places);
}
