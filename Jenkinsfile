pipeline {
    agent any
    stages {
        stage('Test Docker') {
            agent {
                docker { image 'aviv123/fluent_test' }
            }
            steps {
                sh 'echo "Hello from Docker"'
            }
        }
        stage('Checkout') {
            steps {
                git branch: 'main', credentialsId: '1', url: 'https://github.com/BS-PMC-2024/BS-PMC-2024-Team3.git'
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
                sh 'npm test'
            }
        }
    }
    post {
        always {
            junit '**/reports/junit/*.xml'
            archiveArtifacts artifacts: '**/*', allowEmptyArchive: true
            cleanWs()
        }
    }
}