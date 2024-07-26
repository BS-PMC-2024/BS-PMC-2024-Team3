pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS_ID = 'your-dockerhub-credentials-id'
        DOCKERHUB_REPO = 'tomerel3/fluentai:latest'
        RESEND_API_KEY = 're_4kh4Bggp_PqpaSub2aGUVeu1mZucikXtc'
        DATABASE_URL = credentials('postgresql://FluentAI_owner:W6bPncdGSt9B@ep-patient-shape-a238rly5-pooler.eu-central-1.aws.neon.tech/FluentAI?sslmode=require')

    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', credentialsId: '2', url: 'https://github.com/BS-PMC-2024/BS-PMC-2024-Team3.git'
            }
        }
        stage('Install Dependencies') {
            agent {
                docker { image 'node:18-alpine' }
            }
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            agent {
                docker { image 'node:18-alpine' }
            }
            steps {
                sh 'npm run build'
            }
        }
        stage('Test') {
            agent {
                docker { image 'node:18-alpine' }
            }
            steps {
                sh 'mkdir -p reports/junit'
                sh 'npm test'
            }
        }
        stage('Docker Build and Push') {
            steps {
                script {
                    docker.build(DOCKERHUB_REPO)
                }
            }
        }
        stage('Docker Login') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', DOCKERHUB_CREDENTIALS_ID) {
                        docker.image(DOCKERHUB_REPO).push("${env.BUILD_NUMBER}")
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
