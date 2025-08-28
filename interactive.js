// Interactive Recommendation Systems Explorer - JavaScript

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    // Recommendation Systems Explorer initialized
    setupInteractiveFeatures();
    setupProgressTracking();
});

// Setup interactive features
function setupInteractiveFeatures() {
    // Enhanced matrix visualization for sparsity demo
    createSparsityMatrix();
    
    // Interactive rating prediction
    setupRatingPrediction();
    
    // Algorithm comparison
    setupAlgorithmComparison();
}

// Create interactive sparse matrix
function createSparsityMatrix() {
    const sparsityDemo = document.getElementById('sparsity-demo');
    if (!sparsityDemo) return;
    
    const container = document.createElement('div');
    container.innerHTML = `
        <div style="text-align: center; margin: 20px 0;">
            <div id="interactive-matrix" style="display: inline-grid; grid-template-columns: repeat(15, 1fr); gap: 2px; padding: 15px; background: var(--header-bg); border-radius: 8px; border: 1px solid var(--border); color: var(--text);">
                <!-- Matrix cells will be generated -->
            </div>
            <br>
            <button onclick="regenerateMatrix()" style="margin-top: 15px; background: var(--accent); color: white; border: 1px solid var(--border); padding: 10px 20px; border-radius: 10px; cursor: pointer;">
                🔄 Generate New Matrix
            </button>
        </div>
    `;
    
    sparsityDemo.appendChild(container);
    generateMatrixCells();
}

// Generate matrix cells
function generateMatrixCells() {
    const matrix = document.getElementById('interactive-matrix');
    if (!matrix) return;
    
    matrix.innerHTML = '';
    
    for (let i = 0; i < 150; i++) {
        const cell = document.createElement('div');
        cell.style.cssText = `
            width: 25px;
            height: 25px;
            border-radius: 3px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.7em;
            font-weight: bold;
            cursor: pointer;
            transition: transform 0.2s ease;
        `;
        
        // Simulate MovieLens sparsity (~6% density)
        if (Math.random() < 0.06) {
            const rating = Math.floor(Math.random() * 5) + 1;
            cell.textContent = rating;
            cell.style.background = getRatingColor(rating);
            cell.style.color = 'white';
            cell.title = `Rating: ${rating} stars`;
        } else {
            cell.style.background = 'var(--header-bg)';
            cell.style.border = '1px solid var(--border)';
            cell.title = 'No rating';
        }
        
        cell.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.3)';
        });
        
        cell.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        matrix.appendChild(cell);
    }
}

// Get color for rating
function getRatingColor(rating) {
    const colors = {
        1: '#ff6b6b',
        2: '#ffa726', 
        3: '#ffd93d',
        4: '#66bb6a',
        5: '#4ecdc4'
    };
    return colors[rating] || '#9e9e9e';
}

// Regenerate matrix (global function)
function regenerateMatrix() {
    const matrix = document.getElementById('interactive-matrix');
    if (!matrix) return;
    
    const cells = matrix.querySelectorAll('div');
    cells.forEach((cell, i) => {
        setTimeout(() => {
            cell.style.transform = 'scale(0)';
            setTimeout(() => {
                if (Math.random() < 0.06) {
                    const rating = Math.floor(Math.random() * 5) + 1;
                    cell.textContent = rating;
                    cell.style.background = getRatingColor(rating);
                    cell.style.color = 'white';
                    cell.title = `Rating: ${rating} stars`;
                } else {
                    cell.textContent = '';
                    cell.style.background = 'var(--header-bg)';
                    cell.style.border = '1px solid var(--border)';
                    cell.title = 'No rating';
                }
                cell.style.transform = 'scale(1)';
            }, 100);
        }, i * 5);
    });
}

// Setup rating prediction calculator
function setupRatingPrediction() {
    // Add interactive rating prediction after the static example
    const targetSection = document.querySelector('#collaborative-filtering');
    if (!targetSection) return;
    
    const calculator = document.createElement('div');
    calculator.className = 'visualization-container';
    calculator.innerHTML = `
        <h4>🧮 Interactive Rating Prediction</h4>
        <p>Adjust the values to see how the prediction changes:</p>
        <div id="prediction-controls" style="margin: 20px 0;">
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; margin: 15px 0;">
                <div style="text-align: center;">
                    <label>User 1 Rating:</label><br>
                    <input type="range" min="1" max="5" value="5" id="rating1" onchange="updatePrediction()">
                    <div>⭐ <span id="rating1-val">5</span></div>
                </div>
                <div style="text-align: center;">
                    <label>User 2 Rating:</label><br>
                    <input type="range" min="1" max="5" value="4" id="rating2" onchange="updatePrediction()">
                    <div>⭐ <span id="rating2-val">4</span></div>
                </div>
                <div style="text-align: center;">
                    <label>User 3 Rating:</label><br>
                    <input type="range" min="1" max="5" value="5" id="rating3" onchange="updatePrediction()">
                    <div>⭐ <span id="rating3-val">5</span></div>
                </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; margin: 15px 0;">
                <div style="text-align: center;">
                    <label>Similarity:</label><br>
                    <input type="range" min="0" max="1" step="0.1" value="0.8" id="sim1" onchange="updatePrediction()">
                    <div><span id="sim1-val">0.8</span></div>
                </div>
                <div style="text-align: center;">
                    <label>Similarity:</label><br>
                    <input type="range" min="0" max="1" step="0.1" value="0.7" id="sim2" onchange="updatePrediction()">
                    <div><span id="sim2-val">0.7</span></div>
                </div>
                <div style="text-align: center;">
                    <label>Similarity:</label><br>
                    <input type="range" min="0" max="1" step="0.1" value="0.6" id="sim3" onchange="updatePrediction()">
                    <div><span id="sim3-val">0.6</span></div>
                </div>
            </div>
        </div>
        <div id="prediction-result" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; text-align: center; margin: 15px 0;">
            <h3 style="margin: 0;">Predicted Rating: <span id="predicted-rating">4.67</span> ⭐</h3>
        </div>
    `;
    
    // Insert after the existing prediction content
    const insertPoint = targetSection.querySelector('.insight-box:last-of-type');
    if (insertPoint) {
        insertPoint.parentNode.insertBefore(calculator, insertPoint.nextSibling);
        updatePrediction(); // Initial calculation
    }
}

