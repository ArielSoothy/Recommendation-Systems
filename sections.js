// Additional sections for the recommendation systems website
const additionalSections = `
        <!-- DATA EXPLORATION SECTION -->
        <div id="data-exploration" class="section">
            <!-- MovieLens Dataset Introduction -->
            <div class="notebook-cell">
                <div class="cell-header" onclick="toggleCell(this)">
                    <span><span class="question-number">3</span>MovieLens Dataset - Our Learning Playground</span>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="cell-content">
                    <h3>🎬 Welcome to MovieLens!</h3>
                    <p>We'll be working with the famous MovieLens 100K dataset - 100,000 movie ratings from real users. This dataset is perfect for learning because it's large enough to be realistic but small enough to process quickly on your computer!</p>
                    
                    <div class="code-block">
                        <div class="code-header">
                            <span><i class="fas fa-code"></i> Loading the Dataset</span>
                            <div>
                                <span class="code-language">Python</span>
                                <button class="copy-button" onclick="copyCode(this)">
                                    <i class="fas fa-copy"></i> Copy
                                </button>
                            </div>
                        </div>
                        <div class="code-content">
                            <pre><code><span class="comment"># Import the Surprise library for recommendation systems</span>
<span class="keyword">from</span> <span class="variable">surprise</span> <span class="keyword">import</span> <span class="variable">Dataset</span>
<span class="keyword">import</span> <span class="variable">pandas</span> <span class="keyword">as</span> <span class="variable">pd</span>

<span class="comment"># Load the MovieLens 100k dataset</span>
<span class="variable">data</span> = <span class="variable">Dataset</span>.<span class="function">load_builtin</span>(<span class="string">'ml-100k'</span>)
<span class="function">print</span>(<span class="string">"✅ MovieLens 100k dataset loaded successfully!"</span>)
<span class="function">print</span>(<span class="string">f"📊 Dataset contains {len(data.raw_ratings):,} ratings"</span>)</code></pre>
                        </div>
                    </div>

                    <div class="result-box">
                        <h4>📊 Dataset Overview:</h4>
                        <div class="metric-grid">
                            <div class="metric-card">
                                <h3>100,000</h3>
                                <p>Total Ratings</p>
                            </div>
                            <div class="metric-card">
                                <h3>943</h3>
                                <p>Unique Users</p>
                            </div>
                            <div class="metric-card">
                                <h3>1,682</h3>
                                <p>Unique Movies</p>
                            </div>
                            <div class="metric-card">
                                <h3>1-5</h3>
                                <p>Rating Scale</p>
                            </div>
                        </div>
                    </div>

                    <div class="term-definition">
                        <h5>What's in a Rating?</h5>
                        <p>Each rating consists of: (user_id, movie_id, rating, timestamp). For example: User 196 gave Movie 242 a rating of 3 stars on 881250949 (Unix timestamp).</p>
                    </div>
                </div>
            </div>

            <!-- The Sparsity Problem -->
            <div class="notebook-cell">
                <div class="cell-header" onclick="toggleCell(this)">
                    <span><span class="question-number">4</span>The Sparsity Problem - Why Recommendations are Hard</span>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="cell-content">
                    <h3>🕳️ The Challenge: Most Data is Missing!</h3>
                    <p>Here's the fundamental challenge in recommendation systems: users only rate a tiny fraction of available items. Let's visualize this problem!</p>
                    
                    <div class="visualization-container">
                        <h4>🎯 Interactive Sparsity Visualization</h4>
                        <p>Each cell represents a user-movie combination. <span style="background: #4ecdc4; color: white; padding: 2px 6px; border-radius: 3px;">Blue = Rated</span>, <span style="background: #f8f9fa; color: #666; padding: 2px 6px; border-radius: 3px; border: 1px solid #ddd;">Empty = Not Rated</span></p>
                        
                        <div id="sparsity-matrix" class="interactive-matrix" style="grid-template-columns: repeat(20, 1fr); max-width: 600px; margin: 20px auto;">
                            <!-- Matrix will be generated by JavaScript -->
                        </div>
                        
                        <button onclick="generateSparsityMatrix()" style="background: #667eea; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin: 10px;">
                            🔄 Generate New Sample
                        </button>
                    </div>

                    <div class="result-box">
                        <h4>📈 Sparsity Statistics:</h4>
                        <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 15px; margin: 10px 0;">
                            <p><strong>Total Possible Ratings:</strong> 943 users × 1,682 movies = 1,586,126 possible ratings</p>
                            <p><strong>Actual Ratings:</strong> 100,000 ratings</p>
                            <p><strong>Sparsity:</strong> 93.7% of the data is missing!</p>
                        </div>
                    </div>

                    <div class="term-definition">
                        <h5>Sparsity</h5>
                        <p>The percentage of missing data in a user-item matrix. High sparsity (like 93.7%) means most users haven't rated most items, making it challenging to find patterns and similarities.</p>
                    </div>

                    <div class="insight-box">
                        <h4>🤔 Why This Matters</h4>
                        <p>• <strong>Cold Start Problem:</strong> Hard to recommend to new users or new items<br>
                        • <strong>Limited Data:</strong> Few ratings per user makes finding similar users difficult<br>
                        • <strong>Algorithm Challenge:</strong> Our algorithms must work well with mostly empty data</p>
                    </div>
                </div>
            </div>

            <!-- Memory Efficiency -->
            <div class="notebook-cell">
                <div class="cell-header" onclick="toggleCell(this)">
                    <span><span class="question-number">5</span>Smart Storage - Sparse Matrices to the Rescue!</span>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="cell-content">
                    <h3>💾 Efficient Data Storage</h3>
                    <p>Since 93.7% of our data is zeros, storing a full matrix would waste enormous amounts of memory. That's where sparse matrices come in!</p>
                    
                    <div class="visualization-container">
                        <h4>🔄 Dense vs Sparse Matrix Comparison</h4>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
                            <div style="border: 2px solid #ff6b6b; border-radius: 10px; padding: 15px;">
                                <h5 style="color: #ff6b6b; margin-top: 0;">❌ Dense Matrix (Inefficient)</h5>
                                <p>Stores ALL values, including zeros</p>
                                <div style="font-family: monospace; background: #fff5f5; padding: 10px; border-radius: 5px; font-size: 0.8em;">
                                    [3, 0, 0, 4, 0]<br>
                                    [0, 0, 5, 0, 0]<br>
                                    [2, 0, 0, 0, 3]<br>
                                    [0, 1, 0, 0, 0]
                                </div>
                                <p style="color: #dc2626; font-weight: bold;">Memory: 12.10 MB</p>
                            </div>
                            
                            <div style="border: 2px solid #4ecdc4; border-radius: 10px; padding: 15px;">
                                <h5 style="color: #4ecdc4; margin-top: 0;">✅ Sparse Matrix (Efficient)</h5>
                                <p>Only stores non-zero values</p>
                                <div style="font-family: monospace; background: #f0fdfa; padding: 10px; border-radius: 5px; font-size: 0.8em;">
                                    (0,0):3, (0,3):4<br>
                                    (1,2):5<br>
                                    (2,0):2, (2,4):3<br>
                                    (3,1):1
                                </div>
                                <p style="color: #059669; font-weight: bold;">Memory: 1.15 MB</p>
                            </div>
                        </div>
                    </div>

                    <div class="result-box">
                        <h4>💰 Memory Savings</h4>
                        <p style="font-size: 1.2em; text-align: center; margin: 15px 0;">
                            <strong>90.51% Memory Reduction!</strong>
                        </p>
                        <p>This means we can work with much larger datasets and process them faster on regular computers!</p>
                    </div>

                    <div class="code-block">
                        <div class="code-header">
                            <span><i class="fas fa-code"></i> Creating Sparse Matrix</span>
                            <div>
                                <span class="code-language">Python</span>
                                <button class="copy-button" onclick="copyCode(this)">
                                    <i class="fas fa-copy"></i> Copy
                                </button>
                            </div>
                        </div>
                        <div class="code-content">
                            <pre><code><span class="keyword">from</span> <span class="variable">scipy.sparse</span> <span class="keyword">import</span> <span class="variable">csr_matrix</span>
<span class="keyword">import</span> <span class="variable">numpy</span> <span class="keyword">as</span> <span class="variable">np</span>

<span class="comment"># Create user-item interaction matrix (sparse format)</span>
<span class="variable">row_indices</span> = []
<span class="variable">col_indices</span> = []
<span class="variable">ratings</span> = []

<span class="comment"># Collect all user-item-rating triplets</span>
<span class="keyword">for</span> (<span class="variable">u</span>, <span class="variable">i</span>, <span class="variable">rating</span>) <span class="keyword">in</span> <span class="variable">trainset</span>.<span class="function">all_ratings</span>():
    <span class="variable">row_indices</span>.<span class="function">append</span>(<span class="variable">u</span>)
    <span class="variable">col_indices</span>.<span class="function">append</span>(<span class="variable">i</span>)
    <span class="variable">ratings</span>.<span class="function">append</span>(<span class="variable">rating</span>)

<span class="comment"># Create sparse matrix</span>
<span class="variable">interaction_matrix</span> = <span class="function">csr_matrix</span>((<span class="variable">ratings</span>, (<span class="variable">row_indices</span>, <span class="variable">col_indices</span>)), 
                               <span class="variable">shape</span>=(<span class="variable">n_users</span>, <span class="variable">n_items</span>))

<span class="function">print</span>(<span class="string">f"Matrix shape: {interaction_matrix.shape}"</span>)
<span class="function">print</span>(<span class="string">f"Sparsity: {(1 - interaction_matrix.nnz / (n_users * n_items)) * 100:.2f}%"</span>)</code></pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- COLLABORATIVE FILTERING SECTION -->
        <div id="collaborative-filtering" class="section">
            <!-- Collaborative Filtering Basics -->
            <div class="notebook-cell">
                <div class="cell-header" onclick="toggleCell(this)">
                    <span><span class="question-number">6</span>Collaborative Filtering - The Heart of Recommendations</span>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="cell-content">
                    <h3>👥 How Collaborative Filtering Works</h3>
                    <p>Collaborative filtering is based on a simple but powerful idea: <strong>"People who agreed in the past will agree in the future."</strong> If you and I both love the same movies, and I love a movie you haven't seen, you'll probably love it too!</p>
                    
                    <div class="visualization-container">
                        <h4>🎯 Interactive Demo: Find Your Movie Twin!</h4>
                        <p>Let's see how collaborative filtering finds similar users. Click on different users to see their movie preferences:</p>
                        
                        <div id="collaborative-demo" style="margin: 20px 0;">
                            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 20px;">
                                <div class="user-profile" onclick="selectUser(1)" style="border: 2px solid #667eea; border-radius: 10px; padding: 15px; cursor: pointer; transition: all 0.3s;">
                                    <h5 style="margin: 0 0 10px 0; color: #667eea;">👤 User A (You)</h5>
                                    <div class="movie-ratings">
                                        <div>🎬 Titanic: ⭐⭐⭐⭐⭐</div>
                                        <div>🦸 Batman: ⭐⭐⭐⭐</div>
                                        <div>🚀 Star Wars: ⭐⭐⭐⭐⭐</div>
                                        <div>👑 Lion King: ⭐⭐⭐</div>
                                    </div>
                                </div>
                                
                                <div class="user-profile" onclick="selectUser(2)" style="border: 2px solid #4ecdc4; border-radius: 10px; padding: 15px; cursor: pointer; transition: all 0.3s;">
                                    <h5 style="margin: 0 0 10px 0; color: #4ecdc4;">👤 User B</h5>
                                    <div class="movie-ratings">
                                        <div>🎬 Titanic: ⭐⭐⭐⭐⭐</div>
                                        <div>🦸 Batman: ⭐⭐⭐⭐</div>
                                        <div>🚀 Star Wars: ⭐⭐⭐⭐⭐</div>
                                        <div>🤖 Terminator: ⭐⭐⭐⭐</div>
                                    </div>
                                </div>
                                
                                <div class="user-profile" onclick="selectUser(3)" style="border: 2px solid #ff6b6b; border-radius: 10px; padding: 15px; cursor: pointer; transition: all 0.3s;">
                                    <h5 style="margin: 0 0 10px 0; color: #ff6b6b;">👤 User C</h5>
                                    <div class="movie-ratings">
                                        <div>💕 Romance Movie: ⭐⭐⭐⭐⭐</div>
                                        <div>😂 Comedy: ⭐⭐⭐⭐</div>
                                        <div>🎭 Drama: ⭐⭐⭐⭐⭐</div>
                                        <div>🦸 Batman: ⭐⭐</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div id="similarity-result" style="background: #f8f9fa; padding: 15px; border-radius: 8px; text-align: center;">
                                <p><strong>Click on User B or C to see similarity analysis!</strong></p>
                            </div>
                        </div>
                    </div>

                    <div class="term-definition">
                        <h5>User-Based vs Item-Based Collaborative Filtering</h5>
                        <p><strong>User-Based:</strong> Find users similar to you and recommend what they liked.<br>
                        <strong>Item-Based:</strong> Find items similar to what you liked and recommend those.</p>
                    </div>

                    <div class="insight-box">
                        <h4>🎯 The Magic Formula</h4>
                        <p>Collaborative filtering uses <strong>similarity metrics</strong> (like cosine similarity or Pearson correlation) to measure how alike two users or items are. The more similar, the more likely you'll like their recommendations!</p>
                    </div>
                </div>
            </div>

            <!-- Rating Prediction -->
            <div class="notebook-cell">
                <div class="cell-header" onclick="toggleCell(this)">
                    <span><span class="question-number">7</span>Predicting Ratings - The Math Behind the Magic</span>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="cell-content">
                    <h3>🔮 How Do We Predict Your Rating?</h3>
                    <p>Once we find similar users or items, we need to predict what rating you'd give to an item you haven't seen. Here's how the math works (don't worry, it's intuitive!):</p>
                    
                    <div class="visualization-container">
                        <h4>📊 Interactive Rating Prediction</h4>
                        <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
                            <h5 style="margin-top: 0;">🎬 Predicting Your Rating for "Avatar"</h5>
                            
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 15px 0;">
                                <div>
                                    <h6>Similar Users' Ratings:</h6>
                                    <div id="similar-users-ratings">
                                        <div style="margin: 5px 0;">👤 Similar User 1: ⭐⭐⭐⭐⭐ (Similarity: 0.8)</div>
                                        <div style="margin: 5px 0;">👤 Similar User 2: ⭐⭐⭐⭐ (Similarity: 0.7)</div>
                                        <div style="margin: 5px 0;">👤 Similar User 3: ⭐⭐⭐⭐⭐ (Similarity: 0.6)</div>
                                    </div>
                                </div>
                                
                                <div>
                                    <h6>Weighted Average Calculation:</h6>
                                    <div style="font-family: monospace; background: white; padding: 10px; border-radius: 5px; font-size: 0.9em;">
                                        <div>5 × 0.8 = 4.0</div>
                                        <div>4 × 0.7 = 2.8</div>
                                        <div>5 × 0.6 = 3.0</div>
                                        <div style="border-top: 1px solid #ddd; margin: 5px 0; padding-top: 5px;">
                                            Sum = 9.8<br>
                                            Total Similarity = 2.1<br>
                                            <strong>Predicted Rating = 9.8/2.1 = 4.67 ⭐</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div style="background: linear-gradient(90deg, #4ecdc4, #44a08d); color: white; padding: 15px; border-radius: 8px; text-align: center; margin: 15px 0;">
                                <strong>🎯 Prediction: You'll rate Avatar 4.67/5 stars!</strong>
                            </div>
                        </div>
                    </div>

                    <div class="code-block">
                        <div class="code-header">
                            <span><i class="fas fa-code"></i> Rating Prediction Formula</span>
                            <div>
                                <span class="code-language">Python</span>
                                <button class="copy-button" onclick="copyCode(this)">
                                    <i class="fas fa-copy"></i> Copy
                                </button>
                            </div>
                        </div>
                        <div class="code-content">
                            <pre><code><span class="keyword">def</span> <span class="function">predict_rating</span>(<span class="variable">user_similarities</span>, <span class="variable">item_ratings</span>):
    <span class="string">"""
    Predict rating using weighted average of similar users
    """</span>
    <span class="variable">weighted_sum</span> = <span class="number">0</span>
    <span class="variable">similarity_sum</span> = <span class="number">0</span>
    
    <span class="keyword">for</span> <span class="variable">similar_user</span>, <span class="variable">similarity</span> <span class="keyword">in</span> <span class="variable">user_similarities</span>.<span class="function">items</span>():
        <span class="keyword">if</span> <span class="variable">similar_user</span> <span class="keyword">in</span> <span class="variable">item_ratings</span>:
            <span class="variable">rating</span> = <span class="variable">item_ratings</span>[<span class="variable">similar_user</span>]
            <span class="variable">weighted_sum</span> += <span class="variable">similarity</span> * <span class="variable">rating</span>
            <span class="variable">similarity_sum</span> += <span class="variable">similarity</span>
    
    <span class="keyword">if</span> <span class="variable">similarity_sum</span> == <span class="number">0</span>:
        <span class="keyword">return</span> <span class="number">0</span>  <span class="comment"># No similar users found</span>
    
    <span class="keyword">return</span> <span class="variable">weighted_sum</span> / <span class="variable">similarity_sum</span>

<span class="comment"># Example usage</span>
<span class="variable">similarities</span> = {<span class="string">'user1'</span>: <span class="number">0.8</span>, <span class="string">'user2'</span>: <span class="number">0.7</span>, <span class="string">'user3'</span>: <span class="number">0.6</span>}
<span class="variable">ratings</span> = {<span class="string">'user1'</span>: <span class="number">5</span>, <span class="string">'user2'</span>: <span class="number">4</span>, <span class="string">'user3'</span>: <span class="number">5</span>}
<span class="variable">predicted</span> = <span class="function">predict_rating</span>(<span class="variable">similarities</span>, <span class="variable">ratings</span>)
<span class="function">print</span>(<span class="string">f"Predicted rating: {predicted:.2f}"</span>)</code></pre>
                        </div>
                    </div>

                    <div class="insight-box">
                        <h4>🧠 Key Insights</h4>
                        <p>• <strong>Weighted Average:</strong> Users with higher similarity have more influence<br>
                        • <strong>Cold Start Challenge:</strong> New users with no ratings are hard to match<br>
                        • <strong>Scalability:</strong> Computing similarities for millions of users is expensive</p>
                    </div>
                </div>
            </div>
        </div>
`;

