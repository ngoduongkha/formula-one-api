# Fomular One API

## Installation Guide

This README file provides step-by-step instructions to help you install and set up the F1 Crawling Data Tool and Server API. Please follow these instructions carefully to ensure a successful installation.

### Prerequisites

Before you begin, make sure you have the following software and tools installed on your system:

1. Node (v18 or higher)
2. Yarn (v1.22 or higher)
3. Docker (v24 or higher)
4. Docker Compose (v2.18 or higher)

### Step 1: Clone the Repository

Start by cloning the project repository from the GitHub repository:

```
$ git clone https://github.com/ngoduongkha/formula-one-api.git
```

### Step 2: Install Dependencies In `crawler`

```bash
cd crawler
yarn install
```

### Step 3 (Optional): Change range of years (for small data)

```typescript
// crawler/src/crawler.ts line 192
private readonly YEARS: number[] = Array.from(
  Array(2022 - 1950 + 1),
  (_, i) => i + 1950,
);
```

### Step 4: Run the Crawling Data Tool

```bash
yarn start
```

Data will be saved in `crawler/data` folder

### Step 5: Set Up the Database

```bash
cd ../server
docker compose up -d
```

### Step 6: Install Dependencies In `server`

```bash
yarn install
```


### Step 7: Seed data 

```bash
yarn seed
```

### Step 8: Run the Server API

```bash
yarn start:dev
```

### Step 7: Access the Application

You can test through the Swagger UI at http://localhost:3000/api

Happy crawling and data processing!