pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS_ID = 'your-dockerhub-credentials-id'
        DOCKERHUB_REPO = 'tomerel3/fluentai:latest'
        RESEND_API_KEY = 'RESEND_API_KEY'
        DATABASE_URL = 'postgresql://FluentAI_owner:W6bPncdGSt9B@ep-patient-shape-a238rly5-pooler.eu-central-1.aws.neon.tech/FluentAI?sslmode=require'
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
            }
        }
        stage('Docker Build and Push') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', DOCKERHUB_CREDENTIALS_ID) {
                        docker.build(DOCKERHUB_REPO).push("${env.BUILD_NUMBER}")
                    }
                }
            }
        }
    }
    post {
        always {
            junit 'reports/junit/js-test-results.xml'
            archiveArtifacts artifacts: 'reports/junit/*', allowEmptyArchive: true
            cleanWs()
        }
    }
}