// Function to inject additional sections
function loadAdditionalSections() {
    const sectionsContainer = document.querySelector('.notebook-container');
    const navContainer = sectionsContainer.querySelector('.nav-pills');
    navContainer.insertAdjacentHTML('afterend', additionalSections);
}

// Matrix generation functions
function generateSparsityMatrix() {
    const matrix = document.getElementById('sparsity-matrix');
    if (!matrix) return;
    
    matrix.innerHTML = '';
    
    // Generate 20x15 matrix with ~6% density (similar to real data)
    for (let i = 0; i < 300; i++) {
        const cell = document.createElement('div');
        cell.className = 'matrix-cell';
        
        if (Math.random() < 0.06) {
            // Rated cell
            const rating = Math.floor(Math.random() * 5) + 1;
            cell.textContent = rating;
            cell.style.background = '#4ecdc4';
            cell.style.color = 'white';
            cell.title = `Rating: ${rating} stars`;
        } else {
            // Unrated cell
            cell.style.background = '#f8f9fa';
            cell.style.border = '1px solid #dee2e6';
            cell.title = 'No rating';
        }
        
        matrix.appendChild(cell);
    }
}

// User selection for collaborative filtering demo
function selectUser(userId) {
    const profiles = document.querySelectorAll('.user-profile');
    profiles.forEach(p => p.style.transform = 'scale(1)');
    
    const selectedProfile = profiles[userId - 1];
    selectedProfile.style.transform = 'scale(1.05)';
    
    const resultDiv = document.getElementById('similarity-result');
    
    if (userId === 2) {
        resultDiv.innerHTML = `
            <h5 style="color: #4ecdc4; margin-top: 0;">🎯 High Similarity with User B!</h5>
            <p><strong>Common Movies:</strong> Titanic (both 5⭐), Batman (both 4⭐), Star Wars (both 5⭐)</p>
            <p><strong>Similarity Score:</strong> 0.87 (Very High!)</p>
            <p><strong>Recommendation:</strong> You should watch Terminator (User B rated it 4⭐)</p>
        `;
    } else if (userId === 3) {
        resultDiv.innerHTML = `
            <h5 style="color: #ff6b6b; margin-top: 0;">📉 Low Similarity with User C</h5>
            <p><strong>Common Movies:</strong> Only Batman (You: 4⭐, User C: 2⭐)</p>
            <p><strong>Similarity Score:</strong> 0.23 (Low)</p>
            <p><strong>Recommendation:</strong> User C's preferences are too different - skip their recommendations</p>
        `;
    }
}

// Load sections when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(loadAdditionalSections, 100);
    setTimeout(generateSparsityMatrix, 500);
}); 