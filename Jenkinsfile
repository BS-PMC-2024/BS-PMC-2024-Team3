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
                script {
                    withCredentials([string(credentialsId: 'github-pat', variable: 'GITHUB_TOKEN')]) {
                        sh 'git config --global credential.helper store'
                        sh 'echo "https://$GITHUB_TOKEN:@github.com" > ~/.git-credentials'
                        git branch: 'test', url: 'https://github.com/BS-PMC-2024/BS-PMC-2024-Team3.git'
                    }
                }
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