# Recommendation Systems Course

This repository contains a comprehensive Jupyter notebook for learning recommendation systems, originally designed for Google Colab but adapted for local development on M2 Mac.

## 🎯 Course Overview

This notebook covers the following topics:
- **Collaborative Filtering** with SVD and KNN algorithms
- **Item Recommendation Systems** 
- **Cold Start Problem** solutions using popular items
- **Hyperparameter Tuning** with Grid Search
- **Implicit Feedback** systems
- **EASE Model** implementation from scratch

## 📋 Prerequisites

- **Python 3.8+** (Python 3.9-3.11 recommended for M2 Mac)
- **macOS** with Apple Silicon (M2/M1) chip
- **Jupyter Notebook** or **JupyterLab**

## 🚀 Quick Setup

### Option 1: Using pip (Recommended)

```bash
# Clone or download this repository
cd "Recommendation Systems"

# Create a virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # On macOS/Linux

# Install requirements
pip install -r requirements.txt

# Start Jupyter
jupyter notebook
```

### Option 2: Using conda (Better performance on M2 Mac)

```bash
# Create conda environment
conda create -n recsys python=3.10
conda activate recsys

# Install core packages from conda-forge (optimized for M2)
conda install -c conda-forge numpy pandas scipy matplotlib seaborn jupyter

# Install surprise from pip (not available on conda)
pip install scikit-surprise

# Start Jupyter
jupyter notebook
```

## 📂 Files Structure

```
Recommendation Systems/
├── Recommendation_Systems_(2).ipynb  # Main notebook
├── requirements.txt                  # Python dependencies
├── README.md                        # This file
└── poject description.txt           # Original project description
```

## 📚 Notebook Contents

### Part 1: Data Loading and Preprocessing
- Loading MovieLens 100K dataset
- Creating user-item interaction matrices
- Data analysis and visualization

### Part 2: Collaborative Filtering Models
- **SVD (Singular Value Decomposition)** implementation
- **KNN-based** collaborative filtering (user-based and item-based)
- Model evaluation with RMSE and MAE metrics

### Part 3: Hyperparameter Optimization
- Grid search for optimal parameters
- Cross-validation techniques
- Performance comparison

### Part 4: Practical Exercises
1. **Exercise 1**: Build a recommendation function
2. **Exercise 2**: Handle cold start problem with popular items
3. **Exercise 3**: Work with Amazon product reviews dataset
4. **Exercise 4**: Convert explicit to implicit feedback
5. **Exercise 5**: Implement EASE model from scratch

## 🎓 Learning Objectives

By completing this notebook, you will:
- Understand different types of recommendation systems
- Implement collaborative filtering algorithms
- Handle the cold start problem
- Work with both explicit and implicit feedback
- Implement advanced models like EASE
- Evaluate recommendation system performance

## 📊 Datasets

### Primary Dataset: MovieLens 100K
- Automatically downloaded by the Surprise library
- 100,000 ratings from 943 users on 1,682 movies
- Stored in `~/.surprise_data/ml-100k/`

### Optional Dataset: Amazon Product Reviews
- Download from [Kaggle](https://www.kaggle.com/datasets/saurav9786/amazon-product-reviews)
- Place `ratings_Electronics (1).csv` in the notebook directory
- Used for Exercise 3

## ⚡ Performance Tips for M2 Mac

1. **Use conda** for numerical libraries when possible (better optimized)
2. **Enable multi-threading** by setting `n_jobs=-1` in algorithms
3. **Monitor memory usage** - some exercises work with large matrices
4. **Use Activity Monitor** to check if processes are using Apple Silicon optimizations

## 🔧 Troubleshooting

### Common Issues:

**ImportError: No module named 'surprise'**
```bash
pip install scikit-surprise
```

**Slow matrix operations**
```bash
# Check if numpy is using optimized BLAS
python -c "import numpy; numpy.show_config()"
```

**Memory issues with large datasets**
- Reduce dataset size in Exercise 3
- Use sparse matrices (already implemented)
- Close other applications to free memory

### M2 Mac Specific:

**If you get architecture warnings:**
```bash
# Create arm64 specific environment
conda create -n recsys python=3.10
conda activate recsys
conda config --add channels conda-forge
conda install numpy pandas scipy matplotlib jupyter
```

## 📈 Expected Runtime

- **Basic exercises (1-2)**: 5-10 minutes each
- **Grid search**: 10-15 minutes
- **Amazon dataset (Exercise 3)**: 20-30 minutes (if dataset available)
- **EASE model (Exercise 5)**: 5-10 minutes

## 🤝 Contributing

This notebook is part of the Google Reichman course curriculum. Feel free to:
- Report bugs or issues
- Suggest improvements
- Add additional exercises

## 📄 License

Educational use - part of Google Reichman University course materials.

## 🙋‍♂️ Support

For technical issues:
1. Check the troubleshooting section
2. Verify all dependencies are installed correctly
3. Ensure you're using Python 3.8+

---

**Happy Learning! 🚀** 