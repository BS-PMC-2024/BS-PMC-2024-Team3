pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS_ID = 'your-dockerhub-credentials-id'
        DOCKERHUB_REPO = 'your-dockerhub-repo/your-image-name'
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
