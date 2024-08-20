pipeline {
    agent any

    environment {
        RESEND_API_KEY = 'RESEND_API_KEY'
        DATABASE_URL = 'DATABASE_URL'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', credentialsId: '2', url: 'https://github.com/BS-PMC-2024/BS-PMC-2024-Team3.git'
            }
        }
        stage('Install Dependencies') {
            agent {
                docker {
                    image 'node:18-alpine'
                    args '-v $HOME/.npm:/root/.npm' // Cache npm dependencies
                }
            }
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            agent {
                docker {
                    image 'node:18-alpine'
                    args '-e DATABASE_URL=$DATABASE_URL -e RESEND_API_KEY=$RESEND_API_KEY'
                }
            }
            steps {
                sh 'npx prisma generate'
                sh 'npm run build'
            }
        }
        stage('Test') {
            agent {
                docker {
                    image 'node:18-alpine'
                    args '-e DATABASE_URL=$DATABASE_URL -e RESEND_API_KEY=$RESEND_API_KEY'
                }
            }
            steps {
                sh 'mkdir -p reports/junit'
                sh 'npm test'
                
                // Generate code coverage report
                sh 'npm run coverage'
                
                // Check code coverage threshold
                script {
                    def coverage = sh(script: "grep 'All files' coverage/lcov-report/index.html | awk '{print \$4}' | tr -d '%'", returnStdout: true).trim()
                    if (coverage.toInteger() < 80) {
                        error "Code coverage is below 80%. Current coverage: ${coverage}%"
                    }
                }
            }
        }
        stage('Page Load Time') {
            steps {
                // Measure Page Load Time using a tool like Lighthouse
                sh 'npx lighthouse http://localhost:3000 --output json --output-path=./reports/lighthouse/report.json'
                script {
                    def pageLoadTime = sh(script: "cat reports/lighthouse/report.json | jq '.audits[\"interactive\"].numericValue'", returnStdout: true).trim()
                    if (pageLoadTime.toInteger() > 2000) { // 2000ms = 2 seconds
                        error "Page Load Time is above 2 seconds. Current Load Time: ${pageLoadTime}ms"
                    }
                }
            }
        }
        stage('MTTR') {
            steps {
                // MTTR can be calculated using logs or monitoring tools
                script {
                    def mttr = sh(script: "your_command_to_calculate_mttr", returnStdout: true).trim() // Replace with actual MTTR calculation
                    if (mttr.toInteger() > 7200) { // 7200 seconds = 2 hours
                        error "MTTR is above 2 hours. Current MTTR: ${mttr} seconds"
                    }
                    echo "Mean Time to Recovery (MTTR): ${mttr} seconds"
                }
            }
        }
        stage('System Uptime') {
            steps {
                // Check system uptime percentage
                script {
                    def uptimePercentage = sh(script: "your_command_to_calculate_uptime", returnStdout: true).trim() // Replace with actual uptime calculation
                    if (uptimePercentage.toFloat() < 99.9) {
                        error "System Uptime is below 99.9%. Current Uptime: ${uptimePercentage}%"
                    }
                    echo "System Uptime: ${uptimePercentage}%"
                }
            }
        }
    }
    post {
        always {
            junit 'reports/junit/js-test-results.xml'
            archiveArtifacts artifacts: 'reports/junit/*', allowEmptyArchive: true
            archiveArtifacts artifacts: 'coverage/lcov-report/**/*', allowEmptyArchive: true
            archiveArtifacts artifacts: 'reports/lighthouse/*', allowEmptyArchive: true
            cleanWs()
        }
    }
}
