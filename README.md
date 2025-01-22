# AI-Powered Workflow Platform for BPO Efficiency


This project is a **Sentiment Analysis and Task Management Platform** designed to analyze customer sentiment and manage tasks efficiently. The platform includes features such as call details, sentiment analysis summaries, and a pending tasks management system.

---

## **Features**

### **1. Call Details Page**
- View detailed information about recent calls.
- Includes sentiment analysis of call transcripts powered by **Gemini API**.
- Displays a summary of customer interactions.

### **2. Pending Tasks Page**
- List pending tasks and mark them as completed.
- Separate sections for pending and completed tasks.
- Clean, intuitive UI built with **Tailwind CSS** and **ShadCN UI**.

### **3. Sentiment Dashboard**
- Visualize sentiment trends across calls.
- Categorize customer feedback into positive, neutral, or negative sentiments.

---

## **Architecture Overview**

### **Frontend**
- Built using **React** with **Tailwind CSS** and **ShadCN UI** for styling.
- Features responsive design for a seamless user experience.
- Pages:
  - **Call Details Page**: Displays call summaries and sentiment analysis.
  - **Pending Tasks Page**: Manages tasks with easy completion toggles.
  - **Sentiment Dashboard**: Tracks sentiment trends visually.

### **Backend**
- Developed using **Node.js** and **Express**.
- Key modules:
  - **Authentication Module**: Secure user login and session management.
  - **Task Management Module**: Handles pending/completed tasks.
  - **Sentiment Analysis Integration**: Interfaces with the **Gemini API**.

### **Database**
- Stores call details, user data, tasks, and sentiment analysis results.
- Options: **PostgreSQL**, **MongoDB**, or **Firebase Firestore**.

### **Sentiment Analysis**
- Uses the **Gemini API** for analyzing text sentiment.
- Results include sentiment scores and categorized summaries.

---

## **Technologies Used**
- **Frontend**: React, Tailwind CSS, ShadCN UI
- **Backend**: Node.js, Express.js
- **Database**: Firebase Firestore
- **Sentiment Analysis**: Gemini API
- **Deployment**: Vercel (Frontend)

---

## **Installation**

### **1. Clone the Repository**
```bash
git clone https://github.com/your-username/sentiment-analysis-platform.git
cd sentiment-analysis-platform


## Demo


https://www.youtube.com/watch?v=PeHluWHtz3E
