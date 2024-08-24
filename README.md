# FluentAI

FluentAI is an interactive learning platform designed to improve English language skills among teenagers, leveraging artificial intelligence to personalize learning content and track student progress.

## Key Features
- **Personalized Questions**: AI-driven generation of questions tailored to the student's level.
- **Word Games**: Various tools to enhance learning through word games.
- **Progress Tracking**: Allows students and teachers to monitor learning progress.
- **Teacher Support**: Tools for teachers to generate personalized questions and track student performance.

## Technologies Used
- **Next.js**: A React framework for building modern web applications.
- **Prisma**: A modern ORM for JavaScript and TypeScript to manage databases.

## System Requirements
- Node.js 18.x or higher
- A compatible database (PostgreSQL, MySQL, SQLite, etc.)
- npm or yarn for package management

## Installation and Local Setup
1. **Clone the Repository**:
    ```bash
    git clone https://github.com/BS-PMC-2024/BS-PMC-2024-Team3.git
    cd BS-PMC-2024-Team3
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Environment Variables**:
    Create a `.env.local` file in the root directory of the project with the following content:
    ```env
    DATABASE_URL="your-database-url"
    RESEND_API_KEY="your-resend-api-key"
    ```

4. **Set Up Prisma**:
    Create the schema and migrations in your database:
    ```bash
    npx prisma migrate dev
    npx prisma generate
    ```

5. **Run the Server**:
    Start the development server:
    ```bash
    npm run dev
    ```

6. **Access the Application**:
    Open the application in your browser at: `http://localhost:3000`

## Testing
- **Unit Tests**:
    Run unit tests:
    ```bash
    npm test
    ```
    Test coverage includes 80% of each feature.

- **Integration Tests**:
    - Test system login with a student user.
    - Test generating statistics with database integration.

## CI/CD Pipeline
The project is integrated with Jenkins for managing a CI/CD pipeline, which includes:
- Code and coverage testing
- Page load time measurement
- Mean Time to Recovery (MTTR) calculation
- System uptime checks

## Future Requirements
In future versions, we plan to develop an interactive educational game and a collaborative learning module.

## Contribution
We welcome contributions to the project. To contribute, please open a Pull Request with your changes.

## License
This project is licensed under the MIT License. For more details, see the [LICENSE](LICENSE) file.
