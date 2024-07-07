pipeline {
    agent any
    tools {
        // Ensure that this tool is correctly configured in Jenkins
        // nodejs "nodejs" (Comment this out if NodeJS is not configured as a tool in your Jenkins)
    }
    stages {
        stage('Checkout') {
            agent {
                docker { image 'aviv123/fluentai' }
            }
            steps {
                git branch: 'main', credentialsId: '1', url: 'https://github.com/BS-PMC-2024/BS-PMC-2024-Team3.git'
            }
        }
        stage('Install Dependencies') {
            agent {
                docker { image 'aviv123/fluentai' }
            }
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            agent {
                docker { image 'aviv123/fluentai' }
            }
            steps {
                sh 'npm run build'
            }
        }
        stage('Test') {
            agent {
                docker { image 'aviv123/fluentai' }
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
        }
    }
}