// Update prediction calculation (global function)
function updatePrediction() {
    let weightedSum = 0;
    let similaritySum = 0;
    
    for (let i = 1; i <= 3; i++) {
        const ratingSlider = document.getElementById(`rating${i}`);
        const simSlider = document.getElementById(`sim${i}`);
        const ratingDisplay = document.getElementById(`rating${i}-val`);
        const simDisplay = document.getElementById(`sim${i}-val`);
        
        if (ratingSlider && simSlider) {
            const rating = parseFloat(ratingSlider.value);
            const similarity = parseFloat(simSlider.value);
            
            // Update displays
            if (ratingDisplay) ratingDisplay.textContent = rating;
            if (simDisplay) simDisplay.textContent = similarity;
            
            weightedSum += similarity * rating;
            similaritySum += similarity;
        }
    }
    
    const prediction = similaritySum > 0 ? (weightedSum / similaritySum) : 0;
    const predictionElement = document.getElementById('predicted-rating');
    if (predictionElement) {
        predictionElement.textContent = prediction.toFixed(2);
    }
}

// Setup algorithm comparison
function setupAlgorithmComparison() {
    // Enhanced model comparison display
    const comparisonDiv = document.getElementById('model-comparison');
    if (comparisonDiv) {
        comparisonDiv.innerHTML = `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
                <div style="background: #e0e7ff; padding: 20px; border-radius: 15px; text-align: center; transition: transform 0.3s;">
                    <h5 style="color: #1e1b4b; margin-top: 0;">🥇 SVD</h5>
                    <div style="font-size: 1.5em; font-weight: bold; color: #4338ca;">0.6757</div>
                    <div style="color: #374151;">RMSE Score</div>
                    <div style="margin: 10px 0; color: #374151;">
                        <div>Speed: ⚡⚡⚡⚡⚡</div>
                        <div>Accuracy: ⭐⭐⭐⭐⭐</div>
                    </div>
                    <div style="font-size: 0.9em; color: #059669; font-weight: 600;">✨ Best Overall</div>
                </div>
                
                <div style="background: #d1fae5; padding: 20px; border-radius: 15px; text-align: center; transition: transform 0.3s;">
                    <h5 style="color: #064e3b; margin-top: 0;">🥈 EASE</h5>
                    <div style="font-size: 1.5em; font-weight: bold; color: #047857;">0.7234</div>
                    <div style="color: #374151;">RMSE Score</div>
                    <div style="margin: 10px 0; color: #374151;">
                        <div>Speed: ⚡⚡⚡⚡</div>
                        <div>Simplicity: ⭐⭐⭐⭐⭐</div>
                    </div>
                    <div style="font-size: 0.9em; color: #047857; font-weight: 600;">✨ Easiest to Implement</div>
                </div>
                
                <div style="background: #fef3c7; padding: 20px; border-radius: 15px; text-align: center; transition: transform 0.3s;">
                    <h5 style="color: #78350f; margin-top: 0;">🥉 KNN</h5>
                    <div style="font-size: 1.5em; font-weight: bold; color: #d97706;">0.8887</div>
                    <div style="color: #374151;">RMSE Score</div>
                    <div style="margin: 10px 0; color: #374151;">
                        <div>Speed: ⚡⚡</div>
                        <div>Interpretability: ⭐⭐⭐⭐⭐</div>
                    </div>
                    <div style="font-size: 0.9em; color: #d97706; font-weight: 600;">✨ Most Explainable</div>
                </div>
            </div>
        `;
        
        // Add hover effects
        comparisonDiv.querySelectorAll('div[style*="transition"]').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            });
        });
    }
}

// Progress tracking
function setupProgressTracking() {
    const totalSections = 6;
    let visitedSections = new Set(['introduction']);
    
    // Override the showSection function to track progress
    const originalShowSection = window.showSection;
    if (originalShowSection) {
        window.showSection = function(sectionId, pillEl) {
            visitedSections.add(sectionId);
            updateProgressBar(visitedSections.size, totalSections);
            originalShowSection(sectionId, pillEl);
        };
    }
    
    // Initial progress bar
    updateProgressBar(1, totalSections);
}

function updateProgressBar(visited, total) {
    let progressBar = document.getElementById('progress-bar');
    
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.id = 'progress-bar';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: rgba(255,255,255,0.2);
            z-index: 10000;
        `;
        
        const progressFill = document.createElement('div');
        progressFill.id = 'progress-fill';
        progressFill.style.cssText = `
            height: 100%;
            background: linear-gradient(90deg, #ff6b6b 0%, #4ecdc4 100%);
            transition: width 0.3s ease;
            width: 0%;
        `;
        
        progressBar.appendChild(progressFill);
        document.body.appendChild(progressBar);
    }
    
    const progressFill = document.getElementById('progress-fill');
    const percentage = (visited / total) * 100;
    
    if (progressFill) {
        progressFill.style.width = percentage + '%';
    }
}

// Make functions globally available
window.regenerateMatrix = regenerateMatrix;
window.updatePrediction = updatePrediction; 