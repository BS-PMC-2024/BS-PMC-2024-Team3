pipeline {
    agent any
    tools {
        nodejs "nodejs"
    }
    stages {
        stage('Checkout') {
            docker {
                image 'aviv123/fluentai'
            }
            steps {
                git branch: 'main', credentialsId: '1', url: 'https://github.com/BS-PMC-2024/BS-PMC-2024-Team3'
            }
        }
        stage('Install Dependencies') {
            docker {
                image 'aviv123/fluentai'
            }
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            docker {
                image 'aviv123/fluentai'
            }
            steps {
                sh 'npm run build'
            }
        }
        stage('Test') {
            docker {
                image 'aviv123/fluentai'
            }
            steps {
                sh 'npm test'
            }
        }
    }

    post {
        always {
            junit '/reports/junit//.xml'
            archiveArtifacts artifacts: '**/', allowEmptyArchive: true
            archiveArtifacts artifacts: 'reports/junit/*/', allowEmptyArchive: true
        }
    }
}